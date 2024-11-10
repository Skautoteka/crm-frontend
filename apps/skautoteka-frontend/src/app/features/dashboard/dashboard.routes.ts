import { Routes } from '@angular/router';
import { DashboardComponent } from './components';
import { TasksComponent } from '../tasks';
import { ReportsComponent } from '../reports';
import { TeamsComponent } from '../teams';
import { PlayersComponent } from '../players';
import { UsersComponent } from '../users';
import { AnalysisComponent } from '../analysis/components/analysis/analysis.component';

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
      },
      {
        path: 'players',
        component: PlayersComponent,
        loadChildren: () => import('./players.routes').then(r => r.PLAYERS_ROUTES)
      },
      {
        path: 'analysis',
        component: AnalysisComponent
      },
      {
        path: 'users',
        component: UsersComponent,
        loadChildren: () => import('./users.routes').then(r => r.USERS_ROUTES)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
