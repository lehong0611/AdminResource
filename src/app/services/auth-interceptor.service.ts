import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token: string = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    req = req.clone({
      headers: req.headers.set('accept', 'application/json')
    });

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401) {
            console.log('ERROR 401 UNAUTHORIZED')
          }
          const err = error.error.message || error.statusText;
          return throwError(error);
        })
      );
  }
}
