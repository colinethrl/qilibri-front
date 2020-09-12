import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  public login(email, password) {
    let credentials = {
      email: email,
      password: password
    }
    this.http.get('/sanctum/csrf-cookie').subscribe(() => {
      this.http.post('/login', credentials).subscribe((session) => {
        console.log(session)
        this.http.post('/logout', credentials).subscribe((session) => {
          console.log(session)
        })
      })
    })
  }
}
