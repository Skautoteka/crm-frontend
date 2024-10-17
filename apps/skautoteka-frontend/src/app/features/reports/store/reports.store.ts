import { InputConfig } from '@skautoteka-frontend/ui';
import { Report } from '../interfaces/report';
import { signalStore, withState } from '@ngrx/signals';
import { withReportsMethods } from './reports.methods';

export type ReportsStoreState = {
  reports: Report[];
  isLoading: boolean;
  activeReport: Report | null;
  createFields: InputConfig | null;
};

const initialState: ReportsStoreState = {
  reports: [],
  isLoading: false,
  activeReport: null,
  createFields: null
};

export const ReportsStore = signalStore({ providedIn: 'root' }, withState(initialState), withReportsMethods());
