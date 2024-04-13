import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router, 
    private http: HttpClient
  ) { 
    //super(Capacitor.isNativePlatform() ? nativeAuthOptions : webAuthOptions); 
  }

  authenticateUser(username: string, password: string) {
    // https://hci-blazer-func.azurewebsites.net/api/HelloWorldw
    // "https://ongzhixian.github.io/BasicAngularApp/sampleData/shipping.json"

    console.log(`authenticateUser with ${username}, ${password}`);

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    this.http.get(
      "https://hci-blazer-func.azurewebsites.net/api/HelloWorldw",
      { headers, responseType: 'text'}
    ).subscribe(data => {
        console.log(data);
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
