import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { DividerVariant, DividerSpacing } from '../../models/manga-components.interface';

export type { DividerVariant, DividerSpacing };

@Component({
  selector: 'app-editorial-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editorial-divider.component.html',
  styleUrls: ['./editorial-divider.component.scss']
})
export class EditorialDividerComponent {
  variant = input<DividerVariant>('solid');
  spacing = input<DividerSpacing>('md');
  label = input<string>();
  withAccentSquare = input<boolean>(true);

  dividerClasses = computed(() => {
    return {
      [`variant-${this.variant()}`]: true,
      [`spacing-${this.spacing()}`]: true
    };
  });
}
