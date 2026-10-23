import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MangaReaderComponent } from './manga-reader.component';
import { ReaderStateService } from '../../../../core/state/reader-state.service';
import { By } from '@angular/platform-browser';

describe('MangaReaderComponent', () => {
  let component: MangaReaderComponent;
  let fixture: ComponentFixture<MangaReaderComponent>;
  let readerState: ReaderStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaReaderComponent],
      providers: [ReaderStateService]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaReaderComponent);
    component = fixture.componentInstance;
    readerState = TestBed.inject(ReaderStateService);
    readerState.setReadingMode('immersive');
    fixture.detectChanges();
  });

  it('deve criar o componente do leitor de mangá imersivo', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar na página 0 com o botão anterior desabilitado', () => {
    expect(component.currentPageIndex()).toBe(0);
    expect(component.canGoPrevious()).toBe(false);
    expect(component.canGoNext()).toBe(true);

    const prevBtn = fixture.debugElement.query(By.css('.btn-prev')).nativeElement as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('deve avançar para a próxima página com transição ao chamar nextPage()', fakeAsync(() => {
    component.nextPage();
    expect(component.isTurning()).toBe(true);

    tick(300);
    fixture.detectChanges();

    expect(component.isTurning()).toBe(false);
    expect(component.currentPageIndex()).toBe(1);
    expect(component.canGoPrevious()).toBe(true);
  }));

  it('deve respeitar os limites e desabilitar o botão próxima na última página', fakeAsync(() => {
    component.goToPage(component.pages.length - 1);
    tick(300);
    fixture.detectChanges();

    expect(component.currentPageIndex()).toBe(component.pages.length - 1);
    expect(component.canGoNext()).toBe(false);

    const nextBtn = fixture.debugElement.query(By.css('.btn-next')).nativeElement as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(true);
  }));

  it('deve navegar via setas do teclado (ArrowRight e ArrowLeft)', fakeAsync(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    tick(300);
    fixture.detectChanges();
    expect(component.currentPageIndex()).toBe(1);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    tick(300);
    fixture.detectChanges();
    expect(component.currentPageIndex()).toBe(0);
  }));

  it('deve navegar via gestos touch de swipe horizontal', fakeAsync(() => {
    // Simula touchstart no X: 200
    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 200, clientY: 100 } as any]
    });
    component.handleTouchStart(touchStartEvent);

    // Simula touchend no X: 100 (swipe para esquerda / próximo)
    const touchEndEvent = new TouchEvent('touchend', {
      changedTouches: [{ clientX: 100, clientY: 100 } as any]
    });
    component.handleTouchEnd(touchEndEvent);

    tick(300);
    fixture.detectChanges();
    expect(component.currentPageIndex()).toBe(1);
  }));
});
