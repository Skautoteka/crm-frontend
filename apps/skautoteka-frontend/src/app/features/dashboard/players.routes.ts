import { Routes } from '@angular/router';
import { TasksSideContentComponent } from '../tasks/components/tasks-side-content/tasks-side-content.component';
import { SideContentEmptyComponent } from '@skautoteka-frontend/ui';

export const PLAYERS_ROUTES: Routes = [
  {
    path: 'details',
    children: [
      {
        path: ':id',
        component: TasksSideContentComponent
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
