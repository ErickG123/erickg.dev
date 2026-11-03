import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { FEATURED_PROJECTS_DATA } from '../../core/data/portfolio.data';
import { MangaProjectCardComponent } from '../../shared/components/manga-project-card/manga-project-card.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MangaProjectCardComponent, TranslocoPipe],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  readonly projects = FEATURED_PROJECTS_DATA;
  readonly posterGlossary = FEATURED_PROJECTS_DATA.filter(project => !!project.poster);
  readonly currentLang = inject(LanguageService).currentLang;
}
