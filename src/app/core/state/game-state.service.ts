import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Achievement } from '../models/achievement.model';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private readonly document = inject(DOCUMENT);

  readonly isAudioPlaying = signal<boolean>(false);
  readonly isCorporateMode = signal<boolean>(false);
  readonly currentLang = signal<string>('pt');
  readonly unlockedAchievements = signal<Achievement[]>([]);

  setAudioState(state: boolean) { this.isAudioPlaying.set(state); }
  toggleCorporateMode() { this.isCorporateMode.update(v => !v); }
  setLanguage(lang: string) {
    const normalized = lang === 'en' ? 'en' : 'pt';
    this.currentLang.set(normalized);
    this.document.documentElement.lang = normalized === 'pt' ? 'pt-BR' : 'en';
    try { globalThis.localStorage?.setItem('portfolio-language', normalized); } catch { /* Storage is optional. */ }
  }
  
  addAchievement(achievement: Achievement) {
    if (!this.unlockedAchievements().find(a => a.id === achievement.id)) {
      this.unlockedAchievements.update(arr => [...arr, achievement]);
    }
  }
}
