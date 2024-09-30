import { inject } from "@angular/core";
import { patchState, signalStoreFeature, withMethods, type } from "@ngrx/signals"
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from "rxjs";
import { TeamsHttpService } from "../services/teams-http.service";
import { Team } from "../interfaces/team";
import { TeamStoreState } from "./teams.store";

export const withTeamsMethods = () => {
  return signalStoreFeature(
    { state: type<TeamStoreState>() },
    withMethods((store) => {
      const httpService = inject(TeamsHttpService);

      /**
       * Gets all the teams from the database.
       */
      const getTeams = rxMethod<void>(pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => httpService.getAllTeams$().pipe(tapResponse({
          next: (teams) => patchState(store, { teams }),
          error: () => null,
          finalize: () => patchState(store, { isLoading: false })
        })))
      ))

      /**
       * A private method that is used to filter teams.
       *
       * @param id id of the team to remove
       * @returns
       */
      const _filterTeam = (id: string): Team[] => store.teams().filter(team => team.id !== id);

      /**
       * Removes team by id from the store.
       */
      const removeTeam = rxMethod<string>(pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => httpService.deleteTeam$(id).pipe(tapResponse({
          next: () => patchState(store, { teams: _filterTeam(id)  }),
          error: () => null,
          finalize: () => patchState(store, { isLoading: false })
        })))
      ))

      return {
        getTeams,
        removeTeam
      }
    })
  )
}
