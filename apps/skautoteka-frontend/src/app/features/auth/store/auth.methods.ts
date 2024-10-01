import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals"
import { AuthStoreState } from "./auth.store"
import { inject } from "@angular/core"
import { AuthHttpService } from "../services/auth-http.service"
import { LoginPayload } from '../interfaces/iauth';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export const withAuthMethods = () => {
  return signalStoreFeature({ state: type<AuthStoreState>() }, withMethods(store => {
    const httpService = inject(AuthHttpService);

    /**
     * A method that is used to log in the user via the
     * login form.
     */
    const login = rxMethod<LoginPayload>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(payload => httpService.login$(payload).pipe(tapResponse({
        next: (tokens) => console.log(tokens),
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

    return {
      login,
      logout
    }
  }))
}
