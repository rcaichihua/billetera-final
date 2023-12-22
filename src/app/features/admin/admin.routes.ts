import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'categories', loadChildren: () => import('./features/categories/categories.routes') },
      { path: 'users', loadChildren: () => import('./features/users/users.routes') },
      { path: 'movements', loadChildren: () => import('./features/movements/movements.routes') },
      { path: 'wallets', loadChildren: () => import('./features/wallets/wallets.routes') }
    ]
  }
]

export default routes;
