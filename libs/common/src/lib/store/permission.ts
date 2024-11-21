import { AuthStore } from './../../../../../apps/skautoteka-frontend/src/app/features/auth/store/auth.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HttpClient } from "@angular/common/http";
import { effect, inject } from "@angular/core";
import { patchState, signalStoreFeature, withHooks, withMethods, withState } from "@ngrx/signals";
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

interface Permissions {
  read: boolean;
  edit: boolean;
  remove: boolean;
  create: boolean;
}

const defaultPermission = {
  read: false,
  edit: false,
  remove: false,
  create: false
}

/**
 * Signal store feature for managing permissions
 *
 * @param name
 * @returns
 */
export const withPermissions = (name: string) => signalStoreFeature(
  withState<{ permissions: Permissions | null, permissionsLoading: boolean }>
    ({ permissions: null, permissionsLoading: false }),
  withMethods(store => {
    const http = inject(HttpClient);

    return {
      /**
       * Retrieves permisisons
       */
      getPermissions: rxMethod<void>(pipe(
        tap(() => {
          patchState(store, { permissionsLoading: true });
        }),
        switchMap(() => http.get<Permissions>(`api/${name}/permissions`).pipe(
          tapResponse({
            next: permissions => patchState(store, { permissions }),
            error: () => patchState(store, { permissions: defaultPermission }),
            finalize: () => patchState(store, { permissionsLoading: false })
          })
        ))
      )),

      /**
       * Clears the permissions store slice
       *
       * @returns
       */
      clear: () => patchState(store, { permissions: defaultPermission })
    }
  }),
  withHooks(store => {
    const auth = inject(AuthStore);

    return {
      onInit: () => {
        store.getPermissions(auth.isLoggedIn);

        effect(() => {
          const isLoggedIn = auth.isLoggedIn();

          if(!isLoggedIn) {
            store.clear();
          }
        }, { allowSignalWrites: true })
      }
    }
  })
)
