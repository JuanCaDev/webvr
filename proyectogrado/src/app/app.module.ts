import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './admin/login-page/login-page.component';
import { HomePageComponent } from './admin/home-page/home-page.component';
import { PrivatePageComponent } from './admin/private-page/private-page.component';
import { NotFoundPageComponent } from './admin/not-found-page/not-found-page.component';
import { NavbarComponent } from './admin/navbar/navbar.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DetailsPageComponent } from './admin/details-page/details-page.component';
import { Level1Component } from './aframe/level1/level1.component';
import { Level2Component } from './aframe/level2/level2.component';
import { Level3Component } from './aframe/level3/level3.component';
import { RegisterPageComponent } from './admin/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    PrivatePageComponent,
    NotFoundPageComponent,
    NavbarComponent,
    DetailsPageComponent,
    Level1Component,
    Level2Component,
    Level3Component,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
