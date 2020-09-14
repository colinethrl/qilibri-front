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
    }
    return new Promise<any>((resolve, reject) => {
      this.http.post('api/sign-up', credentials).subscribe((user: any)=> {
        localStorage.setItem('user', JSON.stringify(user))
        resolve(true)
        this.router.navigate(['front-home']);
      }, err => reject(err.error))
    })
  }

  public login(email, password) {
    password = bcrypt.hashSync(password, hashKey);
    let credentials = {
      email: email,
      password: password
    }
    return new Promise<any>((resolve, reject) => {
      this.http.post('api/login', credentials).subscribe((user: any)=> {
        localStorage.setItem('user', JSON.stringify(user))
        resolve(true)
        this.router.navigate(['front-home']);
      }, err => {
        reject(err.error)
      })
    })
  }

  public logout() {
    localStorage.setItem('user', null)
  }
}
