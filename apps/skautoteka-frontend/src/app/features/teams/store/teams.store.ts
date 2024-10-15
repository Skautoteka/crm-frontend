import { signalStore, withState } from '@ngrx/signals';
import { Team } from '../interfaces/team';
import { withTeamsMethods } from './teams.methods';
import { InputConfig } from '@skautoteka-frontend/ui';

export type TeamStoreState = {
  teams: Team[];
  isLoading: boolean;
  activeTeam: Team | null;
  createFields: InputConfig | null;
};

const initialState: TeamStoreState = {
  teams: [],
  isLoading: false,
  activeTeam: null,
  createFields: null
};

export const TeamsStore = signalStore({ providedIn: 'root' }, withState(initialState), withTeamsMethods());
