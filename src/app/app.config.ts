import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { WALL_SESSION_CONFIG, provideSessionConfig } from './features/auth/services/session.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideClientHydration(),
  provideAnimations(),
  provideHttpClient(),
  provideAnimations(),
  provideSessionConfig({
    redirectLoginPath: '/admin',
    redirectLogoutPath: '/auth'
  }),
    /* {
      provide: WALL_SESSION_CONFIG,
      useValue: {
        redirectLoginPath: '/admin',
        redirectLogoutPath: '/auth'
      },
    } */
  ]
};
