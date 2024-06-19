import { Routes } from '@angular/router';
import { DashboardComponent } from './components';
import { TasksComponent } from '../tasks';
import { ReportsComponent } from '../reports';
import { TeamsComponent } from '../teams';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'tasks',
        component: TasksComponent,
        loadChildren: () => import('./tasks.routes').then(r => r.TASKS_ROUTES)
      },
      {
        path: 'reports',
        component: ReportsComponent,
        loadChildren: () => import('./reports.routes').then(r => r.REPORTS_ROUTES)
      },
      {
        path: 'teams',
        component: TeamsComponent,
        loadChildren: () => import('./teams.routes').then(r => r.TEAMS_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
