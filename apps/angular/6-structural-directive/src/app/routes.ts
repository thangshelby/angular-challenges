import { Route } from '@angular/router';
import { HasPermissionGuard } from './has-permission.guard';
import { Role } from './user.model';
interface TypedRoute extends Route {
  data?: {
    isAdmin?: boolean;
    roles?: Role[];
  };
}

export const APP_ROUTES: TypedRoute[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      isAdmin: true,
    },
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    data: {
      roles: ['MANAGER'],
    },
    canMatch: [HasPermissionGuard],
    loadComponent: () =>
      import('./dashboard/manager.component').then((m) => m.ManagerComponent),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      roles: ['WRITER'],
    },
    loadComponent: () =>
      import('./dashboard/writer.component').then((m) => m.WriterComponent),
  },
];
