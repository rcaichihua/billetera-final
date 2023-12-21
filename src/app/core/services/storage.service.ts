import { Injectable, inject } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private crypto = inject(CryptoService);

  get(key: string): string {
    const value = localStorage.getItem(key);
    if (value) return this.crypto.decrypt(value);
    return '';
  }

  set(key: string, value: string | undefined | null): void {
    if (value) localStorage.setItem(key, this.crypto.encrypt(value));
    else localStorage.removeItem(key);
  }
}
