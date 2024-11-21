import { InputConfig } from '@skautoteka-frontend/ui';
import { Player } from '../interfaces';
import { signalStore, withState } from '@ngrx/signals';
import { withPlayersMethods } from './players.methods';
import { withPermissions } from '@skautoteka-frontend/common';

export type PlayersStoreState = {
  players: Player[];
  isLoading: boolean;
  activePlayer: Player | null;
  createFields: InputConfig | null;
};

export const initialState: PlayersStoreState = {
  players: [],
  isLoading: false,
  activePlayer: null,
  createFields: null
};

export const PlayersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withPlayersMethods(),
  withPermissions('player')
);
