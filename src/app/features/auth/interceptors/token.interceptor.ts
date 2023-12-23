import {
  HttpErrorResponse,
  type HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthHttp } from '../http/auth.http';
import { AppSessionService } from '../services/session.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(AppSessionService);
  const authHttp = inject(AuthHttp);

  const getRequest = () =>
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.accessToken?.jwt2}`,
      },
      // headers: req.headers.append('Authorization', session.access?.jwt || '')
    });

  return next(getRequest()).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {

        // TODO: refactorizar tipado
        return authHttp.refreshToken().pipe(
          tap((tokens: any) => session.update(tokens.accessToken, tokens.refreshToken)),
          catchError((err) => {
            session.destroy();
            return throwError(() => err)
          }),
          switchMap(() => next(getRequest()))
        );
      }

      return throwError(() => error);
    })
  );
};
