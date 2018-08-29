import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../modules/core/auth.service';

import { Image } from '../../modals/Image';
import { ImageService } from '../../services/image-service.service';



@Component({
  selector: 'img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImageComponent implements OnInit {

  favorite: boolean;
  downloadURL: Observable<string>;
  selectedFile: File = null;
  images: Image[];

  constructor(private http: HttpClient, private storage: AngularFireStorage, private imageService: ImageService, public auth: AuthService){

  }

  ngOnInit() {   
    this.getImages();    
  }

  getImages(){
    this.imageService.getImages()
      .subscribe(images => {
        this.images = images
        this.checkFavorites();  
      });
      
  }

  checkFavorites(){
    
      this.auth.user.subscribe(user => {
        user.favorites.forEach(favorite => {
          console.log(document.getElementById(favorite));
          setTimeout(() => {
            if(document.getElementById(favorite) !== null){
              console.log(favorite);
               let favoriteBtn = document.getElementById(favorite);
               favoriteBtn.innerHTML = 'Already Added';
               favoriteBtn.setAttribute('disabled', '!favorite');
               favoriteBtn.style.background = "#3D4252";
               favoriteBtn.style.cursor = "default";
               favoriteBtn.style.transform = "scale(0.9)"
             }
            
          }, 1000);
          
        });
  
      });
    
  }

  onUpload(event){

    let uploadMessage = document.getElementById('uploadMessage');
    uploadMessage.style.display = 'block';

    setTimeout(() => {
      uploadMessage.style.display = 'none';
    }, 1500);

    const file = <File>event.target.files[0];
    const filePath = event.target.files[0].name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.selectedFile = <File>event.target.files[0];

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);


    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(downloadURL => {
            let imgBox = document.getElementById('imageBox');
            let newImg = document.createElement('img');

            let date = new Date;
            let time = 9999999999999 - date.getTime();
            console.log(time);
            let name = event.target.files[0].name;
            let url = downloadURL;

            newImg.setAttribute('src', downloadURL);
            newImg.setAttribute('src', downloadURL);

            newImg.style.maxHeight = '250px';
            newImg.style.maxWidth = '250px';
            newImg.style.margin = '10px';

            this.imageService.addImagge({name, url, time} as Image);

          });
          
        }) 
     ).subscribe(() => {
      this.checkFavorites();   
     });
      
  }

  showImageFullSize(event){
    // console.log(event.target.attributes[1].value);
    window.open(event.target.attributes[1].value);

  }


  makeImgFavorite(url, user, event){
    
    console.log("Event = ", event);
    
    let updatedUser = user;
    if(user.favorites == null || undefined){
      user.favorites = [];
    }
    user.favorites.unshift(url);
    this.auth.updateUserData(user);

    let favMessage = document.getElementById('favoriteMessage');
    favMessage.style.display = 'block';

    setTimeout(() => {
      favMessage.style.display = 'none';
    }, 1500);

  }

}