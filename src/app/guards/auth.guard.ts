import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthenticationService);
  
  const router = inject(Router);

  let hasAuthenticatedUser = await authService.hasAuthenticatedUser();

  console.log(`authGuard ${hasAuthenticatedUser} checks ${state.url} ${router}`);

  return hasAuthenticatedUser ? true : router.createUrlTree(['/login']);

  // if (hasAuthenticatedUser) return true;

  // return router.createUrlTree(['/login'])
};
