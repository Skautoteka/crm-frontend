import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { UsersStoreState } from './users.store';
import { inject } from '@angular/core';
import { UsersHttpService } from '../services/users-http.service';
import { Router } from '@angular/router';
import { ModalService, NotificationsService } from '@skautoteka-frontend/ui';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { User } from '../interfaces/user';

export const withUsersMethods = () => {
  return signalStoreFeature(
    { state: type<UsersStoreState>() },
    withMethods(store => {
      const httpService = inject(UsersHttpService);
      const router = inject(Router);
      const modal = inject(ModalService);
      const notifications = inject(NotificationsService);

      /**
       * Gets all users from the database.
       */
      const getUsers = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            httpService.getAllUsers$().pipe(
              tapResponse({
                next: users => patchState(store, { users }),
                error: () => {
                  notifications.error('Brak dostepu do rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => patchState(store, { isLoading: false })
              })
            )
          )
        )
      );

      /**
       * Private method to filter users.
       *
       * @param id
       * @returns
       */
      const _filterUser = (id: string | null): User[] => store.users().filter(user => user.id !== id);

      /**
       * A private method that is used to find a user from the store.
       *
       * @param id
       * @returns
       */
      const _findUser = (id: string | null): User | null => store.users().find(user => user.id === id) || null;

      /**
       * Removes user from the database and from the store.
       */
      const removeUser = rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(id =>
            httpService.removeUser$(id).pipe(
              tapResponse({
                next: () => patchState(store, { users: _filterUser(id) }),
                error: () => {
                  notifications.error('Brak dostepu do usuwania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => setActiveUser(null)
              })
            )
          )
        )
      );

      /**
       * Adds a user to the store and to the database.
       */
      const addUser = rxMethod<User>(
        pipe(
          switchMap(user =>
            httpService.addUser$(user).pipe(
              tapResponse({
                next: res => patchState(store, { users: [...store.users(), res.added] }),
                error: () => {
                  notifications.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => modal.closeAll()
              })
            )
          )
        )
      );

      /**
       * Sets active user.
       *
       * @param id
       */
      const setActiveUser = (id: string | null) => {
        const activeUser = _findUser(id);

        if (activeUser) {
          router.navigate(['dashboard', 'users', 'details', activeUser.id]);
        } else {
          router.navigate(['dashboard', 'users']);
        }

        patchState(store, { activeUser });
      };

      /**
       * Fetches the create fields from backend and saves it to the store.
       */
      const fetchFields = rxMethod<void>(
        pipe(
          switchMap(() =>
            httpService.getCreateFieldsConfig$().pipe(
              tapResponse({
                next: createFields => patchState(store, { createFields }),
                error: () => {
                  notifications.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                }
              })
            )
          )
        )
      );

      return {
        getUsers,
        addUser,
        removeUser,
        setActiveUser,
        fetchFields
      };
    })
  );
};
