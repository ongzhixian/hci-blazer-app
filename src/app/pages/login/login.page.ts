import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormGroup!: FormGroup;

  constructor(
    private router: Router
    , private fb: FormBuilder
    //, private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email: ['zhixian@hotmail.com', [Validators.required, Validators.email]],
      password: ['password1234', [Validators.required, Validators.minLength(6)]]
    });
  }

  signIn() {
    console.log(`Attempting to sign-in ${this.loginFormGroup.value.email}, ${this.loginFormGroup.value['password']}`);

    // this.authenticationService.authenticateUser(
    //   this.loginFormGroup.value.email
    //   , this.loginFormGroup.value.password);
  }

}
