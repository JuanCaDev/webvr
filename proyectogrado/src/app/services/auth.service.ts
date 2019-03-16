import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public angularFireAuth: AngularFireAuth) { }

  loginUser(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }

  getAuth() {
    console.log(this.angularFireAuth.authState);
  }
}
