import { Routes } from '@angular/router';
import { DashboardComponent } from './components';
import { TasksComponent } from '../tasks';
import { ReportsComponent } from '../reports/components/reports/reports.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
