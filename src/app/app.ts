import { AfterViewInit, Component, HostBinding, HostListener, inject, OnInit, signal } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { HeaderComponent } from './layout/header/header.component';
import { AchievementToastComponent } from './shared/components/achievement-toast/achievement-toast.component';
import { SeoService } from './core/seo.service';
import { SwUpdate } from '@angular/service-worker';
import { GameStateService } from './core/state/game-state.service';
import { TranslocoPipe } from '@jsverse/transloco';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      })
    ], { optional: true }),
    query(':enter', [
      style({
        opacity: 0,
        clipPath: 'inset(0 0 3% 0)',
        transform: 'translateY(8px)'
      })
    ], { optional: true }),
    query(':leave', [
      animate('0.12s ease-out', style({ opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      animate('0.38s cubic-bezier(0.16, 1, 0.3, 1)', style({
        opacity: 1,
        clipPath: 'inset(0)',
        transform: 'translateY(0)'
      }))
    ], { optional: true })
  ])
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AchievementToastComponent, TranslocoPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  animations: [routeAnimations]
})
export class App implements OnInit, AfterViewInit {
  seo = inject(SeoService);
  private readonly router = inject(Router);
  swUpdate = inject(SwUpdate);
  currentLang = inject(GameStateService).currentLang;
  currentYear = new Date().getFullYear();
  readingProgress = signal(0);
  inkTransitionVisible = signal(false);
  private transitionTimer?: ReturnType<typeof setTimeout>;

  @HostBinding('@.disabled')
  get animationsDisabled(): boolean {
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
  }

  constructor() {
    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationStart) || !this.router.navigated || this.animationsDisabled) return;

      this.inkTransitionVisible.set(true);
      if (this.transitionTimer) clearTimeout(this.transitionTimer);
      this.transitionTimer = setTimeout(() => this.inkTransitionVisible.set(false), 940);
    });
  }

  ngOnInit() {
    this.seo.setSocialMediaTags(
      'ERICK GABRIEL // Software Engineer Portfolio',
      'Portfólio de Erick Gabriel, desenvolvedor full-stack. Projetos, trajetória profissional e engenharia de software com identidade visual inspirada em pôsteres japoneses minimalistas.',
      '/assets/images/social/og-image.svg',
      'https://erickg.dev'
    );

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(evt => {
        if (evt.type === 'VERSION_READY') {
          if (window.confirm('Um novo patch do sistema está disponível. Deseja reiniciar a máquina?')) {
            window.location.reload();
          }
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.updateReadingProgress();
  }

  @HostListener('window:scroll', ['$event'])
  updateReadingProgress(event?: Event): void {
    const main = document.getElementById('main-content');
    const page = document.scrollingElement;
    const target = event?.target instanceof HTMLElement
      ? event.target
      : [main, page].find(element => element && element.scrollTop > 0) ?? main ?? page;
    if (!target) return;
    const distance = target.scrollHeight - target.clientHeight;
    this.readingProgress.set(distance > 0 ? Math.round((target.scrollTop / distance) * 100) : 0);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.isActivated ? outlet.activatedRoute : '';
  }
}
