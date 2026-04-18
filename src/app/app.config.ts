import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@auth/interceptors/auth.interceptor';
import { errorInterceptor } from '@auth/interceptors/error.interceptor';
import { provideNgIconsConfig, withExceptionLogger } from '@ng-icons/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideNgIconsConfig({
      size: "16px"
    },
      withExceptionLogger()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor,
        errorInterceptor
      ])
    ),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
      },
    },
  ]
};
