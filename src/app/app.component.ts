import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        this.router.navigate(['front-login']);
      } else {
        this.router.navigate(['front-home']);
      }

  }
}
