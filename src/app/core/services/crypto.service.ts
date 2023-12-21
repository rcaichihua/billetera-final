import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  encrypt(value: string): string {
    return AES.encrypt(value, environment.cryptoKey).toString();
  }
  decrypt(value: string): string {
    try {
      return AES.decrypt(value, environment.cryptoKey).toString(enc.Utf8);
    } catch (error) {
      return '';
    }

  }

}
