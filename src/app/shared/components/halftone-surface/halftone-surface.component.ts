import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { HalftonePattern, SurfacePadding } from '../../models/manga-components.interface';

export type { HalftonePattern, SurfacePadding };

@Component({
  selector: 'app-halftone-surface',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './halftone-surface.component.html',
  styleUrls: ['./halftone-surface.component.scss']
})
export class HalftoneSurfaceComponent {
  pattern = input<HalftonePattern>('dots-light');
  padding = input<SurfacePadding>('md');
  bordered = input<boolean>(false);
  disabled = input<boolean>(false);
  textSurface = input<boolean>(false);

  surfaceClasses = computed(() => {
    return {
      [`pattern-${this.pattern()}`]: true,
      [`pad-${this.padding()}`]: true,
      'is-bordered': this.bordered(),
      'is-disabled': this.disabled()
    };
  });
}
