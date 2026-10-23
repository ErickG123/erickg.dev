import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true
})
export class ImageFallbackDirective {
  @Input() appImageFallback?: string;
  @Input() fallbackText: string = 'PAINEL EM PROCESSO DE ENTINTAMENTO';

  private hasFailed = false;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('error')
  onError(): void {
    if (this.hasFailed) return;
    this.hasFailed = true;

    const img = this.el.nativeElement;
    const width = img.getAttribute('width') || '600';
    const height = img.getAttribute('height') || '400';

    this.renderer.addClass(img, 'manga-image-fallback');

    if (this.appImageFallback) {
      img.src = this.appImageFallback;
    } else {
      // Gera SVG inline autoral estilizado como painel de mangá em rascunho
      const fallbackSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
          <defs>
            <pattern id="fb-screentone" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1.8" fill="#77736F" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="600" height="400" fill="#F4F0E9"/>
          <rect width="600" height="400" fill="url(#fb-screentone)"/>
          <rect x="12" y="12" width="576" height="376" fill="none" stroke="#111111" stroke-width="3" stroke-dasharray="6,4"/>
          <rect x="150" y="165" width="300" height="60" fill="#111111"/>
          <text x="300" y="202" font-family="monospace" font-size="12" font-weight="bold" fill="#F4F0E9" text-anchor="middle" letter-spacing="1">
            [ ${this.fallbackText.toUpperCase()} ]
          </text>
        </svg>
      `.trim();

      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fallbackSvg)}`;
    }
  }
}
