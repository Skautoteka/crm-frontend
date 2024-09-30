import { inject } from "@angular/core";
import { patchState, signalStoreFeature, withMethods } from "@ngrx/signals"
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from "rxjs";
import { TeamsHttpService } from "../services/teams-http.service";

export const withTeamsMethods = () => {
  const httpService = inject(TeamsHttpService);

  return signalStoreFeature(
    withMethods((store) => {
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

      return {
        getTeams
      }
    })
  )
}
