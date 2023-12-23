import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    url: `${environment.baseurl}/${req.url}`
  })
  return next(newReq);
};
