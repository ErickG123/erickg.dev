import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GameStateService } from '../../core/state/game-state.service';
import { ThemeService } from '../../core/theme.service';
import { AmbientAudioService } from '../../core/ambient-audio.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  translate = inject(TranslateService);
  gameState = inject(GameStateService);
  themeService = inject(ThemeService);
  ambientAudio = inject(AmbientAudioService);
  private elementRef = inject(ElementRef<HTMLElement>);
  
  currentLang = this.gameState.currentLang;
  personalNoteOpen = signal(false);

  constructor() {
    let language = 'pt';
    try { language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt'; } catch { /* Use Portuguese by default. */ }
    this.gameState.setLanguage(language);
    this.translate.setFallbackLang('pt');
    this.translate.use(language);
  }

  toggleLanguage() {
    const nextLang = this.currentLang() === 'en' ? 'pt' : 'en';
    this.translate.use(nextLang);
    this.gameState.setLanguage(nextLang);
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
