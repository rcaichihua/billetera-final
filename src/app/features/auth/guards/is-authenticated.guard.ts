import { inject } from '@angular/core';
import { Router, type CanActivateFn, type UrlTree } from '@angular/router';
import { SessionService } from '../services/session.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  return inject(SessionService).isAuthenticated() || inject(Router).parseUrl('/auth');
};
