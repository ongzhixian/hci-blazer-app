import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { 
    //super(Capacitor.isNativePlatform() ? nativeAuthOptions : webAuthOptions); 
    
  }

  async onLoginSuccess() {
    await this.router.navigate(['/']);
  }
}
