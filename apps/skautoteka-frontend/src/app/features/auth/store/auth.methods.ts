import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals"
import { AuthStoreState } from "./auth.store"
import { inject } from "@angular/core"
import { AuthHttpService } from "../services/auth-http.service"
import { LoginPayload } from '../interfaces/iauth';
import { delay, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

export const withAuthMethods = () => {
  return signalStoreFeature({ state: type<AuthStoreState>() }, withMethods(store => {
    const httpService = inject(AuthHttpService);
    const router = inject(Router);

    /**
     * A method that is used to log in the user via the
     * login form.
     */
    const login = rxMethod<LoginPayload>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(payload => httpService.login$(payload).pipe(
        switchMap(() => httpService.getUser$()),
        tapResponse({
          next: (user) => patchState(store, { user }),
          error: () => null,
          finalize: () => patchState(store, { isLoading: false })
      })))
    ))

    const logout = rxMethod<void>(pipe(
      switchMap(() => httpService.logout$().pipe(tapResponse({
        next: () => patchState(store, { user: null }),
        error: () => null
      })))
    ))

    const getUser = rxMethod<void>(pipe(
      switchMap(() => httpService.getUser$().pipe(tapResponse({
        next: (user) => patchState(store, { user }),
        error: () => null
      })))
    ))

    const refreshUser = rxMethod<RouterStateSnapshot>(pipe(
      delay(10000),
      switchMap((route) => httpService.getUser$().pipe(tapResponse({
        next: (user) => {
          patchState(store, { user });
          console.log(route.url)
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
