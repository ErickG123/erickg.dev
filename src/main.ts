import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { inject } from '@vercel/analytics';

try {
  inject();
} catch (e) {
  console.warn('Analytics blocked.');
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
