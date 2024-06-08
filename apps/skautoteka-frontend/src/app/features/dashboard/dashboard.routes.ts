import { Routes } from '@angular/router';
import { DashboardComponent } from './components';
import { TasksComponent } from '../tasks';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'tasks',
        component: TasksComponent,
        loadChildren: () =>
          import('./tasks.routes').then((r) => r.TASKS_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
