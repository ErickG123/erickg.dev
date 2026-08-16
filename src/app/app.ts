import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { HeaderComponent } from './layout/header/header.component';
import { KonamiService } from './core/konami.service';
import { AchievementToastComponent } from './shared/components/achievement-toast/achievement-toast.component';
import { SeoService } from './core/seo.service';
import { SwUpdate } from '@angular/service-worker';

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
      style({ opacity: 0 })
    ], { optional: true }),
    query(':leave', [
      animate('0.15s steps(2)', style({ opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      animate('0.15s steps(2)', style({ opacity: 1 }))
    ], { optional: true })
  ])
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AchievementToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  animations: [routeAnimations]
})
export class App implements OnInit {
  konamiService = inject(KonamiService);
  seo = inject(SeoService);
  swUpdate = inject(SwUpdate);
  currentYear = new Date().getFullYear();
  isBooting = signal(true);

  ngOnInit() {

    setTimeout(() => {
      this.isBooting.set(false);
    }, 3500);

    this.seo.setSocialMediaTags(
      'ERICK.DEV',
      'Portfólio interativo de engenharia de software no formato de jogo retrô 16-bits. Construído com Angular.',
      '/assets/og-image.jpg',
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.isActivated ? outlet.activatedRoute : '';
  }
}
