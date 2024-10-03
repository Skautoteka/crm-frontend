import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, EMPTY, switchMap, throwError } from "rxjs";
import { AuthStore } from "../store/auth.store";
import { AuthHttpService } from "../services/auth-http.service";
import { Router } from "@angular/router";

/**
 * Auth interceptor that intercepts outgoing requests
 * @param req
 * @param next
 * @returns
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const httpService = inject(AuthHttpService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if(err.status === 403) {
        if(err.url && err.url.endsWith('refresh-token')) {
          router.navigate(['/', 'auth']);
          return EMPTY;
        } else {
          return httpService.refresh$().pipe(switchMap(() => next(req)))
        }
      }

      return throwError(() => err);
    })
  )
}
