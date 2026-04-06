import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { filter, map, take } from 'rxjs';

export const isAdminGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return toObservable(authService.authStatus).pipe(
    filter(status => status !== 'checking'),
    // tap(status => console.log('Estado en el guard', status)),
    // tap(() => console.log('¿Es admin segun el signal?', authService.isAdmin())),
    take(1),
    map(status => {
      if (status === 'authenticated' && authService.isAdmin()) {
        return true; //es admin
      }
      if (status === 'no-authenticated') {
        return router.createUrlTree(['/auth/login'])
      }
      return router.createUrlTree(['/']) //logeado pero no admin 
    })
  );
};
