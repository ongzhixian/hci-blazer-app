import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastController } from '@ionic/angular/standalone';
import {AlertController } from '@ionic/angular';
import {Barcode, BarcodeFormat, BarcodeScanner, ScanOptions} from "@capacitor-mlkit/barcode-scanning";

import {LoanService} from "../services/loan.service";
import {BorrowMessage, InventoryItem, OperationResponseMessage} from "../models/borrow-message";
import {AuthenticationService} from "../services/authentication.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private fb: FormBuilder
    , private alertController: AlertController
    , private toastController: ToastController
    , private loanService: LoanService
    , private authenticationService: AuthenticationService
  ) {}

  // BORROW SEGMENT

  borrowItemFormGroup: FormGroup = this.fb.group({
    itemCode: ['', [Validators.required, Validators.minLength(2)]],
    userCode: ['', [Validators.required, Validators.minLength(2)]],
  });

  async scanItemCode(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });

    if (barcodes.length === 0) return;

    this.borrowItemFormGroup.patchValue({
      itemCode: barcodes[0].displayValue
    });
  }

  async scanNricCode(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.Code39],
    });

    if (barcodes.length === 0) return;

    // Validate if barcode
    let is_valid_checksum = this.calculateChecksum(barcodes[0].displayValue)

    if (is_valid_checksum) {
      this.borrowItemFormGroup.patchValue({
        userCode: barcodes[0].displayValue
      });
    } else {
      await this.displayToast(false, 'INVALID NRIC');
    }

  }

  private async handleHttpError(err: Error) {
    //console.error('Caught error:', err);
    let serverErrorOperationResponseMessage:OperationResponseMessage = {
      is_success: false,
      message: 'Server error',
      data_object: null
    };
    return serverErrorOperationResponseMessage;
  }

  async borrowItem() {

    let is_valid_checksum = this.calculateChecksum(this.borrowItemFormGroup.value['userCode'])

    if (!is_valid_checksum) {
      await this.displayToast(false, 'INVALID NRIC');
      return;
    }

    this.loanService.borrowItem({
      itemCode : this.borrowItemFormGroup.value['itemCode'],
      borrowerCode : this.borrowItemFormGroup.value['userCode'],
      userCode : this.authenticationService.getAuthenticatedUserName()
    }).pipe(
      catchError(this.handleHttpError)
      // catchError(async err => {
      //   console.error('Caught error:', err);
      //   let serverErrorOperationResponseMessage:OperationResponseMessage = {
      //     is_success: false,
      //     message: 'Server error',
      //     data_object: null
      //   };
      //   return serverErrorOperationResponseMessage;
      //   //return of([]); // Return a new observable or re-throw the error
      // })
    )
    .subscribe(async data => {
      console.log('Response data', data);
      if (data.is_success) {
        await this.displayToast(true, data.message);
      } else {
        await this.displayToast(false, data.message);
      }
      // console.log("data is_valid", data.is_valid);
      // if (data.is_valid) {
      //
      //   this.authenticatedUser = {
      //     name: data.username,
      //     age: 30
      //   };
      //   await this.appStorage.set('authenticatedUserData', this.authenticatedUser);
      //   this.router.navigate(['/tabs/tab2']);
      // }
    });
  }

  // RETURN SEGMENT

  returnItemFormGroup: FormGroup = this.fb.group({
    itemCode: ['', [Validators.required, Validators.minLength(2)]],
  });

  async scanReturnItemCode(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });

    if (barcodes.length === 0) return;

    this.returnItemFormGroup.patchValue({
      itemCode: barcodes[0].displayValue
    });
  }

  returnItem() {
    this.loanService.returnItem({
      itemCode : this.returnItemFormGroup.value['itemCode'],
      userCode : this.authenticationService.getAuthenticatedUserName()
    }).subscribe(async data => {
      console.log('Response data', data);
      if (data.is_success) {
        await this.displayToast(true, data.message);
      } else {
        await this.displayToast(false, data.message);
      }
    });
  }


  // TODO:
  //
  // What do we want
  simulateAddNewItem() {
    let itemCode = 'item 1';
    let borrowerCode = 'S123C';

    this.loanService.addItem({
      itemCode : itemCode,
      userCode : borrowerCode
    }).subscribe(data =>{
      console.log(data);
      // data {is_success: false, message: 'item 1 fail to add', data_object: null}
    });
  }

  simulateBorrow() {
    let itemCode = 'item 1';
    let userCode = 'ZX';
    let borrowerCode = 'S123C';

    this.loanService.borrowItem({
      itemCode : itemCode,
      borrowerCode : borrowerCode,
      userCode : userCode,
    });

  }

  simulateReturn() {
    // this.loanService.returnItem({
    //   //itemCode : this.borrowItemFormGroup.value['itemCode']
    //
    // });
  }

  // STOCK SEGMENT

  addItemFormGroup: FormGroup = this.fb.group({
    itemCode: ['', [Validators.required, Validators.minLength(2)]]
  });

  async scanNewItemCode(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan(this.scanItemCodeOptions);

    if (barcodes.length === 0) return;

    this.addItemFormGroup.patchValue({
      itemCode: barcodes[0].displayValue
    });
  }

  addItem() {
    this.loanService.addItem({
      itemCode : this.addItemFormGroup.value['itemCode'],
      userCode: this.authenticationService.getAuthenticatedUserName()
    }).subscribe(async data => this.displayToastNotification(data));
  }


  // Reference code -- start

  inventoryItemList: InventoryItem[] = [];
  barcodes: Barcode[] = [];

  async scanAndRegisterItemCode(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    let continueScan = true;

    while (continueScan) {
      const { barcodes } = await BarcodeScanner.scan(this.scanItemCodeOptions);

      if (barcodes.length === 0) continueScan = false;

      // this.loanService.addItem({
      //   itemCode : barcodes[0].displayValue
      // }).subscribe(async data => this.displayToastNotification(data));
    }
  }

  // Reference code -- end


  // UTILITY FUNCTIONS - FOR SCANNER

  async displayToastNotification(data:OperationResponseMessage): Promise<void> {
    const toast = await this.toastController.create({
      message: data.message,
      duration: 1500,
      position: 'bottom',
      color: data.is_success ? 'success' : 'warning'
    });
    await toast.present();
  }

  async displayToast(is_success:boolean, message:string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: is_success ? 'success' : 'warning'
    });
    await toast.present();
  }

  scanItemCodeOptions:ScanOptions = {
    formats: [BarcodeFormat.QrCode],
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }


  // VALIDATION FUNCTIONS

  calculateChecksum(raw_data:string) {
    //let raw_data:string = 'S1234567G';
    let weights = [2, 7, 6, 5, 4, 3, 2];
    let sgp_map     = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    let non_sgp_map = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
    let post_2000_char_list = ['T', 'G'];
    let sgp_char_list = ['S', 'T'];

    let issue_char = raw_data[0];
    let sum_of_checks = 0;

    let digit_list = raw_data.slice(1, 8);
    for (let index = 0; index < digit_list.length; index++) {
      const number = digit_list[index];
      sum_of_checks += weights[index] * parseInt(number, 10);
    }

    if (post_2000_char_list.includes(issue_char)) sum_of_checks = sum_of_checks + 4;

    let checksum_modulus = sum_of_checks % 11;

    let checksum_char = '';
    if (sgp_char_list.includes(issue_char)) {
      checksum_char = sgp_map[checksum_modulus]
    } else {
      checksum_char = non_sgp_map[checksum_modulus]
    }

    return raw_data[8] === checksum_char;
  }


  // UTILITY FUNCTIONS - SEGMENT

  selectedSegment: string = "borrow";

  onSegmentChange(e:any) {
    let activatedTabName = e.detail.value;
    if (activatedTabName === 'stock-take') {
      // Load item list and populate inventory item list
      // this.loanService.getItemList(1).subscribe(data => {
      //   this.inventoryItemList = data;
      //   console.log(this.inventoryItemList);
      // });
    }
  }
}
