import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import(
        './features/dashboard/components/dashboard/dashboard.component'
      ).then((c) => c.DashboardComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './features/dashboard/components/dashboard/dashboard.component'
      ).then((c) => c.DashboardComponent),
  },
];
