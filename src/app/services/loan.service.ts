import { Injectable } from '@angular/core';
import {BorrowMessage, OperationResponseMessage, InventoryItem} from "../models/borrow-message";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {URL_FOR, WebApiService} from "./web-api.service";
import {AuthenticationService} from "./authentication.service";

// interface Bor {
//   is_valid: boolean;
//   username: string;
// }

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(
    private http: HttpClient
    , private webApi: WebApiService
    , private authenticationService: AuthenticationService
  ) {
    //this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  borrowItem(message:BorrowMessage) {
    //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.patch(
      this.webApi.UrlFor(URL_FOR.BORROW_ITEM),
      { updateType: 'new-borrow', ...message },
      { headers: this.headers, responseType: 'json' }
    ).subscribe(async data => {
      console.log('Response data', data);
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

  addItem(message:AddItemMessage) {
    let authUserData = this.authenticationService.getAuthenticatedUser()

    console.log('Add item', message, authUserData);

    return this.http.post<OperationResponseMessage>(
      this.webApi.UrlFor(URL_FOR.ADD_ITEM),
      message,
      { headers: this.headers, responseType: 'json' }
    );


  } // end addItem

  returnItem(id:string) {}

  getItemById(id:string) {}

  getItemList(pageNumber:number) {
    return this.http.get<InventoryItem[]>(
      this.webApi.UrlFor(URL_FOR.LIST_ITEMS),
      { headers: this.headers, responseType: 'json' }
    );

  }
}

// LOAN SERVICES MESSAGES

export interface AddItemMessage {
  itemCode: string;
  userCode: string;
}
