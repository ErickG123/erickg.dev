import { Component, inject } from '@angular/core';
import { AUTHOR_DATA } from '../../core/data/portfolio.data';
import { GameStateService } from '../../core/state/game-state.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  readonly author = AUTHOR_DATA;
  readonly currentLang = inject(GameStateService).currentLang;
}
