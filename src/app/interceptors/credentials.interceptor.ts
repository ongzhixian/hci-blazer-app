import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("credentialsInterceptor called");
  return next(req);
};
