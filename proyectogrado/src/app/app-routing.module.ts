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
import { AuthGuard } from './guards/auth.guard';
import { RegisterPageComponent } from './admin/register-page/register-page.component';

const routes: Routes = [
  {  path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  {  path: 'login', component: LoginPageComponent },
  {  path: 'register', component: RegisterPageComponent },
  {  path: 'student/:id', component: DetailsPageComponent, canActivate: [AuthGuard] },
  {  path: 'admin', component: PrivatePageComponent, canActivate: [AuthGuard] },
  {  path: 'game/level1', component: Level1Component, canActivate: [AuthGuard] },
  {  path: 'game/level2', component: Level2Component, canActivate: [AuthGuard] },
  {  path: 'game/level3', component: Level3Component, canActivate: [AuthGuard] },
  {  path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
