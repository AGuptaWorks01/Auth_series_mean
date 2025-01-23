import { Routes } from '@angular/router';
import { AuthGuard } from './authGuard/authguard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./pages/forget-password/forget-password.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'reset/:token',
    loadComponent: () => import('./pages/reset/reset.component'),
  },
];
