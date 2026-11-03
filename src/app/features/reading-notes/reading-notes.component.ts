import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { SeoService } from '../../core/seo.service';
import { LanguageService } from '../../core/language.service';
import type { ReadingEntry } from './models/reading-entry.model';

@Component({
  selector: 'app-reading-notes',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './reading-notes.component.html',
})
export class ReadingNotesComponent {
  private readonly seo = inject(SeoService);
  readonly currentLang = inject(LanguageService).currentLang;

  readonly entries: ReadingEntry[] = [
    {
      id: 'craft', kanji: '技術', furigana: 'ぎじゅつ', romaji: 'gijutsu',
      translationPt: 'tecnologia · técnica', translationEn: 'technology · technique',
      labelKey: 'READING_STUDIO.WORD_TECH', noteKey: 'READING_STUDIO.TECH_NOTE'
    },
    {
      id: 'improvement', kanji: '改善', furigana: 'かいぜん', romaji: 'kaizen',
      translationPt: 'melhoria contínua', translationEn: 'continuous improvement',
      labelKey: 'READING_STUDIO.WORD_IMPROVEMENT', noteKey: 'READING_STUDIO.IMPROVEMENT_NOTE'
    },
    {
      id: 'curiosity', kanji: '好奇心', furigana: 'こうきしん', romaji: 'kōkishin',
      translationPt: 'curiosidade', translationEn: 'curiosity',
      labelKey: 'READING_STUDIO.WORD_CURIOSITY', noteKey: 'READING_STUDIO.CURIOSITY_NOTE'
    },
    {
      id: 'learning', kanji: '学び', furigana: 'まなび', romaji: 'manabi',
      translationPt: 'aprendizado', translationEn: 'learning',
      labelKey: 'READING_STUDIO.WORD_LEARNING', noteKey: 'READING_STUDIO.LEARNING_NOTE'
    }
  ];

  readonly activeEntry = signal<ReadingEntry | null>(null);
  readonly isPinned = signal(false);
  readonly lensPosition = signal({ x: 0, y: 0 });

  constructor() {
    effect(() => {
      const isPortuguese = this.currentLang() === 'pt';
      this.seo.setSocialMediaTags(
        isPortuguese ? 'Caderno de leitura | Erick Gabriel' : 'Reading notebook | Erick Gabriel',
        isPortuguese
          ? 'Uma experiência interativa com palavras japonesas, furigana, pronúncia e significado.'
          : 'An interactive experience with Japanese words, furigana, pronunciation, and meaning.',
        '/assets/images/social/og-image.svg',
        '/reading-notes'
      );
    });
  }

  onPointerEnter(entry: ReadingEntry, event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    if (!this.isPinned() || this.activeEntry()?.id !== entry.id) {
      this.isPinned.set(false);
      this.activate(entry, event.clientX, event.clientY);
    }
  }

  onPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'touch' && this.activeEntry()) {
      this.moveLens(event.clientX, event.clientY);
    }
  }

  onPointerLeave(entry: ReadingEntry): void {
    if (!this.isPinned() && this.activeEntry()?.id === entry.id) this.activeEntry.set(null);
  }

  onFocus(entry: ReadingEntry, event: FocusEvent): void {
    this.isPinned.set(false);
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.activate(entry, bounds.right, bounds.top + bounds.height / 2);
  }

  onBlur(entry: ReadingEntry): void {
    if (!this.isPinned() && this.activeEntry()?.id === entry.id) this.activeEntry.set(null);
  }

  togglePinned(entry: ReadingEntry, event: MouseEvent): void {
    if (this.isPinned() && this.activeEntry()?.id === entry.id) {
      this.isPinned.set(false);
      this.activeEntry.set(null);
      return;
    }

    this.isPinned.set(true);
    this.activate(entry, event.clientX, event.clientY);
    if (event.clientX === 0 && event.clientY === 0) {
      const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
      this.moveLens(bounds.right, bounds.top + bounds.height / 2);
    }
  }

  @HostListener('window:scroll')
  closeLensOnScroll(): void {
    this.isPinned.set(false);
    this.activeEntry.set(null);
  }

  @HostListener('document:keydown.escape')
  closeLensOnEscape(): void {
    this.isPinned.set(false);
    this.activeEntry.set(null);
  }

  private activate(entry: ReadingEntry, x: number, y: number): void {
    this.activeEntry.set(entry);
    this.moveLens(x, y);
  }

  private moveLens(x: number, y: number): void {
    if (typeof window === 'undefined') return;
    const size = Math.min(window.innerWidth <= 430 ? 288 : 352, window.innerWidth - 24, window.innerHeight - 24);
    const left = Math.min(Math.max(12, x + 24), Math.max(12, window.innerWidth - size - 12));
    const top = Math.min(Math.max(12, y + 24), Math.max(12, window.innerHeight - size - 12));
    this.lensPosition.set({ x: left, y: top });
  }
}
