import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { regexValidator } from '../regex-validator.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
  ) { }

  signUpForm: FormGroup;
  loadingSignUp = false
  loginForm: FormGroup;
  loadingLogin = false
  matchingError = false;
  signUpHttpError = ""
  loginHttpError = ""

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(null,[Validators.required, regexValidator(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i, 'Invalid email address')]),
      password: new FormControl(null,[Validators.required, regexValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i, 'The password must contain 8 characters including a lowercase, an uppercase and a number')]),
      password_confirmation: new FormControl(null,[Validators.required]),
    })
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required]),
    })
  }

  signUp() {
    this.authService.logout()
    let email = this.signUpForm.controls.email.value
    let password = this.signUpForm.controls.password.value
    let passwordConfirmation = this.signUpForm.controls.password_confirmation.value
    if (password !== passwordConfirmation) {
      this.matchingError = true
    } else {
      this.matchingError = false
      this.loadingSignUp = true
      this.authService.signUp(email, password).then(() => {
        this.loadingSignUp = false
        this.signUpHttpError = ""
      }, error => {
        let errorMessage = error.error.errors
        this.signUpHttpError = errorMessage[Object.keys(errorMessage)[0]][0]
        this.loadingSignUp = false
      })
    }
  }

  login() {
    this.authService.logout()
    let email = this.loginForm.controls.email.value
    let password = this.loginForm.controls.password.value
    this.loadingLogin = true
    this.authService.login(email, password).then(() => {
      this.loadingLogin = false
      this.loginHttpError = ""
    }, error => {
      let errorMessage = error.error.errors
      this.loginHttpError = errorMessage[Object.keys(errorMessage)[0]][0]
      this.loadingLogin = false
    })
  }


}
