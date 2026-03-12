import type { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';


export const authInterceptor: HttpInterceptorFn =
  (req: HttpRequest<unknown>, next: HttpHandlerFn):
    Observable<HttpEvent<unknown>> => {

    const token = inject(AuthService).token()

    const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/register')

    if (!token || isAuthEndpoint) {
      return next(req)
    }

    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`)
    })

    return next(newReq);
  };

