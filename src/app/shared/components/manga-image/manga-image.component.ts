import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manga-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manga-image.component.html',
  styleUrls: ['./manga-image.component.scss']
})
export class MangaImageComponent {
  src = input.required<string>();
  alt = input<string>('');
  caption = input<string>();
  aspectRatio = input<'16:9' | '1:1' | '2:3' | '4:3'>('16:9');
  priority = input<boolean>(false);

  isLoading = signal(true);
  hasError = signal(false);

  onLoad() {
    this.isLoading.set(false);
  }

  onError() {
    this.isLoading.set(false);
    this.hasError.set(true);
  }
}
