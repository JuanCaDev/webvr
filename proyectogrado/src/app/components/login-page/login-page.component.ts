import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email = 'juanfelizzola@gmail.com';
  password = 'juan1234';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    return this.authService.loginUser(this.email, this.password)
      .then(data => {
        this.router.navigate(['']);
      })
      .catch(error => console.log(error));
  }

}
