import { InputConfig } from '@skautoteka-frontend/ui';
import { Report } from '../interfaces/report';
import { signalStore, withState } from '@ngrx/signals';
import { withReportsMethods } from './reports.methods';
import { withPermissions } from '@skautoteka-frontend/common';

export type ReportsStoreState = {
  reports: Report[];
  isLoading: boolean;
  activeReport: Report | null;
  selectedReport: Report | null;
  createFields: InputConfig | null;
  reportFields: InputConfig | null;
};

const initialState: ReportsStoreState = {
  reports: [],
  isLoading: false,
  activeReport: null,
  selectedReport: null,
  createFields: null,
  reportFields: null
};

export const ReportsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withReportsMethods(),
  withPermissions('report')
);
