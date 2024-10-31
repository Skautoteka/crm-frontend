import { User } from '../interfaces/user';
import { signalStore, withState } from '@ngrx/signals';
import { withUsersMethods } from './users.methods';

export type UsersStoreState = {
  users: User[];
  isLoading: boolean;
  activeUser: User | null;
};

const initialState: UsersStoreState = {
  users: [],
  isLoading: false,
  activeUser: null
};

export const UsersStore = signalStore({ providedIn: 'root' }, withState(initialState), withUsersMethods());
