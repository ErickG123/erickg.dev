import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroContent, HERO_DATA } from '../../../../core/data/portfolio.data';
import { MangaImageComponent } from '../../../../shared/components/manga-image/manga-image.component';
import { GameStateService } from '../../../../core/state/game-state.service';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-manga-hero',
  standalone: true,
  imports: [CommonModule, MangaImageComponent, RouterLink, TranslocoPipe],
  templateUrl: './manga-hero.component.html',
  styleUrls: ['./manga-hero.component.scss']
})
export class MangaHeroComponent {
  hero = input<HeroContent>(HERO_DATA);
  readonly currentLang = inject(GameStateService).currentLang;
}
