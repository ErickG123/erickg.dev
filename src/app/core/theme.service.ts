import { Injectable, signal, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly isDarkMode = signal<boolean>(true); // Iniciando em dark mode, como no seu portfólio atual

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
    this.applyTheme();
  }

  private applyTheme(): void {
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    
    if (themeLink) {
      themeLink.href = this.isDarkMode() ? 'aura-dark-indigo.css' : 'aura-light-indigo.css';
    }
    
    if (this.isDarkMode()) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }
}
