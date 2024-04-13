import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

// route: ActivatedRouteSnapshot,
// state: RouterStateSnapshot
export const authGuard: CanActivateFn = (route, state) => {

  console.log("in authGuard");

  // const userProfile = this.authenticationService.userProfileValue;
  
  // // No userProfile => not logged in
  // // so redirect to login page with the return url
  // if (!userProfile) {
      
  //     this.router.navigate(['/login'], { 
  //         queryParams: { returnUrl: state.url } 
  //     });

  //     return false;
  // }
  //return inject(Router).createUrlTree(['/login']);
  return inject(Router).navigate(['/login']);

  // Else is logged in so return true
  return true;

  // Angular 16 (see: https://medium.com/@ojiofor/how-to-use-angular-canactivate-function-b153e5a79f51)
  // // Assume we have constructor(private token: TokenService, private router: Router) { }
  // return inject(TokenService).authenticated()
  //   ? true
  //   : inject(Router).createUrlTree(['/auth/login']);
  

};
