import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
 constructor() { }
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   // add authorization header with jwt token if available
   return next.handle(request);
  }
}
