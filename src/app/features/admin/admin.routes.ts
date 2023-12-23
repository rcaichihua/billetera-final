import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { WalletsHttp } from './features/wallets/http/wallets.http';
import { tokenInterceptor } from '../auth/interceptors/token.interceptor';
import { baseUrlInterceptor } from '../../core/interceptors/base-url.interceptor';

const routes: Routes = [
  { path: '', redirectTo: 'wallets', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'categories', loadChildren: () => import('./features/categories/categories.routes') },
      { path: 'users', loadChildren: () => import('./features/users/users.routes') },
      { path: 'movements', loadChildren: () => import('./features/movements/movements.routes') },
      {
        path: 'wallets',
        providers: [provideHttpClient(withInterceptors([baseUrlInterceptor, tokenInterceptor])), WalletsHttp],
        loadChildren: () => import('./features/wallets/wallets.routes'),
      },
    ],
  },
];

export default routes;
