import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { map } from 'rxjs';

export const notAuthenticatedGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // console.log(authService.user())
  return authService.checkStatus().pipe(
    map(isAuthenticated =>
      isAuthenticated
        ? router.createUrlTree(['/'])
        : true
    )
  );
};
