import {
  Component,
  inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChapterHeadingComponent } from '../../shared/components/chapter-heading/chapter-heading.component';
import { MangaProjectCardComponent } from '../../shared/components/manga-project-card/manga-project-card.component';
import { MangaHeroComponent } from './components/manga-hero/manga-hero.component';
import { MangaImageComponent } from '../../shared/components/manga-image/manga-image.component';
import { ReaderStateService, ChapterSectionId } from '../../core/state/reader-state.service';
import { AUTHOR_DATA, FEATURED_PROJECTS_DATA, HERO_DATA } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ChapterHeadingComponent,
    MangaProjectCardComponent,
    MangaHeroComponent,
    MangaImageComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  readerState = inject(ReaderStateService);

  readonly heroData = HERO_DATA;
  readonly author = AUTHOR_DATA;
  readonly projects = FEATURED_PROJECTS_DATA;
  readonly careerHistory = [
    { period: 'Jul 2026 – atual', title: 'Programador Pleno I', company: 'Zella Sistemas · YMS', summary: 'Atuação em desenvolvimento de software.', technologies: ['Angular', '.NET', 'TypeScript'] },
    { period: 'Nov 2025 – Jul 2026', title: 'Desenvolvedor', company: 'Zella Sistemas · YMS', summary: 'Desenvolvimento de sistemas e funcionalidades para produtos da empresa.', technologies: ['Desenvolvimento web', 'APIs'] },
    { period: 'Dez 2023 – Nov 2025', title: 'Desenvolvedor de Software', company: 'Compu Informática', summary: 'Desenvolvimento e manutenção de software.', technologies: ['Aplicações web', 'Integrações'] },
    { period: 'Abr 2021 – Mai 2023', title: 'Desenvolvedor de Software Júnior', company: 'SIALOG Software Solutions', summary: 'Início da trajetória profissional em desenvolvimento de software.', technologies: ['Desenvolvimento de software'] }
  ];
  readonly articleTopics = ['Todos', 'Angular', 'DevOps', 'Arquitetura'] as const;
  readonly selectedArticleTopic = signal<string>('Todos');
  readonly articles = [
    { title: 'I Built the Ultimate HTTP Interceptor for Angular: 6 Resilience Patterns and RxJS in Practice', url: 'https://dev.to/erickg123/i-built-the-ultimate-http-interceptor-for-angular-6-resilience-patterns-and-rxjs-in-practice-1d33', description: 'Padrões de resiliência HTTP com Angular e RxJS para aplicações complexas.', date: '17 ago 2026', minutes: 3, topic: 'Angular', tags: ['Angular', 'RxJS', 'Arquitetura'] },
    { title: 'Do Zero ao Deploy: Seu Primeiro Pipeline de CI/CD Full-Stack com GitHub Actions (Parte 1)', url: 'https://dev.to/erickg123/do-zero-ao-deploy-seu-primeiro-pipeline-de-cicd-full-stack-com-github-actions-parte-1-3eg6', description: 'Construção de um pipeline de integração e entrega para uma aplicação Angular + .NET.', date: '29 jul 2026', minutes: 5, topic: 'DevOps', tags: ['GitHub Actions', 'Angular', '.NET'] },
    { title: 'Além da Teoria: Implementando WCAG no Angular Moderno (v21+)', url: 'https://dev.to/erickg123/alem-da-teoria-implementando-wcag-no-angular-moderno-v21-4d0', description: 'Acessibilidade aplicada a componentes, navegação e interfaces Angular.', date: '21 jul 2026', minutes: 4, topic: 'Angular', tags: ['WCAG', 'Angular', 'Acessibilidade'] },
    { title: 'Migrando um YMS de 5 anos: UX Corporativa, Dark Mode e Grids Dinâmicos (Parte 9)', url: 'https://dev.to/erickg123/migrando-um-yms-de-5-anos-do-angular-16-ao-21-parte-9-ux-corporativa-dark-mode-grids-2bj7', description: 'O encerramento da série sobre modernização de um sistema corporativo Angular.', date: '04 jun 2026', minutes: 3, topic: 'Angular', tags: ['Angular', 'UX', 'Dark mode'] },
    { title: 'Clean Architecture: A nova estrutura de pastas por domínios (Parte 7)', url: 'https://dev.to/erickg123/migrando-um-yms-de-5-anos-do-angular-16-ao-21-parte-7-clean-architecture-a-nova-estrutura-de-17dh', description: 'Organização de uma aplicação Angular por domínios durante uma migração gradual.', date: '04 jun 2026', minutes: 2, topic: 'Arquitetura', tags: ['Angular', 'Clean Architecture'] },
    { title: 'Turbinando o Pipeline: Caches, Matrix Builds e Branch Protection (Parte 4)', url: 'https://dev.to/erickg123/turbinando-o-pipeline-caches-matrix-builds-e-branch-protection-parte-4-21p3', description: 'Ajustes para acelerar pipelines e proteger branches em projetos colaborativos.', date: '03 ago 2026', minutes: 4, topic: 'DevOps', tags: ['GitHub Actions', 'CI/CD'] }
  ];
  readonly visibleArticles = computed(() => this.selectedArticleTopic() === 'Todos' ? this.articles : this.articles.filter(article => article.topic === this.selectedArticleTopic()));

  currentYear = new Date().getFullYear();

  private observer: IntersectionObserver | null = null;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initScrollSpy();
  }

  /* --- SCROLLSPY NO MODO EDITORIAL --- */
  initScrollSpy(): void {
    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      return;
    }

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    const sectionIds: ChapterSectionId[] = [
      'cover',
      'index-section',
      'projects',
      'method',
      'notes',
      'about',
      'contact'
    ];

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-15% 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6]
    };

    this.observer = new IntersectionObserver((entries) => {
      if (this.readerState.isMangaReaderMode()) return;

      const visibleEntries = entries.filter(e => e.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.forEach((entry) => entry.target.classList.add('is-in-view'));
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const target = visibleEntries[0].target as HTMLElement;
        if (target && target.id) {
          this.readerState.setActiveSection(target.id as ChapterSectionId);
        }
      }
    }, options);

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  onSectionNavigate(sectionId: ChapterSectionId): void {
    this.readerState.setActiveSection(sectionId);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
