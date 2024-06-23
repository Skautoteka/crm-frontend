import { Routes } from '@angular/router';
import { SideContentEmptyComponent } from '@skautoteka-frontend/ui';
import { TeamsSideContentComponent } from '../teams';

export const TEAMS_ROUTES: Routes = [
  {
    path: 'details',
    children: [
      {
        path: ':id',
        component: TeamsSideContentComponent
      },
      {
        path: '**',
        redirectTo: '..'
      }
    ]
  },
  {
    path: '**',
    component: SideContentEmptyComponent
  }
];
