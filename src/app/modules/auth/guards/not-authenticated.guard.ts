import { inject } from '@angular/core';
import { Router, type CanActivateFn, type CanMatchFn, type Route, type UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom, map } from 'rxjs';

export const notAuthenticatedGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkStatus().pipe(
    map(isAuthenticated =>
      isAuthenticated
        ? router.createUrlTree(['/'])
        : true
    )
  );
};
