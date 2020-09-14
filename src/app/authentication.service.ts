import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import { hashKey } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public signUp(email, name, password) {
    password = bcrypt.hashSync(password, hashKey);
    let credentials = {
      email: email,
      name: name,
      password: password,
      password_confirmation: password
    }
    return new Promise<any>((resolve, reject) => {
      this.http.get('/sanctum/csrf-cookie').subscribe(() => {
        this.http.post('/register', credentials).subscribe(() => {
          resolve(true)
          this.router.navigate(['front-home']);
        },(error) => {
          reject(error)
        })
      })
    })
  }

  public login(email, password) {
    password = bcrypt.hashSync(password, hashKey);
    let credentials = {
      email: email,
      password: password
    }
    return new Promise<any>((resolve, reject) => {
      this.http.get('/sanctum/csrf-cookie').subscribe(() => {
        this.http.post('/login', credentials).subscribe(() => {
          this.http.get('/api/user').subscribe((user)=> {
            console.log(user)
            resolve(true)
          })
          this.router.navigate(['front-home']);
        },(error) => {
          reject(error)
        })
      })
    })
  }

  public logout() {
    this.http.post('/logout', {}).subscribe()
  }
}
