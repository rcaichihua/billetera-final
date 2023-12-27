import { Routes } from '@angular/router';
import { ListComponent } from './views/list/list.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', loadComponent: () => import('./views/create/create.component') },
  { path: 'wallet/:id', loadComponent: () => import('./views/update/update.component') },
]
export default routes
