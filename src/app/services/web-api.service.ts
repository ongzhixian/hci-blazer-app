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

      case URL_FOR.USER_CREDENTIAL_AUTHENTICATION:
        return `${this.baseUrl}/hci-blazer/authenticate-user-credential`
      case URL_FOR.LIST_ITEMS:
      case URL_FOR.ADD_ITEM:
      case URL_FOR.BORROW_ITEM:
      case URL_FOR.RETURN_ITEM:
        return `${this.baseUrl}/hci-blazer/item`
      default:
        return "";
    }
  }
}

export enum URL_FOR {
  SOME_OTHER_URL1 = "USER_CREDENTIAL_AUTHENTICATION",
  SOME_OTHER_URL2 = "USER_CREDENTIAL_AUTHENTICATION",
  SOME_OTHER_URL3 = "USER_CREDENTIAL_AUTHENTICATION",
  USER_CREDENTIAL_AUTHENTICATION = "USER_CREDENTIAL_AUTHENTICATION",
  ADD_ITEM = "ADD_ITEM",
  GET_ITEM = "GET_ITEM",
  LIST_ITEMS = "LIST_ITEMS",
  BORROW_ITEM = "BORROW_ITEM",
  RETURN_ITEM = "RETURN_ITEM",
  UPDATE_ITEM = "UPDATE_ITEM",
};
