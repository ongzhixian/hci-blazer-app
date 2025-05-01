import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastController } from '@ionic/angular/standalone';
import {AlertController } from '@ionic/angular';
import {Barcode, BarcodeFormat, BarcodeScanner, ScanOptions} from "@capacitor-mlkit/barcode-scanning";

import {LoanService} from "../services/loan.service";
import {BorrowMessage, InventoryItem, OperationResponseMessage} from "../models/borrow-message";

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

    this.borrowItemFormGroup.patchValue({
      userCode: barcodes[0].displayValue
    });
  }

  borrowItem() {
    this.loanService.borrow({
      itemCode : this.borrowItemFormGroup.value['itemCode'],
      userCode : this.borrowItemFormGroup.value['userCode'],
    });
  }

  // RETURN SEGMENT

  // TODO:


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
      itemCode : this.addItemFormGroup.value['itemCode']
    }).subscribe(async data => this.displayToastNotification(data));
  }

  // Reference code --

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

      this.loanService.addItem({
        itemCode : barcodes[0].displayValue
      }).subscribe(async data => this.displayToastNotification(data));
    }
  }


  // UTILITY FUNCTIONS - FOR SCANNER

  async displayToastNotification(data:OperationResponseMessage): Promise<void> {
    const toast = await this.toastController.create({
      message: data.message,
      duration: 1500,
      position: 'bottom',
      color: data.success ? 'success' : 'warning'
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


  // UTILITY FUNCTIONS - SEGMENT

  selectedSegment: string = "stock-take";

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
