import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class authInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // You can manipulate the request before it is sent
    console.log('Intercepted Request:', httpRequest);

    //any alteration in httpRequest can be done here
  return next.handle(httpRequest);
}
};
