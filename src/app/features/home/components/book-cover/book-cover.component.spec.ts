import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BookCoverComponent } from './book-cover.component';
import { ReaderStateService } from '../../../../core/state/reader-state.service';
import { By } from '@angular/platform-browser';

describe('BookCoverComponent', () => {
  let component: BookCoverComponent;
  let fixture: ComponentFixture<BookCoverComponent>;
  let readerState: ReaderStateService;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [BookCoverComponent],
      providers: [ReaderStateService]
    }).compileComponents();

    fixture = TestBed.createComponent(BookCoverComponent);
    component = fixture.componentInstance;
    readerState = TestBed.inject(ReaderStateService);
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('deve criar a capa editorial interativa de abertura', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar os metadados do volume e o botão primário de abertura', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('VOL. 01');
    expect(el.textContent).toContain('ERICK GABRIEL');
    const openBtn = el.querySelector('.btn-open-portfolio');
    expect(openBtn).toBeTruthy();
    expect(openBtn?.textContent).toContain('ABRIR PORTFÓLIO');
  });

  it('ao clicar em Abrir Portfólio, deve executar a transição e notificar o ReaderStateService', fakeAsync(() => {
    const openBtn = fixture.debugElement.query(By.css('.btn-open-portfolio'));
    openBtn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isOpening()).toBe(true);

    tick(400);
    fixture.detectChanges();

    expect(component.isOpening()).toBe(false);
    expect(readerState.isCoverOpened()).toBe(true);
  }));

  it('deve suportar acionamento via teclado (tecla Enter e Space)', fakeAsync(() => {
    const openBtn = fixture.debugElement.query(By.css('.btn-open-portfolio'));
    openBtn.triggerEventHandler('keydown', { key: 'Enter', preventDefault: jest.fn() });
    fixture.detectChanges();

    expect(component.isOpening()).toBe(true);
    tick(400);

    expect(readerState.isCoverOpened()).toBe(true);
  }));

  it('deve disponibilizar atalhos diretos com links nativos (#index-section e #projects)', () => {
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('a')).map((a) => (a as HTMLAnchorElement).getAttribute('href'));
    expect(links).toContain('#index-section');
    expect(links).toContain('#projects');
  });
});
