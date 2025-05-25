import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  type InMemoryScrollingFeature,
  type InMemoryScrollingOptions,
} from '@angular/router';
import { IMAGE_CONFIG } from '@angular/common';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { rootReducer } from './store';
import { AuthenticationEffects } from './store/authentication/authentication.effects';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { FakeBackendProvider } from './helpers/fake-backend';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import {
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

// ✅ JWT Token Getter
export function tokenGetter() {
  return localStorage.getItem('token');
}

// ✅ Scroll config
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideAnimations(),
    provideToastr(),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    // ✅ NGRX store
    provideStore(rootReducer),
    provideEffects(AuthenticationEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

    // ✅ JWT configuration and service
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter,
        allowedDomains: ['localhost:4200'], // Update as needed
        disallowedRoutes: ['localhost:4200/api/auth/login'], // Update as needed
      },
    },
    JwtHelperService,

    // ✅ Interceptors
    FakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
};
