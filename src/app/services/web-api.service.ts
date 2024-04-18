import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:7265";
    this.baseUrl = "http://192.168.79.11:80";
  }

  UrlFor(key:string) {
    switch (key.toUpperCase()) 
    {
      case "AUTHENTICATEUSER":
        return `${this.baseUrl}/api/AuthenticateUser`
      case "HELLOWORLD":
        return `${this.baseUrl}/api/HelloWorld`
      default:
        return "";
    }
  }
}
