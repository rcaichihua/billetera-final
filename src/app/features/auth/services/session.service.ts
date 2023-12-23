import { Injectable, InjectionToken, inject } from '@angular/core';
import { Token } from '../models/token.model';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';

export type AppSessionConfig = {
  redirectLoginPath: string;
  redirectLogoutPath: string;
}

export const WALL_SESSION_CONFIG = new InjectionToken<AppSessionConfig>(
  'WALL_SESSION_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({
      redirectLoginPath: '',
      redirectLogoutPath: '',
    }),
  });

export const provideSessionConfig = (value: AppSessionConfig) => ({
  provide: WALL_SESSION_CONFIG,
  useValue: value,
})

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {
  private storage = inject(StorageService);
  private router = inject(Router);
  private config: AppSessionConfig = inject(WALL_SESSION_CONFIG);

  accessToken?: Token;
  refreshToken?: Token;

  constructor() {
    this.load();
  }

  isAuthenticated(): boolean {
    return !!(
      this.accessToken?.isValid &&
      this.refreshToken &&
      this.refreshToken?.isValid &&
      !this.refreshToken?.isExpired);
  }

  private load() {
    this.accessToken = new Token(this.storage.get('accessToken'));
    this.refreshToken = new Token(this.storage.get('refreshToken'));
  }

  create(accessToken: string, refreshToken: string) {
    this.accessToken = new Token(accessToken);
    this.refreshToken = new Token(refreshToken);

    this.storage.set('accessToken', this.accessToken.jwt2);
    this.storage.set('refreshToken', this.refreshToken.jwt2);

    this.router.navigateByUrl(this.config.redirectLoginPath);
  }

  update(accessToken: string, refreshToken: string) {
    this.accessToken = new Token(accessToken);
    this.refreshToken = new Token(refreshToken);

    this.storage.set('accessToken', this.accessToken.jwt2);
    this.storage.set('refreshToken', this.refreshToken.jwt2);
  }

  destroy() {
    this.accessToken = undefined;
    this.refreshToken = undefined;

    this.storage.set('accessToken', this.accessToken);
    this.storage.set('refreshToken', this.refreshToken);

    this.router.navigateByUrl(this.config.redirectLogoutPath);
  }
}
