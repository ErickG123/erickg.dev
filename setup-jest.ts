import '@angular/compiler';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

declare const require: (path: string) => Translation;

const { TestBed } = require('@angular/core/testing');
const { provideTransloco } = require('@jsverse/transloco');
const { of } = require('rxjs');

interface Translation {
  [key: string]: string | Translation;
}

class PortfolioTestTranslocoLoader {
  getTranslation(lang: string) {
    const locale = lang === 'en' ? 'en' : 'pt';
    return of(require(`./src/assets/i18n/${locale}.json`));
  }
}

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      ...provideTransloco({
        config: {
          availableLangs: ['pt', 'en'],
          defaultLang: 'pt',
          fallbackLang: 'pt',
          reRenderOnLangChange: true,
          prodMode: true
        },
        loader: PortfolioTestTranslocoLoader
      })
    ]
  });
});
