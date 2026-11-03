import { Component, ElementRef, input, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chapter-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chapter-heading.component.html',
  styleUrls: ['./chapter-heading.component.scss']
})
export class ChapterHeadingComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;
  readonly isRevealed = signal(false);

  chapter = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>();
  meta = input<string>();
  accentBadge = input<boolean>(false);
  accentTitle = input<boolean>(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.isRevealed.set(true);
      return;
    }

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
      this.isRevealed.set(true);
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        this.isRevealed.set(true);
        this.observer?.disconnect();
        this.observer = null;
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -32px 0px' });

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
