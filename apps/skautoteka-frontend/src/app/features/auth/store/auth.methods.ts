import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { AuthStoreState } from './auth.store';
import { inject } from '@angular/core';
import { AuthHttpService } from '../services/auth-http.service';
import { LoginPayload } from '../interfaces/iauth';
import { catchError, delay, NEVER, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Router, RouterStateSnapshot } from '@angular/router';
import { LoaderService, NotificationsService } from '@skautoteka-frontend/ui';

export const withAuthMethods = () => {
  return signalStoreFeature(
    { state: type<AuthStoreState>() },
    withMethods(store => {
      const httpService = inject(AuthHttpService);
      const router = inject(Router);
      const loader = inject(LoaderService);
      const notifications = inject(NotificationsService);

      /**
       * A method that is used to log in the user via the
       * login form.
       */
      const login = rxMethod<LoginPayload>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
            loader.showLoader('login');
          }),
          delay(250),
          switchMap(payload =>
            httpService.login$(payload).pipe(
              switchMap(() => httpService.getUser$()),
              tapResponse({
                next: user => {
                  console.log('user', user);
                  patchState(store, { user });
                  router.navigate(['/', 'dashboard']);
                },
                error: err => {
                  console.log('error', err);
                  notifications.error('Wpisane hasło lub email są niepoprawne');
                },
                finalize: () => {
                  console.log('heer');
                  patchState(store, { isLoading: false });
                  loader.hideLoader('login');
                }
              })
            )
          )
        )
      );

      /**
       * The method that is used to log out from the store and the method should
       * clear the cookies.
       */
      const logout = rxMethod<void>(
        pipe(
          tap(() => {
            loader.showLoader('logout');
          }),
          switchMap(() =>
            httpService.logout$().pipe(
              tapResponse({
                next: () => {
                  patchState(store, { user: null });
                  router.navigate(['/', 'auth']);
                },
                error: () => null,
                finalize: () => loader.hideLoader('logout')
              })
            )
          )
        )
      );

      /**
       * Refreshes the user when a client tries to go into a guarded route.
       * If the user is authenticated, they get redirected to a path.
       */
      const refreshUser = rxMethod<RouterStateSnapshot>(
        pipe(
          tap(() => {
            loader.showLoader('refreshUser');
          }),
          switchMap(route =>
            httpService.getUser$().pipe(
              tapResponse({
                next: user => {
                  patchState(store, { user });
                  router.navigateByUrl(route.url);
                },
                error: () => router.navigate(['/', 'auth']),
                finalize: () => loader.hideLoader('refreshUser')
              })
            )
          )
        )
      );

      return {
        login,
        logout,
        refreshUser
      };
    })
  );
};
