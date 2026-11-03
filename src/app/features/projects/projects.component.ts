import { Component, inject } from '@angular/core';
import { GameStateService } from '../../core/state/game-state.service';
import { FEATURED_PROJECTS_DATA } from '../../core/data/portfolio.data';
import { MangaProjectCardComponent } from '../../shared/components/manga-project-card/manga-project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MangaProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  readonly projects = FEATURED_PROJECTS_DATA;
  readonly currentLang = inject(GameStateService).currentLang;
}
