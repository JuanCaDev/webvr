import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import M from 'node_modules/materialize-css';

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

  loginUser(email: string, password: string, type: string) {
    this.authService.loginUser(email, password).then(
      () => {
        switch (type) {
          case 'student':
            this.router.navigate(['game/level1']);
            break;
          case 'teacher':
            this.router.navigate(['']);
            break;
          case 'coordinator':
            this.router.navigate(['admin']);
            break;
        }
      }
    )
  }

  goRegister() {
    this.router.navigate(['register']);
  }

}
