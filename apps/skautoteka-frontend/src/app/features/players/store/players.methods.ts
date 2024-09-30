import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals"
import { PlayersStoreState } from "./players.store"
import { Router } from "@angular/router";
import { ModalService } from "@skautoteka-frontend/ui";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { PlayersHttpService } from "../services/players-http.service";
import { tapResponse } from "@ngrx/operators";
import { Player } from "../interfaces";

export const withPlayersMethods = () => {
  return signalStoreFeature({ state: type<PlayersStoreState>() }, withMethods((store) => {
    const httpService = inject(PlayersHttpService);
    const router = inject(Router);
    const modal = inject(ModalService);

    /**
     * Gets all players from the database.
     */
    const getPlayers = rxMethod<void>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(() => httpService.getAllPlayers$().pipe(tapResponse({
        next: players => patchState(store, { players }),
        error: () => null,
        finalize: () => patchState(store, { isLoading: false })
      })))
    ))

    /**
     * Private method to filter players.
     *
     * @param id
     * @returns
     */
    const _filterPlayer = (id: string | null): Player[] => store.players().filter(player => player.id !== id);

    /**
     * A private method that is used to find a player from the store.
     *
     * @param id
     * @returns
     */
    const _findPlayer = (id: string | null): Player | null => store.players().find(player => player.id === id) || null;

    /**
     * Removes team from the database and from the store.
     */
    const removeTeam = rxMethod<string>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(id => httpService.deletePlayer$(id).pipe(tapResponse({
        next: () => patchState(store, { players: _filterPlayer(id) }),
        error: () => null
      })))
    ))

    /**
     * Adds a player to the store and to the database.
     */
    const addPlayer = rxMethod<Player>(pipe(
      switchMap(player => httpService.addPlayer$(player).pipe(tapResponse({
        next: ({ added }) => patchState(store, { players: [...store.players(), added] }),
        error: () => null,
        finalize: () => modal.closeAll()
      })))
    ))

    /**
     * Fetches the create fields from backend and saves it to the store.
     */
    const fetchFields = rxMethod<void>(pipe(
      switchMap(() => httpService.getCreateFieldsConfig$().pipe(tapResponse({
        next: (createFields) => patchState(store, { createFields }),
        error: () => null
      })))
    ));

    /**
     * Sets active player.
     *
     * @param id
     */
    const setActivePlayer = (id: string | null) => {
      const activePlayer = _findPlayer(id);
      if (activePlayer) {
        router.navigate(['dashboard', 'player', 'details', activePlayer.id]);
      } else {
        router.navigate(['dashboard', 'player']);
      }
    }

    return {
      getPlayers,
      removeTeam,
      addPlayer,
      fetchFields,
      setActivePlayer
    }
  }))
}
