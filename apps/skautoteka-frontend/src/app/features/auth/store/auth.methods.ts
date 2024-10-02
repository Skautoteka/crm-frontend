import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals"
import { AuthStoreState } from "./auth.store"
import { inject } from "@angular/core"
import { AuthHttpService } from "../services/auth-http.service"
import { LoginPayload } from '../interfaces/iauth';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Router, RouterStateSnapshot } from '@angular/router';
import { LoaderService } from '@skautoteka-frontend/ui';

export const withAuthMethods = () => {
  return signalStoreFeature({ state: type<AuthStoreState>() }, withMethods(store => {
    const httpService = inject(AuthHttpService);
    const router = inject(Router);
    const loader = inject(LoaderService);

    /**
     * A method that is used to log in the user via the
     * login form.
     */
    const login = rxMethod<LoginPayload>(pipe(
      tap(() => {
        patchState(store, { isLoading: true });
        loader.showLoader('login');
      }),
      switchMap(payload => httpService.login$(payload).pipe(
        switchMap(() => httpService.getUser$()),
        tapResponse({
          next: (user) => patchState(store, { user }),
          error: () => null,
          finalize: () => {
            patchState(store, { isLoading: false })
            loader.hideLoader('login')
          }
      })))
    ))

    /**
     *
     */
    const logout = rxMethod<void>(pipe(
      switchMap(() => httpService.logout$().pipe(tapResponse({
        next: () => {
          patchState(store, { user: null });
          router.navigate(['/', 'auth'])
        },
        error: () => null
      })))
    ))

    /**
     *
     */
    const getUser = rxMethod<void>(pipe(
      switchMap(() => httpService.getUser$().pipe(tapResponse({
        next: (user) => patchState(store, { user }),
        error: () => null
      })))
    ))

    /**
     *
     */
    const refreshUser = rxMethod<RouterStateSnapshot>(pipe(
      switchMap((route) => httpService.getUser$().pipe(tapResponse({
        next: (user) => {
          patchState(store, { user });
          router.navigateByUrl(route.url)
        },
        error: () => router.navigate(['/', 'auth'])
      })))
    ))

    return {
      login,
      logout,
      getUser,
      refreshUser
    }
  }))
}
