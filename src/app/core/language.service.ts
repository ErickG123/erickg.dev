import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  readonly currentLang = signal<string>('pt');

  setLanguage(lang: string) {
    const normalized = lang === 'en' ? 'en' : 'pt';
    this.currentLang.set(normalized);
    this.document.documentElement.lang = normalized === 'pt' ? 'pt-BR' : 'en';
    try { globalThis.localStorage?.setItem('portfolio-language', normalized); } catch { /* Storage is optional. */ }
  }
}
