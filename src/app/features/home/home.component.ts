import {
  Component,
  inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  effect,
  signal,
  HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChapterHeadingComponent } from '../../shared/components/chapter-heading/chapter-heading.component';
import { MangaProjectCardComponent } from '../../shared/components/manga-project-card/manga-project-card.component';
import { MangaHeroComponent } from './components/manga-hero/manga-hero.component';
import { BookCoverComponent } from './components/book-cover/book-cover.component';
import { MangaReaderComponent } from './components/manga-reader/manga-reader.component';
import { MangaImageComponent } from '../../shared/components/manga-image/manga-image.component';
import { ReaderStateService, ChapterSectionId } from '../../core/state/reader-state.service';
import {
  AUTHOR_DATA,
  CHAPTERS_INDEX,
  FEATURED_PROJECTS_DATA,
  METHOD_PILLARS,
  FIELD_NOTES_DATA,
  HERO_DATA
} from '../../core/data/portfolio.data';
import { FIELD_NOTES_DETAILS } from '../../core/data/field-notes.data';
import { FieldNoteDetail } from '../../core/models/field-note.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ChapterHeadingComponent,
    MangaProjectCardComponent,
    MangaHeroComponent,
    BookCoverComponent,
    MangaReaderComponent,
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
  readonly chapters = CHAPTERS_INDEX;
  readonly projects = FEATURED_PROJECTS_DATA;
  readonly methodPillars = METHOD_PILLARS;
  readonly fieldNotes = FIELD_NOTES_DATA;
  readonly fieldNotesDetails = FIELD_NOTES_DETAILS;

  activeFieldNote = signal<FieldNoteDetail | null>(null);

  currentYear = new Date().getFullYear();

  private observer: IntersectionObserver | null = null;

  constructor() {
    // Quando o modo de leitura retornar para editorial, reativa o scrollspy nos elementos renderizados
    effect(() => {
      const isImmersive = this.readerState.isMangaReaderMode();
      if (!isImmersive && isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.initScrollSpy();
        }, 100);
      }
    });
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

  private previousActiveElement: HTMLElement | null = null;

  openFieldNote(noteId: string): void {
    const note = this.fieldNotesDetails.find(n => n.id === noteId);
    if (note) {
      if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
        this.previousActiveElement = document.activeElement as HTMLElement;
      }
      this.activeFieldNote.set(note);
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const closeBtn = document.querySelector('.field-note-modal button') as HTMLElement;
          closeBtn?.focus();
        }, 50);
      }
    }
  }

  closeFieldNote(): void {
    this.activeFieldNote.set(null);
    if (isPlatformBrowser(this.platformId) && this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.activeFieldNote()) {
      event.preventDefault();
      this.closeFieldNote();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
