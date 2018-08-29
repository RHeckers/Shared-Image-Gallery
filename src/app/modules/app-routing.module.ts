import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from '../components/image/img-upload.component';
import { LoginComponent } from '../components/login/login.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';



const routes: Routes = [
  {path: '', component: ImageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: '**', component: NotFoundComponent}
]; 

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }