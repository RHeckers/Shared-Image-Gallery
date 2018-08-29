import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { User } from '../../modals/User';



@Injectable()
export class AuthService {

  userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  uid: Observable<any>;
  userId: string;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )};


      loginWithEmail(email: string, password: string){
        return new Promise((resolve, reject) => {
          this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then(userData => {
            resolve(userData), err => reject(err);
            console.log(userData);
          })
          
        });
      }
      
      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.oAuthLogin(provider);
      }
    
      private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
          .then((credential) => {
            console.log(credential.user);
            this.updateOnLogin(credential.user);
            
          })
      }
    
    
      updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
          uid: user.uid,
          email: user.email,
          favorites: user.favorites,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
    
        return userRef.set(data, { merge: true })
    
      }

      updateOnLogin(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const loginData: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
  
        }
    
        return userRef.set(loginData, { merge: true })
    
      }

      
    
    
      signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
      }
    
    
}
 