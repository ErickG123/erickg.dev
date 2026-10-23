import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { CaptionType } from '../../models/manga-components.interface';

export type { CaptionType };

@Component({
  selector: 'app-panel-caption',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-caption.component.html',
  styleUrls: ['./panel-caption.component.scss']
})
export class PanelCaptionComponent {
  type = input<CaptionType>('narration');
  stampText = input<string>();
  vermilionAccent = input<boolean>(false);

  captionClasses = computed(() => {
    return {
      [`type-${this.type()}`]: true,
      'accent-vermilion': this.vermilionAccent()
    };
  });
}
