import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../core/audio.service';
import { TranslateService } from '@ngx-translate/core';
import { GameStateService } from '../../core/state/game-state.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  audioService = inject(AudioService);
  translate = inject(TranslateService);
  gameState = inject(GameStateService);
  themeService = inject(ThemeService);
  
  currentLang = this.gameState.currentLang;

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
}
