import { Routes } from '@angular/router';
import { ReportsSideContentComponent } from '../reports';
import { SideContentEmptyComponent } from '@skautoteka-frontend/ui';

export const REPORTS_ROUTES: Routes = [
  {
    path: 'details',
    children: [
      {
        path: ':id',
        component: ReportsSideContentComponent
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
