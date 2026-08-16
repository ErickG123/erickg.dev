import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { AudioService } from '../../core/audio.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { GameStateService } from '../../core/state/game-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslatePipe, UpperCasePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  audioService = inject(AudioService);
  translate = inject(TranslateService);
  gameState = inject(GameStateService);
  
  currentLang = this.gameState.currentLang;

  constructor() {

    this.translate.setFallbackLang('en');
    this.translate.use('en');
    this.gameState.setLanguage('en');
  }

  toggleLanguage() {
    const nextLang = this.currentLang() === 'en' ? 'pt' : 'en';
    this.translate.use(nextLang);
    this.gameState.setLanguage(nextLang);
  }
}
