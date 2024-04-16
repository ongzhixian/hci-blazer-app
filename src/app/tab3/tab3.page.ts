import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private authenticationService: AuthenticationService) {}

  signOut() {
    this.authenticationService.signOut();
  }

  changePassword() {

  }
  
  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  dismiss() {
    this.modal.dismiss(null, 'dismiss');  
  }
}
