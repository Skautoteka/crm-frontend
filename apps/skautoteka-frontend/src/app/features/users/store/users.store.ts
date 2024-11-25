import { User } from '../interfaces/user';
import { signalStore, withState } from '@ngrx/signals';
import { withUsersMethods } from './users.methods';
import { InputConfig } from '@skautoteka-frontend/ui';
import { withPermissions } from '@skautoteka-frontend/common';

export type UsersStoreState = {
  users: User[];
  isLoading: boolean;
  activeUser: User | null;
  createFields: InputConfig | null;
};

const initialState: UsersStoreState = {
  users: [],
  isLoading: false,
  activeUser: null,
  createFields: null
};

export const UsersStore = signalStore({ providedIn: 'root' }, withState(initialState), withUsersMethods(), withPermissions('user'));
