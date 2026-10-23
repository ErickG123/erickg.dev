import {
  Component,
  input,
  signal,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ElementRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import type { MotionDirection } from '../../models/manga-components.interface';

export type { MotionDirection };

@Component({
  selector: 'app-motion-reveal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motion-reveal.component.html',
  styleUrls: ['./motion-reveal.component.scss']
})
export class MotionRevealComponent implements OnInit, OnDestroy {
  direction = input<MotionDirection>('up');
  delayMs = input<number>(0);
  disabled = input<boolean>(false);

  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);
  private observer: IntersectionObserver | null = null;
  isRevealed = signal<boolean>(false);

  ngOnInit(): void {
    if (this.disabled()) {
      this.isRevealed.set(true);
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      if (
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        this.isRevealed.set(true);
        return;
      }

      if (typeof IntersectionObserver !== 'undefined') {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.isRevealed.set(true);
                this.observer?.disconnect();
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        this.observer.observe(this.elementRef.nativeElement);
      } else {
        requestAnimationFrame(() => {
          this.isRevealed.set(true);
        });
      }
    } else {
      this.isRevealed.set(true);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
