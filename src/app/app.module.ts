import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
 
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ImageComponent } from './components/image/img-upload.component';

import { ImageService } from './services/image-service.service';
import { LoginComponent } from './components/login/login.component';
import { CoreModule } from './modules/core/core.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ImageComponent,
    LoginComponent,
    NotFoundComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireStorageModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
