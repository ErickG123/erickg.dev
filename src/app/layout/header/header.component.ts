import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameStateService } from '../../core/state/game-state.service';
import { ThemeService } from '../../core/theme.service';
import { AmbientAudioService } from '../../core/ambient-audio.service';
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
  gameState = inject(GameStateService);
  themeService = inject(ThemeService);
  ambientAudio = inject(AmbientAudioService);
  private elementRef = inject(ElementRef<HTMLElement>);
  
  currentLang = this.gameState.currentLang;
  personalNoteOpen = signal(false);

  constructor() {
    let language = 'pt';
    try { language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt'; } catch { /* Use Portuguese by default. */ }
    this.transloco.setActiveLang(language);
    this.gameState.setLanguage(language);
  }

  toggleLanguage() {
    const nextLang = this.currentLang() === 'en' ? 'pt' : 'en';
    this.gameState.setLanguage(nextLang);
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
