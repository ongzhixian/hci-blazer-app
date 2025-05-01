import { Component } from '@angular/core';
import {ToastController } from '@ionic/angular/standalone';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoanService} from "../services/loan.service";
import {BorrowMessage, InventoryItem} from "../models/borrow-message";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  selectedSegment: string = "borrow";
  inventoryItemList: InventoryItem[] = [];

  borrowItemFormGroup: FormGroup = this.fb.group({
    dataItem1: ['', [Validators.required, Validators.minLength(2)]],
    dataItem2: ['', [Validators.required, Validators.minLength(2)]],
  });

  addItemFormGroup: FormGroup = this.fb.group({
    dataItem1: ['', [Validators.required, Validators.minLength(2)]]
  });


  constructor(
    private fb: FormBuilder
    , private toastController: ToastController
    , private loanService: LoanService
  ) {}

  handleChange(e:any) {
    let activatedTabName = e.detail.value;
    if (activatedTabName === 'stock-take') {
      // Load item list and populate inventory item list
      this.loanService.getItemList(1).subscribe(data => {
        this.inventoryItemList = data;
        console.log(this.inventoryItemList);
      });
    }

  }


  addItem() {
    this.loanService.addItem({
      itemCode : this.addItemFormGroup.value['dataItem1']
    }).subscribe(async data => {
      console.log('Response data', data);

      const toast = await this.toastController.create({
        message: data.message,
        duration: 1500,
        position: 'bottom',
        color: data.success ? 'success' : 'warning'
      });

      await toast.present();

      //
      // if (data.success) {
      //   const toast = await this.toastController.create({
      //     message: data.message,
      //     duration: 1500,
      //     position: 'bottom',
      //     color: 'success'
      //   });
      //   await toast.present();
      // } else {
      //   const toast = await this.toastController.create({
      //     message: data.message,
      //     duration: 1500,
      //     position: 'bottom',
      //     color: 'warning'
      //   });
      //   await toast.present();
      // }
    });
  }

  borrowItem() {
    this.loanService.borrow({
      itemCode : this.borrowItemFormGroup.value['dataItem1'],
      userCode : this.borrowItemFormGroup.value['dataItem2'],
    });
    console.log("TODO: Perform borrowItem action" + this.borrowItemFormGroup.value);
  }

}
