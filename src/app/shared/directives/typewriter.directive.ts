import { Directive, ElementRef, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTypewriter]',
  standalone: true
})
export class TypewriterDirective implements OnInit, OnDestroy {
  @Input('appTypewriter') text: string = '';
  @Input() speed: number = 30;

  private timeoutIds: any[] = [];
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {

    this.el.nativeElement.innerHTML = '';

    this.renderer.addClass(this.el.nativeElement, 'typing-cursor');

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.type();
        this.observer?.disconnect();
      }
    }, { threshold: 0.1 });
    
    this.observer.observe(this.el.nativeElement);
  }

  type() {
    for (let i = 0; i < this.text.length; i++) {
      const timeoutId = setTimeout(() => {
        this.el.nativeElement.innerHTML += this.text.charAt(i);

        if (i === this.text.length - 1) {
          this.renderer.removeClass(this.el.nativeElement, 'typing-cursor');
        }
      }, i * this.speed);
      
      this.timeoutIds.push(timeoutId);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.timeoutIds.forEach(id => clearTimeout(id));
  }
}
