import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorageService } from './app-storage.service';
import { WebApiService } from './web-api.service';

interface UserData {
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  async signOut() {
    this.authenticatedUser = null;
    await this.appStorage.remove('authenticatedUserData');
    this.router.navigate(['/login']);
    //throw new Error('Method not implemented.');
  }

  private authenticatedUser: UserData | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private appStorage: AppStorageService,
    private webApi: WebApiService
  ) {
    //super(Capacitor.isNativePlatform() ? nativeAuthOptions : webAuthOptions); 
  }

  async hasAuthenticatedUser() {

    try {

      this.authenticatedUser = await this.appStorage.get<UserData>('authenticatedUserData');

      console.log(`hasAuthenticatedUser returns ${this.authenticatedUser !== null}; because authenticatedUser is ${this.authenticatedUser}`);

      return this.authenticatedUser !== null;

    } catch (e) {

      console.error(`hasAuthenticatedUser returns false; Exception ${e}`);

      return false;
    }
    
  }

  authenticateUser(username: string, password: string) {
    // https://hci-blazer-func.azurewebsites.net/api/HelloWorldw
    // "https://ongzhixian.github.io/BasicAngularApp/sampleData/shipping.json"

    console.log(`authenticateUser with ${username}, ${password}`);

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    // this.http.get(
    //   "https://hci-blazer-func.azurewebsites.net/api/helloworld",
    //   { headers, responseType: 'text'}
    // ).subscribe(data => {
    //     console.log(data);
    // });

    console.log(`POST TO ${this.webApi.UrlFor("AuthenticateUser")}`);

    this.http.post(
      //"https://hci-blazer-func.azurewebsites.net/api/authenticateuser",
      this.webApi.UrlFor("AuthenticateUser"),
      { username, password },
      { headers, responseType: 'text' }
    ).subscribe(async data => {
      console.log(data);
      if (data === "AuthenticUser") {

        // Parse data
        this.authenticatedUser = {
          name: 'zhixian',
          age: 30
        };

        await this.appStorage.set('authenticatedUserData', this.authenticatedUser);

        this.router.navigate(['/tabs/tab2']);
      }
    });




    // return this.http.post<any>(`${environment.apiUrl}/users/authenticate?799=okok`, { username, password })
    // .pipe(map(user => {
    //     // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
    //     user.authdata = window.btoa(username + ':' + password);
    //     localStorage.setItem('user', JSON.stringify(user));
    //     this.userSubject.next(user);
    //     return user;
    // }));
  }

  async onLoginSuccess() {
    await this.router.navigate(['/']);
  }
}
