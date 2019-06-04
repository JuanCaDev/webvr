import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import M from 'node_modules/materialize-css';
import { DataService } from 'src/app/services/data.service';

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
    private dataService: DataService,
    private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
  }

  loginUser(email: string, password: string, type: string) {
    this.authService.loginUser(email, password).then(
      (doc: any) => {
        switch (type) {
          case 'student':
            this.dataService.getOneStudent(doc.user.uid).subscribe(
              (data: any) => {
                if (data.levels.level1.finish === false) {
                  this.router.navigate(['game/level1']);
                } else if (data.levels.level2.finish === false) {
                  this.router.navigate(['game/level2']);
                } else if (data.levels.level3.finish === false) {
                  this.router.navigate(['game/level3']);
                } else {
                  alert('Haz finalizado todos los niveles');
                }
              }
            );
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
