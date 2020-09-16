import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  authenticated = false;

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        this.router.navigate(['front-login']);
        this.authenticated = false
      } else {
        this.router.navigate(['front-home']);
        this.authenticated = true
      }
  }

  componentAdded(event) {
    this.authenticated = event.componentName !== "login"
  }



  logout() {
    this.authenticationService.logout()
    this.router.navigate(['front-login']);
  }
}
