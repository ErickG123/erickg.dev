import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { PanelVariant, PanelPadding, PanelTag } from '../../models/manga-components.interface';

export type { PanelVariant, PanelPadding, PanelTag };

@Component({
  selector: 'app-manga-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manga-panel.component.html',
  styleUrls: ['./manga-panel.component.scss']
})
export class MangaPanelComponent {
  variant = input<PanelVariant>('default');
  padding = input<PanelPadding>('md');
  interactive = input<boolean>(false);
  cropMarks = input<boolean>(false);
  decorative = input<boolean>(true);
  role = input<string | null>(null);

  panelClasses = computed(() => {
    return {
      [`variant-${this.variant()}`]: true,
      [`pad-${this.padding()}`]: true,
      'is-interactive': this.interactive(),
      'manga-crop-marks': this.cropMarks(),
      'non-decorative': !this.decorative()
    };
  });
}
