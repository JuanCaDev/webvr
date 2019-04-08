import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email = 'juancafelizzola@gmail.com';
  password = '123456';

  constructor(
    private authService: AuthService,
    private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
  }

  loginUser() {
    return this.authService.loginUser(this.email, this.password)
      .then(data => {
        this.toast('Usuario logueado correctamente');
        console.log('Login', data);

        // Validar usuarios
        this.db.collection('students').doc(data.user.uid).get().subscribe(doc => {
          if (doc.exists) {
            console.log('Estudiante: data', doc.data());
            this.router.navigate(['game/level1']);
          } else {
            console.log('Es profesor');
            if (data.user.email === 'juancafelizzola@gmail.com') {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['']);
            }
          }
        });
      })
      .catch(() => this.toast('Usuario y/o contraseña incorrecta'));
  }

  toast(text: string) {
    M.toast({html: text});
  }

}
