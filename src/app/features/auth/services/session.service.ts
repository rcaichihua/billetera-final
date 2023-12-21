import { Injectable, inject } from '@angular/core';
import { Token } from '../models/token.model';
import { StorageService } from '../../../core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private storage = inject(StorageService);

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
  }

  destroy() {
    this.accessToken = undefined;
    this.refreshToken = undefined;

    this.storage.set('accessToken', this.accessToken);
    this.storage.set('refreshToken', this.refreshToken);
  }
}
