import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderStateService } from '../../../../core/state/reader-state.service';
import { AUTHOR_DATA } from '../../../../core/data/portfolio.data';

@Component({
  selector: 'app-book-cover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-cover.component.html',
  styleUrls: ['./book-cover.component.scss']
})
export class BookCoverComponent {
  readerState = inject(ReaderStateService);
  author = AUTHOR_DATA;

  isOpening = signal(false);

  openPortfolio(targetAnchor: string = '#cover'): void {
    if (this.isOpening()) return;

    this.isOpening.set(true);

    // Transição curta inspirada em virar a capa (350ms)
    setTimeout(() => {
      this.readerState.openCover();
      this.isOpening.set(false);

      // Rolagem suave para o ponto inicial da leitura
      const el = document.querySelector(targetAnchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openPortfolio();
    }
  }
}
