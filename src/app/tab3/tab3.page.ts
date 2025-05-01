import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild(IonModal) modal!: IonModal;

  appVersion: string;

  updatePasswordFormGroup: FormGroup = this.fb.group({
    password: ['password12345', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['password12345', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private authenticationService: AuthenticationService
    , private fb: FormBuilder) {
    this.appVersion = environment.appVersion;
  }

  signOut() {
    this.authenticationService.signOut();
  }
    // change-password-modal

  // confirm() {
  //   this.modal.dismiss(null, 'confirm');
  // }

  dismiss() {
    console.log("Dismiss change password dialog");
    this.modal.dismiss(null, 'dismiss');
  }

  updatePassword() {
    console.log(`In updatePassword() ${this.updatePasswordFormGroup.value.password} ${this.updatePasswordFormGroup.value.passwordConfirmation}`);
    this.modal.dismiss(null, 'confirm');
  }

}
