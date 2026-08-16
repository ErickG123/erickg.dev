import { Injectable, inject } from '@angular/core';
import { SaveStateService } from './save-state.service';
import { GameStateService } from './state/game-state.service';
import { track } from '@vercel/analytics';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private bgm: HTMLAudioElement | null = null;
  private saveState = inject(SaveStateService);
  private gameState = inject(GameStateService);

  get isBgmPlaying() { return this.gameState.isAudioPlaying; }

  toggleBgm() {
    if (!this.bgm) {
      this.bgm = new Audio('assets/bgm.mp3');
      this.bgm.loop = true;
      this.bgm.volume = 0.2;
    }

    if (this.isBgmPlaying()) {
      this.bgm.pause();
      this.gameState.setAudioState(false);
      console.log('Retro Audio: BGM pausado.');
    } else {
      const playPromise = this.bgm.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.gameState.setAudioState(true);
          console.log('Retro Audio: BGM iniciado com sucesso.');
          this.saveState.unlockAchievement('MUSIC_MAESTRO', 'Symphony of the Night');
          try {
            track('Played BGM');
          } catch (e) {}
        }).catch(err => {
          this.gameState.setAudioState(false);
          console.error('Retro Audio: Falha ao iniciar BGM. Arquivo ausente ou bloqueado.', err);
        });
      }
    }
  }
}
