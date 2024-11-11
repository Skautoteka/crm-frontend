import { Route } from '@angular/router';
import { DashboardGuard } from './features/auth/guards/auth.guard';
import { LoginComponent } from './features/auth/components/login/login.component';
import { sidenavElementResolver } from './features/dashboard/resolvers/sidenav-element.resolver';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(r => r.DASHBOARD_ROUTES),
    canActivate: [DashboardGuard],
    resolve: { sidenavElements: sidenavElementResolver }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
