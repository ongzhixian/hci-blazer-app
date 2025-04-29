import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  private baseUrl: string;

  constructor() {

    this.baseUrl = "http://localhost:7265";
    this.baseUrl = "http://192.168.79.11:80";
    this.baseUrl = "https://flikx8i3c2.execute-api.us-east-1.amazonaws.com";

    //console.log('Is running under production environment? ', environment.production);
    if (environment.production) this.baseUrl = "https://hci-blazer-func.azurewebsites.net";
    if (environment.production) this.baseUrl = "https://flikx8i3c2.execute-api.us-east-1.amazonaws.com";
  }

  UrlFor(key:string) {
    switch (key.toUpperCase())
    {
      case "AUTHENTICATEUSER":
        return `${this.baseUrl}/api/AuthenticateUser`
      case "HELLOWORLD":
        return `${this.baseUrl}/api/HelloWorld`
      case "AUTHENTICATE_USER_CREDENTIAL":
        return `${this.baseUrl}/hci-blazer/authenticate-user-credential`
      default:
        return "";
    }
  }
}
