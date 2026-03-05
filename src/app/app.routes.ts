import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Login } from './features/auth/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login }
    ]
  },
  {
    path: 'dashboard',
    component: AdminLayout,
    //canActivate: [authGuard]
    children: [
      { path: '', component: Dashboard  }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];
