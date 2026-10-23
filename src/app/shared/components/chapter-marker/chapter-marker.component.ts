import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { MarkerVariant, MarkerSize } from '../../models/manga-components.interface';

export type { MarkerVariant, MarkerSize };

@Component({
  selector: 'app-chapter-marker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chapter-marker.component.html',
  styleUrls: ['./chapter-marker.component.scss']
})
export class ChapterMarkerComponent {
  number = input.required<string>();
  label = input<string>();
  variant = input<MarkerVariant>('default');
  size = input<MarkerSize>('md');
  active = input<boolean>(false);

  markerClasses = computed(() => {
    return {
      [`variant-${this.variant()}`]: true,
      [`size-${this.size()}`]: true,
      'is-active': this.active()
    };
  });

  ariaLabel = computed(() => {
    return `Capítulo ${this.number()}${this.label() ? ': ' + this.label() : ''}`;
  });
}
