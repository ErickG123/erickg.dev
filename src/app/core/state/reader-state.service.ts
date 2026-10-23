import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { ReadingMode, ChapterSectionId, SectionPageMapping } from '../models/reader.interface';

export type { ReadingMode, ChapterSectionId, SectionPageMapping };

export const CHAPTER_PAGE_MAPPINGS: SectionPageMapping[] = [
  { sectionId: 'cover', pageIndex: 0, chapterNumber: 'ACT 00', title: 'Capa & Frontispício' },
  { sectionId: 'index-section', pageIndex: 1, chapterNumber: 'MOKUROKU', title: 'Sumário Editorial' },
  { sectionId: 'projects', pageIndex: 2, chapterNumber: 'CAP. 02', title: 'Obras Selecionadas' },
  { sectionId: 'method', pageIndex: 4, chapterNumber: 'CAP. 03', title: 'O Método: Think, Break, Rebuild' },
  { sectionId: 'notes', pageIndex: 5, chapterNumber: 'CAP. 04', title: 'Field Notes & Ensaios' },
  { sectionId: 'about', pageIndex: 6, chapterNumber: 'CAP. 05', title: 'Ficha do Engenheiro' },
  { sectionId: 'contact', pageIndex: 7, chapterNumber: 'EPÍLOGO', title: 'Mural de Transmissão' }
];

@Injectable({
  providedIn: 'root'
})
export class ReaderStateService {
  private platformId = inject(PLATFORM_ID);

  readonly isCoverOpened = signal<boolean>(false);
  readonly readingMode = signal<ReadingMode>('editorial');
  readonly activeSection = signal<ChapterSectionId>('cover');
  readonly currentReaderPageIndex = signal<number>(0);

  // Computeds reativos
  readonly isMangaReaderMode = computed(() => this.readingMode() === 'immersive');

  readonly currentMapping = computed(() => {
    return (
      CHAPTER_PAGE_MAPPINGS.find(m => m.sectionId === this.activeSection()) ||
      CHAPTER_PAGE_MAPPINGS[0]
    );
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const sessionCoverState = sessionStorage.getItem('manga_cover_opened');
      const sessionMode = sessionStorage.getItem('manga_reading_mode') as ReadingMode | null;
      const hasHash = window.location.hash.length > 1;

      // Se há âncora na URL ou a capa já foi aberta, marca capa como aberta
      if (sessionCoverState === 'true' || hasHash) {
        this.isCoverOpened.set(true);
      }

      // Restaura preferência de modo salva na sessão (sem forçar em mobile)
      const isMobile = window.innerWidth < 768;
      if (sessionMode && (!isMobile || sessionMode === 'editorial')) {
        this.readingMode.set(sessionMode);
      }
    }
  }

  openCover(): void {
    this.isCoverOpened.set(true);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('manga_cover_opened', 'true');
    }
  }

  /* --- SINCRONIZAÇÃO PREVISÍVEL ENTRE MODOS --- */

  setReadingMode(mode: ReadingMode): void {
    this.readingMode.set(mode);

    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('manga_reading_mode', mode);

      if (mode === 'immersive') {
        // Ao ir para o modo imersivo, alinha a página com a seção onde o usuário estava rolando
        const mapping = CHAPTER_PAGE_MAPPINGS.find(m => m.sectionId === this.activeSection());
        if (mapping) {
          this.currentReaderPageIndex.set(mapping.pageIndex);
        }
      } else {
        // Ao retornar para o modo editorial, rola suavemente para a âncora da seção correspondente
        setTimeout(() => {
          const targetSection = this.activeSection();
          const targetEl = document.getElementById(targetSection);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      }
    }
  }

  toggleReaderMode(): void {
    const nextMode: ReadingMode = this.isMangaReaderMode() ? 'editorial' : 'immersive';
    this.setReadingMode(nextMode);
  }

  /* --- ATUALIZAÇÃO DA SEÇÃO ATIVA (SCROLL SPY) --- */
  setActiveSection(sectionId: ChapterSectionId): void {
    if (this.activeSection() !== sectionId) {
      this.activeSection.set(sectionId);

      // Atualiza também o índice de página mapeado
      const mapping = CHAPTER_PAGE_MAPPINGS.find(m => m.sectionId === sectionId);
      if (mapping) {
        this.currentReaderPageIndex.set(mapping.pageIndex);
      }
    }
  }

  /* --- ATUALIZAÇÃO DA PÁGINA ATIVA NO LEITOR --- */
  setReaderPageIndex(pageIdx: number): void {
    this.currentReaderPageIndex.set(pageIdx);

    // Mapeia a página de volta para a seção correspondente mais próxima
    const reverseMapping = [...CHAPTER_PAGE_MAPPINGS]
      .reverse()
      .find(m => pageIdx >= m.pageIndex);

    if (reverseMapping && this.activeSection() !== reverseMapping.sectionId) {
      this.activeSection.set(reverseMapping.sectionId);
    }
  }
}
