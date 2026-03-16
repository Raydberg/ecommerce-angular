import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { map } from 'rxjs';

export const isAdminGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.checkStatus().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return router.createUrlTree(['/auth/login']);
      }

      return authService.isAdmin()
        ? true
        : router.createUrlTree(['/']);
    })
  );
};
