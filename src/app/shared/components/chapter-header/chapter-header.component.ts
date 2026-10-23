import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ChapterHeaderAlign } from '../../models/manga-components.interface';

export type { ChapterHeaderAlign };

@Component({
  selector: 'app-chapter-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chapter-header.component.html',
  styleUrls: ['./chapter-header.component.scss']
})
export class ChapterHeaderComponent {
  chapter = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>();
  meta = input<string>();
  accentBadge = input<boolean>(false);
  accentTitle = input<boolean>(false);
  showDivider = input<boolean>(true);
  align = input<ChapterHeaderAlign>('left');

  alignClass = computed(() => `align-${this.align()}`);

  topAlignClass = computed(() => {
    switch (this.align()) {
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-between';
    }
  });
}
