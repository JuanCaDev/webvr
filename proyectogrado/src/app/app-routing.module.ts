import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './admin/home-page/home-page.component';
import { LoginPageComponent } from './admin/login-page/login-page.component';
import { PrivatePageComponent } from './admin/private-page/private-page.component';
import { NotFoundPageComponent } from './admin/not-found-page/not-found-page.component';
import { DetailsPageComponent } from './admin/details-page/details-page.component';
import { Level1Component } from './aframe/level1/level1.component';
import { Level2Component } from './aframe/level2/level2.component';
import { Level3Component } from './aframe/level3/level3.component';

const routes: Routes = [
  {  path: '', component: HomePageComponent },
  {  path: 'login', component: LoginPageComponent },
  {  path: 'student/:id', component: DetailsPageComponent },
  {  path: 'admin', component: PrivatePageComponent },
  {  path: 'game/level1', component: Level1Component },
  {  path: 'game/level2', component: Level2Component },
  {  path: 'game/level3', component: Level3Component },
  {  path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
