import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CAREER_HISTORY } from '../../core/data/portfolio.data';
import { LanguageService } from '../../core/language.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {
  readonly careerHistory = CAREER_HISTORY;
  readonly currentLang = inject(LanguageService).currentLang;
}
