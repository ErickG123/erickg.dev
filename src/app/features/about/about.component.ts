import { Component } from '@angular/core';
import { AUTHOR_DATA } from '../../core/data/portfolio.data';
import { inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  readonly author = AUTHOR_DATA;
  readonly currentLang = inject(LanguageService).currentLang;
}
