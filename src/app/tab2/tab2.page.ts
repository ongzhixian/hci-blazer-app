import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonModal) modal!: IonModal;

  constructor() {}

  confirm() {
    const person: Person = {
      name: 'Jorge Vergara',
      age: 36,
    };
    this.modal.dismiss(person, 'confirm');
  }

  dismiss() {
    this.modal.dismiss(null, 'dismiss');
  }

}


interface Person {
  name: string;
  age: number;
}
