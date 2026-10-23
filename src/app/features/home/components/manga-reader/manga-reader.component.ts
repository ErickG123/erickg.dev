import {
  Component,
  inject,
  signal,
  computed,
  HostListener,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReaderStateService } from '../../../../core/state/reader-state.service';
import {
  AUTHOR_DATA,
  CHAPTERS_INDEX,
  FEATURED_PROJECTS_DATA,
  METHOD_PILLARS,
  FIELD_NOTES_DATA
} from '../../../../core/data/portfolio.data';
import { ChapterHeadingComponent } from '../../../../shared/components/chapter-heading/chapter-heading.component';
import { MangaProjectCardComponent } from '../../../../shared/components/manga-project-card/manga-project-card.component';
import type { ReaderPage } from '../../../../core/models/reader.interface';

export type { ReaderPage };

@Component({
  selector: 'app-manga-reader',
  standalone: true,
  imports: [
    CommonModule,
    ChapterHeadingComponent,
    MangaProjectCardComponent
  ],
  templateUrl: './manga-reader.component.html',
  styleUrls: ['./manga-reader.component.scss']
})
export class MangaReaderComponent implements OnInit {
  readerState = inject(ReaderStateService);
  private platformId = inject(PLATFORM_ID);

  readonly author = AUTHOR_DATA;
  readonly chapters = CHAPTERS_INDEX;
  readonly projects = FEATURED_PROJECTS_DATA;
  readonly methodPillars = METHOD_PILLARS;
  readonly fieldNotes = FIELD_NOTES_DATA;

  readonly pages: ReaderPage[] = [
    { index: 0, chapterNumber: 'ACT 00', title: 'Capa & Frontispício', type: 'cover' },
    { index: 1, chapterNumber: 'MOKUROKU', title: 'Sumário Editorial', type: 'index' },
    { index: 2, chapterNumber: 'CAP. 02', title: 'Obras: Architect & Sleuth', type: 'projects-1' },
    { index: 3, chapterNumber: 'CAP. 02', title: 'Obras: Guardian & Courier', type: 'projects-2' },
    { index: 4, chapterNumber: 'CAP. 03', title: 'O Método: Think, Break, Rebuild', type: 'method' },
    { index: 5, chapterNumber: 'CAP. 04', title: 'Field Notes & Ensaios', type: 'notes' },
    { index: 6, chapterNumber: 'CAP. 05', title: 'Ficha do Engenheiro', type: 'about' },
    { index: 7, chapterNumber: 'EPÍLOGO', title: 'Mural de Transmissão', type: 'contact' }
  ];

  currentPageIndex = signal<number>(0);
  isTurning = signal<boolean>(false);
  turnDirection = signal<'forward' | 'backward'>('forward');

  totalPages = computed(() => this.pages.length);
  currentPage = computed(() => this.pages[this.currentPageIndex()]);
  canGoPrevious = computed(() => this.currentPageIndex() > 0);
  canGoNext = computed(() => this.currentPageIndex() < this.pages.length - 1);

  private touchStartX = 0;
  private touchStartY = 0;

  ngOnInit(): void {
    // Sincroniza a página inicial com o estado centralizado de navegação
    const initialIndex = this.readerState.currentReaderPageIndex();
    if (initialIndex >= 0 && initialIndex < this.pages.length) {
      this.currentPageIndex.set(initialIndex);
    }
  }

  nextPage(): void {
    if (!this.canGoNext() || this.isTurning()) return;

    this.turnDirection.set('forward');
    this.isTurning.set(true);

    setTimeout(() => {
      const nextIdx = this.currentPageIndex() + 1;
      this.currentPageIndex.set(nextIdx);
      this.readerState.setReaderPageIndex(nextIdx);
      this.isTurning.set(false);
    }, 250);
  }

  previousPage(): void {
    if (!this.canGoPrevious() || this.isTurning()) return;

    this.turnDirection.set('backward');
    this.isTurning.set(true);

    setTimeout(() => {
      const prevIdx = this.currentPageIndex() - 1;
      this.currentPageIndex.set(prevIdx);
      this.readerState.setReaderPageIndex(prevIdx);
      this.isTurning.set(false);
    }, 250);
  }

  goToPage(index: number): void {
    if (index >= 0 && index < this.pages.length && index !== this.currentPageIndex()) {
      this.turnDirection.set(index > this.currentPageIndex() ? 'forward' : 'backward');
      this.isTurning.set(true);
      setTimeout(() => {
        this.currentPageIndex.set(index);
        this.readerState.setReaderPageIndex(index);
        this.isTurning.set(false);
      }, 250);
    }
  }

  /* --- NAVEGAÇÃO SEGURA POR TECLADO --- */
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.readerState.isMangaReaderMode()) return;

    // Não intercepta se o foco estiver em elementos de digitação
    if (isPlatformBrowser(this.platformId)) {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextPage();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousPage();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.readerState.setReadingMode('editorial');
    }
  }

  /* --- NAVEGAÇÃO TOUCH / GESTOS DE SWIPE --- */
  @HostListener('touchstart', ['$event'])
  handleTouchStart(event: TouchEvent): void {
    if (!this.readerState.isMangaReaderMode()) return;
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  handleTouchEnd(event: TouchEvent): void {
    if (!this.readerState.isMangaReaderMode()) return;
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    const deltaY = event.changedTouches[0].clientY - this.touchStartY;

    // Detecta swipe horizontal com tolerância (mínimo de 50px e mais horizontal que vertical)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        this.nextPage();
      } else {
        this.previousPage();
      }
    }
  }
}
