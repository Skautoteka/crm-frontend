import { Routes } from '@angular/router';
import { SideContentEmptyComponent } from '@skautoteka-frontend/ui';
import { PlayersSideContentComponent } from '../players/components/players-side-content/players-side-content.component';

export const PLAYERS_ROUTES: Routes = [
  {
    path: 'details',
    children: [
      {
        path: ':id',
        component: PlayersSideContentComponent
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
