import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

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
    , private authenticationService: AuthenticationService
    , public platform: Platform
  ) { 
    console.log(`Platforms ${[...platform.platforms()]}, URL: ${platform.url()}`);
    console.log('Prod? ', environment.production);
    
    // On android:  Platforms android,cordova,capacitor,mobile,hybrid
    // On browser:  Platforms android,desktop

    // On android:  URL http://192.168.79.11:8100/login
    // On android:  URL https://localhost/login (deployed)
    // On browser:  URL http://localhost:8100/login
  }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email: ['zhixian@hotmail.com', [Validators.required, Validators.email]],
      password: ['password1234', [Validators.required, Validators.minLength(6)]]
    });
  }

  signIn() {
    console.log(`Attempting to sign-in ${this.loginFormGroup.value.email}, ${this.loginFormGroup.value['password']}`);

    this.authenticationService.authenticateUser(
      this.loginFormGroup.value.email
      , this.loginFormGroup.value.password);
  }

}
