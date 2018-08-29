import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../modules/core/auth.service';
import { ImageComponent } from '../image/img-upload.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  // favorites: Array<string>;

  constructor( public auth: AuthService ) { 
    // this.auth.user.subscribe(user => {
    //   this.favorites = user.favorites;
    
    //  });
    
  }

  ngOnInit() {
    
  }

  removeFromFavorite(url, user){
    console.log(url);
    console.log(user);
 
    for(let i = 0; i < user.favorites.length; i++){

      if(user.favorites[i] == url.toString()){
        console.log(user);
        user.favorites.splice(i, 1);
        this.auth.updateUserData(user);
        console.log(user);
      }
    }

    let favMessage = document.getElementById('favoriteMessage');
    favMessage.style.display = 'block';
    console.log(favMessage);

    setTimeout(() => {
      favMessage.style.display = 'none';
    }, 1500);

  }

  showImageFullSize(event){
    // console.log(event.target.attributes[1].value);
    window.open(event.target.attributes[1].value);

  }

}
