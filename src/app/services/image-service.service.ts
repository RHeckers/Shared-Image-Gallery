import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Image } from '../modals/Image';

 
@Injectable()
export class ImageService {

  imageCollection: AngularFirestoreCollection<Image>;
  imageDoc: AngularFirestoreDocument<Image>;
  
  images: Observable<Image[]>;
  image: Observable<Image>;
  

  //Init the dependencies
  constructor( private asf: AngularFirestore ) {
    
   }


  // Get images collection 
  getImages (): Observable<Image[]> {
    this.imageCollection = this.asf.collection<Image>('/images', ref => ref.orderBy('time').startAt(1528445969388).endAt(9999999999999));
    this.images = this.imageCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Image;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.images;
  }

  

  //Delete a image
  deleteImage (board: Image, id: string) {
    this.imageDoc = this.asf.doc<Image>('/images');
    this.imageDoc.delete();
  }

  //Add a image 
  addImagge (image: Image) {
    this.imageCollection = this.asf.collection<Image>('/images');
    this.imageCollection.add(image); 
  } 

  


}