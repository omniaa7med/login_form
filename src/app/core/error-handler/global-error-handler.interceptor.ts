import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements HttpInterceptor {
  constructor(
    private errorHandlingService: ErrorHandlingService,
    private _router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (httpError) => {
          //destruct statuscode & error message
          const { statusCode, message } = httpError?.error?.error
            ? httpError?.error?.error
            : { statusCode: null, message: null };

          if (httpError.status === 401 && !httpError.url.includes('login')) {
            // this._auth.user.logout();
            localStorage.clear();
            sessionStorage.clear();
            this._router.navigate(['/login']);
          } else if (
            httpError.status == 404 &&
            httpError.url.includes('undefined.json')
          ) {
            return;
          }
        },
      })
    );
  }
}
