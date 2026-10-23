import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { track } from '@vercel/analytics';
import type { Achievement } from './models/achievement.interface';
export type { Achievement };

@Injectable({
  providedIn: 'root'
})
export class SaveStateService {
  public latestAchievement = signal<Achievement | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  unlockAchievement(id: string, title: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const unlockedList = JSON.parse(localStorage.getItem('gba_achievements') || '[]');
    
    if (!unlockedList.includes(id)) {
      unlockedList.push(id);
      localStorage.setItem('gba_achievements', JSON.stringify(unlockedList));

      this.latestAchievement.set({ id, title });

      try {
        track('Achievement Unlocked', { achievement: title });
      } catch (e) {}

      console.log(`%c🏆 ACHIEVEMENT UNLOCKED: ${title}`, 'color: #eab308; font-weight: bold; background: #000; padding: 4px;');

      try {
        const beep = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'); 
        beep.volume = 0.1;
        beep.play().catch(() => {});
      } catch (e) {}

      setTimeout(() => {
        this.latestAchievement.set(null);
      }, 4000);
    }
  }

  savePreference(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(`gba_pref_${key}`, JSON.stringify(value));
    }
  }

  getPreference(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const item = localStorage.getItem(`gba_pref_${key}`);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }
}
