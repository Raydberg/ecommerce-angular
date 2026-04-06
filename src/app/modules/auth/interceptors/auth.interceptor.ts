import type { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';


export const authInterceptor: HttpInterceptorFn =
  (req: HttpRequest<unknown>, next: HttpHandlerFn):
    Observable<HttpEvent<unknown>> => {

    const csrfToken = inject(AuthService).csrfToken()

    if (!csrfToken) {
      return next(req)
    }

    const newReq = req.clone({
      headers: req.headers.append('x-csrf-token', `${csrfToken}`)
    })

    return next(newReq);
  };

