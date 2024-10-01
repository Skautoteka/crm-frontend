import { Route } from '@angular/router';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { LoginComponent } from './features/auth/components/login/login.component';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(r => r.DASHBOARD_ROUTES),
    canActivate: [AuthGuard]
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
