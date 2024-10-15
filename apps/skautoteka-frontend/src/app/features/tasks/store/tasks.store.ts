import { InputConfig } from '@skautoteka-frontend/ui';
import { signalStore, withState } from '@ngrx/signals';
import { Task } from '../interfaces/task';
import { withTasksMethods } from './tasks.methods';

export type TasksStoreState = {
  tasks: Task[];
  isLoading: boolean;
  activeTask: Task | null;
  createFields: InputConfig | null;
};

const initialState: TasksStoreState = {
  tasks: [],
  isLoading: false,
  activeTask: null,
  createFields: null
};

export const TasksStore = signalStore({ providedIn: 'root' }, withState(initialState), withTasksMethods());
