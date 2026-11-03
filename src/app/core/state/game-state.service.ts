import { Injectable, signal } from '@angular/core';
import { Achievement } from '../models/achievement.interface';

@Injectable({ providedIn: 'root' })
export class GameStateService {

  readonly isAudioPlaying = signal<boolean>(false);
  readonly isCorporateMode = signal<boolean>(false);
  readonly currentLang = signal<string>('pt');
  readonly unlockedAchievements = signal<Achievement[]>([]);

  setAudioState(state: boolean) { this.isAudioPlaying.set(state); }
  toggleCorporateMode() { this.isCorporateMode.update(v => !v); }
  setLanguage(lang: string) {
    const normalized = lang === 'en' ? 'en' : 'pt';
    this.currentLang.set(normalized);
    try { globalThis.localStorage?.setItem('portfolio-language', normalized); } catch { /* Storage is optional. */ }
  }
  
  addAchievement(achievement: Achievement) {
    if (!this.unlockedAchievements().find(a => a.id === achievement.id)) {
      this.unlockedAchievements.update(arr => [...arr, achievement]);
    }
  }
}
