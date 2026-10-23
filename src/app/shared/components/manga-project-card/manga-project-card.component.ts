import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { Project } from '../../../core/models/project.interface';
import { MangaImageComponent } from '../manga-image/manga-image.component';

@Component({
  selector: 'app-manga-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MangaImageComponent],
  templateUrl: './manga-project-card.component.html',
  styleUrls: ['./manga-project-card.component.scss']
})
export class MangaProjectCardComponent {
  project = input.required<Project>();
}
