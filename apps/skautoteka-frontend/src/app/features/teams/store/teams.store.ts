import { signalStore, withState } from '@ngrx/signals';
import { Team } from '../interfaces/team';
import { withTeamsMethods } from './teams.methods';
import { InputConfig } from '@skautoteka-frontend/ui';
import { Player } from '../../players/interfaces';
import { withPermissions } from '@skautoteka-frontend/common';

export type TeamStoreState = {
  teams: Team[];
  teamPlayers: Player[];
  isLoading: boolean;
  activeTeam: Team | null;
  createFields: InputConfig | null;
};

const initialState: TeamStoreState = {
  teams: [],
  teamPlayers: [],
  isLoading: false,
  activeTeam: null,
  createFields: null
};

export const TeamsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withTeamsMethods(),
  withPermissions('team')
);
