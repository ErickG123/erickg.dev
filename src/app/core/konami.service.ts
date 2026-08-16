import { Injectable, signal, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SaveStateService } from './save-state.service';

@Injectable({
  providedIn: 'root'
})
export class KonamiService {
  private readonly KONAMI_CODE = [
    'arrowup', 'arrowup', 
    'arrowdown', 'arrowdown', 
    'arrowleft', 'arrowright', 
    'arrowleft', 'arrowright', 
    'b', 'a'
  ];
  private keyBuffer: string[] = [];
  
  public isUnlocked = signal(false);
  private saveState = inject(SaveStateService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
  }

  private handleKeyDown(e: KeyboardEvent) {

    if (this.isUnlocked()) return;

    this.keyBuffer.push(e.key.toLowerCase());

    if (this.keyBuffer.length > this.KONAMI_CODE.length) {
      this.keyBuffer.shift();
    }

    if (this.keyBuffer.join(',') === this.KONAMI_CODE.join(',')) {
      this.isUnlocked.set(true);
      this.keyBuffer = [];
      this.saveState.unlockAchievement('SYSTEM_HACKER', 'The Architect\'s Secret');
    }
  }

  closeTerminal() {
    this.isUnlocked.set(false);
  }
}
