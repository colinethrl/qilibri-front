import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import { hashKey } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  public signUp(email, password) {
    password = bcrypt.hashSync(password, hashKey);
    let credentials = {
      email: email,
      name: email,
      password: password,
      password_confirmation: password
    }
    this.http.get('/sanctum/csrf-cookie').subscribe(() => {
      this.http.post('/register', credentials).subscribe((session) => {
        this.http.post('/login', credentials).subscribe()
      })
    })
  }

  public login(email, password) {
    password = bcrypt.hashSync(password, hashKey);
    let credentials = {
      email: email,
      password: password
    }
    this.http.get('/sanctum/csrf-cookie').subscribe(() => {
      this.http.post('/login', credentials).subscribe()
    })
  }

  public logout() {
    this.http.post('/logout', {}).subscribe()
  }
}
