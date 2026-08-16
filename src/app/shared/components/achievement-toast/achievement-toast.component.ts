import { Component, inject } from '@angular/core';
import { SaveStateService } from '../../../core/save-state.service';

@Component({
  selector: 'app-achievement-toast',
  standalone: true,
  template: `
    @if (saveState.latestAchievement(); as achievement) {
      <div class="toast-container">
        <div class="toast-title">🏆 ACHIEVEMENT UNLOCKED</div>
        <div class="toast-achievement">{{ achievement.title }}</div>
      </div>
    }
  `,
  styles: [`
    :host {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999999;
      pointer-events: none;
      display: block;
    }

    .toast-container {
      background-color: var(--gba-bg);
      border: 2px solid var(--gba-red);
      box-shadow: 0 0 15px rgba(230, 0, 18, 0.4), inset 2px 2px 0px rgba(255, 255, 255, 0.1);
      padding: 1rem 1.5rem;
      width: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      animation: slideInRight 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
    }

    .toast-title {
      color: var(--gba-red);
      font-family: var(--font-pixel);
      font-size: 0.7rem;
      margin-bottom: 0.5rem;
    }

    .toast-achievement {
      color: var(--gba-text);
      font-family: var(--font-pixel);
      font-size: 0.9rem;
      text-shadow: 1px 1px 0px var(--gba-border-dark);
    }

    @keyframes slideInRight {
      0% { transform: translateX(120%); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class AchievementToastComponent {
  saveState = inject(SaveStateService);
}
