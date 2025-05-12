import { Injectable } from '@angular/core';
import {BorrowMessage, OperationResponseMessage, InventoryItem, ReturnMessage} from "../models/borrow-message";
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {URL_FOR, WebApiService} from "./web-api.service";
import {AuthenticationService} from "./authentication.service";
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

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

  // This should match to backend
  // See: class UpdateInventoryItemMessage(Message)
  // BORROW_MESSAGE_TYPE = 'BORROW'
  // RETURN_MESSAGE_TYPE = 'RETURN'
  // EXTEND_BORROW_PERIOD_MESSAGE_TYPE = 'EXTEND-BORROW-PERIOD'

  private handleHttpError(error: HttpErrorResponse) {
    if (error.status === 500) {
      console.error('Server error:', error);
      return throwError(() => new Error('Something went wrong on the server.'))
    } else { // Handle other errors
      console.error('An error occurred:', error);
      return throwError(() => new Error('An error occurred. Please try again later.'))
    }
  }

  borrowItem(message:BorrowMessage) {
    //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.patch<OperationResponseMessage>(
      this.webApi.UrlFor(URL_FOR.BORROW_ITEM),
      { updateType: 'BORROW', ...message },
      { headers: this.headers, responseType: 'json' }
    ).pipe(
      catchError(this.handleHttpError)
    );
  }

  returnItem(message:ReturnMessage) {
    return this.http.patch<OperationResponseMessage>(
      this.webApi.UrlFor(URL_FOR.RETURN_ITEM),
      { updateType: 'RETURN', ...message },
      { headers: this.headers, responseType: 'json' }
    );
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
