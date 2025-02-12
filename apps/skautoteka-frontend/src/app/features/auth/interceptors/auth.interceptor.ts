import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';
import { AuthHttpService } from '../services/auth-http.service';
import { Router } from '@angular/router';

/**
 * Auth interceptor that intercepts outgoing requests
 * @param req
 * @param next
 * @returns
 */
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const httpService = inject(AuthHttpService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.url && err.url.endsWith('login')) {
        return throwError(() => err);
      }

      if (err.status === 401) {
        if (err.url && err.url.endsWith('refresh-token')) {
          router.navigate(['/', 'auth']);
          return EMPTY;
        } else {
          return httpService.refresh$().pipe(switchMap(() => next(req)));
        }
      }

      return throwError(() => err);
    })
  );
};
