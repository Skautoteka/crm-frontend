import { Routes } from '@angular/router';
import { TasksComponent } from '../tasks';
import { TasksSideContentComponent } from '../tasks/components/tasks-side-content/tasks-side-content.component';

export const TASKS_ROUTES: Routes = [
  {
    path: 'details',
    component: TasksSideContentComponent,
    children: [
      {
        path: ':id',
        component: TasksComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'details',
  },
];
