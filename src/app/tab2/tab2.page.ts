import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeFormat, BarcodeScanner, ScanOptions } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    
  }
  
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    
    
    let scanOptions:ScanOptions = {
      formats: [BarcodeFormat.QrCode, BarcodeFormat.Code39],
    }

    const { barcodes } = await BarcodeScanner.scan();

    barcodes.forEach((barcode) => {
      console.log(`barcode ${barcode.format} | val=${barcode.valueType} | disp=${barcode.displayValue} | raw=${barcode.rawValue} `);
    });

    this.barcodes.push(...barcodes);
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

}
