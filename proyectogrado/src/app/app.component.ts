import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogged = false;

  constructor(private authService: AuthService, private router: Router) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().onAuthStateChanged(user => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }
}
