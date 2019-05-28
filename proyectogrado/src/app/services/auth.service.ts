import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
    ) { }

  loginUser(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerUser(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // isUserCoordinator(userUid: string) {
  //   return this.db.collection(`coordinators/${userUid}`).valueChanges();
  // }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }

  isAuth() {
    return this.angularFireAuth.auth;
  }

  isLogged(): boolean {
    let flat: boolean;
    this.isAuth().onAuthStateChanged(user => {
      if (user) {
        flat = true;
      } else {
        flat = false;
      }
    });
    return flat;
  }

  // private createTypeUser(user) {
  //   const =
  //   this.db.collection('users').doc(user.uid).set(teacher)
  //     .then(() => {
  //       this.dataService.toast('Profesor creado correctamente');
  //     })
  //     .catch(error => this.dataService.toast('Error al crear: ' + error));
  // }
}
