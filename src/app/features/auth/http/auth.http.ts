import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SignInDto } from '../dto/sign-in.dto';
import { AppSessionService } from '../services/session.service';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthHttp {
  private http = inject(HttpClient);
  private session = inject(AppSessionService);

  getToken(body: SignInDto) {
    return this.http.post('auth/sign-in', body).pipe(
      catchError(error => {
        return throwError(error);
      })
    );;
  }

  refreshToken() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.session.refreshToken?.jwt2}`,
    })

    return this.http.post('auth/refresh/token', {}, { headers });
  }
}
