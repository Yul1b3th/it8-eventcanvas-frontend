import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';



import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {} from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';

import mapboxgl from 'mapbox-gl';

import { environment } from '../environments/environment';

mapboxgl.accessToken = environment.mapbox_key;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
};
