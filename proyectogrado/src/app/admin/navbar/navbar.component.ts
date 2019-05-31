import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogged = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  logout() {
    this.authService.logout().then(
      () => {
        this.router.navigate(['login']);
        alert('Haz cerrado sesión');
      }
    );
  }

  getCurrentUser() {
    this.authService.isAuth().onAuthStateChanged(user => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    })
  }

}
