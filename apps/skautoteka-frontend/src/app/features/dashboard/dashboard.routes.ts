import { Routes } from '@angular/router';
import { DashboardComponent, DashboardUserComponent } from './components';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'tasks',
        component: DashboardUserComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
