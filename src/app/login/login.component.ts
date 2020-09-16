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
  componentName = "login"

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(null,[Validators.required, regexValidator(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i, 'Invalid email address')]),
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null,[Validators.required, regexValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i, 'The password must contain 8 characters including a lowercase, an uppercase and a number')]),
      password_confirmation: new FormControl(null,[Validators.required]),
    })
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required]),
    })
  }

  signUp() {
    let email = this.signUpForm.controls.email.value
    let password = this.signUpForm.controls.password.value
    let passwordConfirmation = this.signUpForm.controls.password_confirmation.value
    let name = this.signUpForm.controls.name.value
    if (password !== passwordConfirmation) {
      this.matchingError = true
    } else {
      this.matchingError = false
      this.loadingSignUp = true
      this.authService.signUp(email, name, password).then(() => {
        this.loadingSignUp = false
        this.signUpHttpError = ""
      }, error => {
        this.loadingSignUp = false
        this.signUpHttpError = error
      })
    }
  }

  login() {
    let email = this.loginForm.controls.email.value
    let password = this.loginForm.controls.password.value
    this.loadingLogin = true
    this.authService.login(email, password).then(() => {
      this.loadingLogin = false
      this.loginHttpError = ""
    }, error => {
      this.loadingLogin = false
      this.loginHttpError = error
    })
  }


}
