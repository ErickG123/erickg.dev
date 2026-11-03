import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { Project } from '../../../core/models/project.model';
import { MangaImageComponent } from '../manga-image/manga-image.component';
import { LanguageService } from '../../../core/language.service';

@Component({
  selector: 'app-manga-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MangaImageComponent],
  templateUrl: './manga-project-card.component.html',
  styleUrls: ['./manga-project-card.component.scss']
})
export class MangaProjectCardComponent {
  project = input.required<Project>();
  currentLang = inject(LanguageService).currentLang;
  previewIsOpen = signal(false);
  selectedPreviewStep = signal(0);
  posterActive = signal(false);

  togglePreview(): void {
    this.previewIsOpen.update((isOpen) => !isOpen);
  }

  togglePoster(): void {
    this.posterActive.update((active) => !active);
  }
}
