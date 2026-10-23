import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import type {
  AspectRatioType,
  FrameBorderStyle,
  FrameScreentone,
  FrameBadgeVariant
} from '../../models/manga-components.interface';

export type { AspectRatioType, FrameBorderStyle, FrameScreentone, FrameBadgeVariant };

@Component({
  selector: 'app-artwork-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artwork-frame.component.html',
  styleUrls: ['./artwork-frame.component.scss']
})
export class ArtworkFrameComponent {
  aspectRatio = input<AspectRatioType>('16:9');
  borderStyle = input<FrameBorderStyle>('solid');
  cropMarks = input<boolean>(true);
  screentoneBackground = input<FrameScreentone>('none');
  frameLabel = input<string>();
  statusBadge = input<string>();
  statusBadgeVariant = input<FrameBadgeVariant>('default');

  frameClasses = computed(() => {
    return {
      [`border-${this.borderStyle()}`]: true,
      'manga-crop-marks': this.cropMarks()
    };
  });

  contentClasses = computed(() => {
    return {
      [`tone-${this.screentoneBackground()}`]: this.screentoneBackground() !== 'none'
    };
  });
}
