import { Routes } from '@angular/router';
import { UsersSideContentComponent } from '../users';
import { SideContentEmptyComponent } from '@skautoteka-frontend/ui';

export const USERS_ROUTES: Routes = [
  {
    path: 'details',
    children: [
      {
        path: ':id',
        component: UsersSideContentComponent
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
