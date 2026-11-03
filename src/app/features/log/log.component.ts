import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CAREER_HISTORY } from '../../core/data/portfolio.data';
import { GameStateService } from '../../core/state/game-state.service';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [],
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {
  readonly careerHistory = CAREER_HISTORY;
  readonly currentLang = inject(GameStateService).currentLang;
}
