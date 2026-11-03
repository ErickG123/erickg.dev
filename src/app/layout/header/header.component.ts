import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { ThemeService } from '../../core/theme.service';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  transloco = inject(TranslocoService);
  languageService = inject(LanguageService);
  themeService = inject(ThemeService);
  private elementRef = inject(ElementRef<HTMLElement>);
  
  currentLang = this.languageService.currentLang;
  personalNoteOpen = signal(false);

  constructor() {
    let language = 'pt';
    try { language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt'; } catch { /* Use Portuguese by default. */ }
    this.transloco.setActiveLang(language);
    this.languageService.setLanguage(language);
  }

  toggleLanguage() {
    const nextLang = this.currentLang() === 'en' ? 'pt' : 'en';
    this.languageService.setLanguage(nextLang);
    this.transloco.setActiveLang(nextLang);
  }

  toggleTheme() { this.themeService.toggleTheme(); }

  togglePersonalNote() {
    this.personalNoteOpen.update((isOpen) => !isOpen);
  }

  @HostListener('document:keydown.escape')
  closePersonalNote() {
    this.personalNoteOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  closePersonalNoteOnOutsideClick(event: MouseEvent) {
    const target = event.target;
    if (target instanceof Node && !this.elementRef.nativeElement.contains(target)) {
      this.personalNoteOpen.set(false);
    }
  }
}
