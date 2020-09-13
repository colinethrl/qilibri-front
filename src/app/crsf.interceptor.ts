import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CrsfInterceptor implements HttpInterceptor {
  constructor(private tokenService: HttpXsrfTokenExtractor) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (request.method === 'GET' || request.method === 'HEAD') {
    //   return next.handle(request);
    // }
    
    
    
    request = request.clone({ withCredentials: true });
    
    console.log(request)
    // const token = this.tokenService.getToken();

    // if (token !== null && !request.headers.has("X-XSRF-TOKEN")) {
    //   console.log(token)
    // }
    return next.handle(request);
  }
}
