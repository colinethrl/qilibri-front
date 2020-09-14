import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private securityService: SecurityService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(!/login/.test(request.url) && !/sign-up/.test(request.url)) {
      const user = JSON.parse(localStorage.getItem('user'));
      const authHeader = this.securityService.getAuthHeader(user);
      request = request.clone({
        setHeaders: {
          'Authorization': authHeader,
        },
      });
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }
}
