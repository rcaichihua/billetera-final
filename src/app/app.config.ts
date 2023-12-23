import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { WALL_SESSION_CONFIG, provideSessionConfig } from './features/auth/services/session.service';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimations(),
  provideHttpClient(withInterceptors([baseUrlInterceptor])),
  provideSessionConfig({
    redirectLoginPath: '/admin',
    redirectLogoutPath: '/auth'
  }),
  {
    provide: HTTP_INTERCEPTORS,
    useFactory: baseUrlInterceptor,
    multi: true
  },

    /* {
      provide: WALL_SESSION_CONFIG,
      useValue: {
        redirectLoginPath: '/admin',
        redirectLogoutPath: '/auth'
      },
    } */
  ]
};
