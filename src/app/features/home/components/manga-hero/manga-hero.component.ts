import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroContent, HERO_DATA } from '../../../../core/data/portfolio.data';
import { MangaImageComponent } from '../../../../shared/components/manga-image/manga-image.component';

@Component({
  selector: 'app-manga-hero',
  standalone: true,
  imports: [CommonModule, MangaImageComponent],
  templateUrl: './manga-hero.component.html',
  styleUrls: ['./manga-hero.component.scss']
})
export class MangaHeroComponent {
  hero = input<HeroContent>(HERO_DATA);
}
