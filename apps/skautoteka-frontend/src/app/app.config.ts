import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import myLocalePl from '@angular/common/locales/pl';
registerLocaleData(myLocalePl);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)],
};
