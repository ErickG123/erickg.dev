import { Injectable, signal, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly isDarkMode = signal<boolean>(true);

  constructor(@Inject(DOCUMENT) private document: Document) {
    try {
      const savedTheme = this.document.defaultView?.localStorage.getItem('portfolio-theme');
      this.isDarkMode.set(savedTheme == null || savedTheme === 'dark');
    } catch { /* Storage may be unavailable in private browsing. */ }
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
    try {
      this.document.defaultView?.localStorage.setItem('portfolio-theme', this.isDarkMode() ? 'dark' : 'light');
    } catch { /* Keep the current session theme if storage is unavailable. */ }
    this.applyTheme();
  }

  private applyTheme(): void {
    const theme = this.isDarkMode() ? 'dark' : 'light';
    this.document.documentElement.dataset['theme'] = theme;
    this.document.documentElement.style.colorScheme = theme;
  }
}
