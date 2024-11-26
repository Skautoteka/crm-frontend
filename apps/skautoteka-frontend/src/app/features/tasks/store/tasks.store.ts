import { InputConfig } from '@skautoteka-frontend/ui';
import { signalStore, withState } from '@ngrx/signals';
import { Task } from '../interfaces/task';
import { Report } from '../../reports/interfaces/report';
import { withTasksMethods } from './tasks.methods';
import { withPermissions } from '@skautoteka-frontend/common';

export type TasksStoreState = {
  tasks: Task[];
  assignedReports: Report[];
  isLoading: boolean;
  activeTask: Task | null;
  createFields: InputConfig | null;
};

const initialState: TasksStoreState = {
  tasks: [],
  assignedReports: [],
  isLoading: false,
  activeTask: null,
  createFields: null
};

export const TasksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withTasksMethods(),
  withPermissions('task')
);
