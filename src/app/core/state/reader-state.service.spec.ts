import { TestBed } from '@angular/core/testing';
import { ReaderStateService } from './reader-state.service';
import { PLATFORM_ID } from '@angular/core';

describe('ReaderStateService', () => {
  let service: ReaderStateService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        ReaderStateService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(ReaderStateService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('deve inicializar com a capa fechada por padrão quando não há sessão anterior', () => {
    expect(service.isCoverOpened()).toBe(false);
  });

  it('deve abrir a capa e salvar o estado em sessionStorage ao chamar openCover()', () => {
    service.openCover();
    expect(service.isCoverOpened()).toBe(true);
    expect(sessionStorage.getItem('manga_cover_opened')).toBe('true');
  });

  it('deve alternar o modo de leitor imersivo', () => {
    expect(service.isMangaReaderMode()).toBe(false);
    service.toggleReaderMode();
    expect(service.isMangaReaderMode()).toBe(true);
  });

  it('deve atualizar o índice de página quando uma seção ativa for definida', () => {
    service.setActiveSection('projects');
    expect(service.activeSection()).toBe('projects');
    expect(service.currentReaderPageIndex()).toBe(2);
    expect(service.currentMapping().chapterNumber).toBe('CAP. 02');

    service.setActiveSection('contact');
    expect(service.activeSection()).toBe('contact');
    expect(service.currentReaderPageIndex()).toBe(7);
    expect(service.currentMapping().chapterNumber).toBe('EPÍLOGO');
  });

  it('deve atualizar a seção ativa reversamente quando a página do leitor mudar', () => {
    service.setReaderPageIndex(4);
    expect(service.currentReaderPageIndex()).toBe(4);
    expect(service.activeSection()).toBe('method');

    // Página 3 ainda pertence ao capítulo de projetos
    service.setReaderPageIndex(3);
    expect(service.activeSection()).toBe('projects');
  });

  it('deve sincronizar a página inicial ao transicionar de editorial para imersivo', () => {
    service.setActiveSection('notes');
    service.setReadingMode('immersive');

    expect(service.readingMode()).toBe('immersive');
    expect(service.isMangaReaderMode()).toBe(true);
    expect(service.currentReaderPageIndex()).toBe(5);
    expect(sessionStorage.getItem('manga_reading_mode')).toBe('immersive');
  });
});
