import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods, type } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { TeamsHttpService } from '../services/teams-http.service';
import { Team } from '../interfaces/team';
import { TeamStoreState } from './teams.store';
import { Router } from '@angular/router';
import { ModalService, NotificationsService } from '@skautoteka-frontend/ui';

export const withTeamsMethods = () => {
  return signalStoreFeature(
    { state: type<TeamStoreState>() },
    withMethods(store => {
      const httpService = inject(TeamsHttpService);
      const router = inject(Router);
      const modal = inject(ModalService);
      const notification = inject(NotificationsService);

      /**
       * Gets all the teams from the database.
       */
      const getTeams = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            httpService.getAllTeams$().pipe(
              tapResponse({
                next: teams => patchState(store, { teams }),
                error: () => {
                  notification.error('Brak dostepu do rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => patchState(store, { isLoading: false })
              })
            )
          )
        )
      );

      /**
       * A private method that is used to filter teams.
       *
       * @param id id of the team to remove
       * @returns
       */
      const _filterTeam = (id: string): Team[] => store.teams().filter(team => team.id !== id);

      /**
       * A private method that is used to find a team.
       *
       * @param id
       * @returns
       */
      const _findTeam = (id: string | null): Team | null => store.teams().find(team => team.id === id) || null;

      /**
       * Removes team by id from the store.
       */
      const removeTeam = rxMethod<string>(
        pipe(
          switchMap(id =>
            httpService.deleteTeam$(id).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { teams: _filterTeam(id) });
                  notification.success('Poprawnie usunieto druzyne');
                },
                error: () => {
                  notification.error('Brak dostepu do usuwania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => setActiveTeam(null)
              })
            )
          )
        )
      );

      /**
       * Adds a team to the store and to the database.
       */
      const addTeam = rxMethod<Team>(
        pipe(
          switchMap(team =>
            httpService.addTeam$(team).pipe(
              tapResponse({
                next: res => {
                  patchState(store, { teams: [...store.teams(), res.added] })
                  notification.success('Poprawnie dodano zadanie');
                },
                error: () => {
                  notification.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => modal.closeAll()
              })
            )
          )
        )
      );

      /**
       * Fetches create fields for teams.
       */
      const fetchFields = rxMethod<void>(
        pipe(
          switchMap(() =>
            httpService.getCreateFieldsConfig$().pipe(
              tapResponse({
                next: createFields => patchState(store, { createFields }),
                error: () => {
                  notification.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                }
              })
            )
          )
        )
      );

      /**
       * Sets active team.
       *
       * @param id
       */
      const setActiveTeam = (id: string | null) => {
        const activeTeam = _findTeam(id);
        if (activeTeam) {
          router.navigate(['dashboard', 'teams', 'details', activeTeam.id]);
        } else {
          router.navigate(['dashboard', 'teams']);
        }

        patchState(store, { activeTeam });
      };

      return {
        getTeams,
        removeTeam,
        fetchFields,
        addTeam,
        setActiveTeam
      };
    })
  );
};
