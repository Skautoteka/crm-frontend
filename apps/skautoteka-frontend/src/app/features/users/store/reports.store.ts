import { InputConfig } from '@skautoteka-frontend/ui';
import { User } from '../interfaces/user';
import { signalStore, withState } from '@ngrx/signals';
import { withReportsMethods } from './reports.methods';

export type ReportsStoreState = {
  reports: User[];
  isLoading: boolean;
  activeReport: User | null;
  createFields: InputConfig | null;
};

const initialState: ReportsStoreState = {
  reports: [],
  isLoading: false,
  activeReport: null,
  createFields: null
};

export const ReportsStore = signalStore({ providedIn: 'root' }, withState(initialState), withReportsMethods());
