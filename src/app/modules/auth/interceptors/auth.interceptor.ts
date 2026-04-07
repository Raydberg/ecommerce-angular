import type { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn =
  (req: HttpRequest<unknown>, next: HttpHandlerFn):
    Observable<HttpEvent<unknown>> => {

    const authService = inject(AuthService)
    const csrf = authService.csrfToken()
    const request = req.clone({
      withCredentials: true,
      headers: csrf ? req.headers.set("x-csrf-token", csrf) : req.headers
    })
    return next(request).pipe(
      catchError((error) => {
        const isCheckStatus = request.url.includes("/auth/check-status")
        if (error.status === 401 && !isCheckStatus) {
          return authService.checkStatus().pipe(
            switchMap(() => {

              const newCsrf = authService.csrfToken()
              const retryReq = request.clone({
                withCredentials: true,
                headers: newCsrf ? request.headers.set("x-csrf-token", newCsrf) : request.headers
              })
              return next(retryReq)
            }),
            catchError(() => {
              authService.logout()
              return throwError(() => error)
            })
          )
        }
        return throwError(() => error)
      })
    )
  };

