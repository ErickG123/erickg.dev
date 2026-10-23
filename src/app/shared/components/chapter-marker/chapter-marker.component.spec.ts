import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterMarkerComponent } from './chapter-marker.component';

describe('ChapterMarkerComponent', () => {
  let component: ChapterMarkerComponent;
  let fixture: ComponentFixture<ChapterMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterMarkerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterMarkerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('number', '02');
    fixture.detectChanges();
  });

  it('deve criar o componente chapter-marker', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o número do capítulo com prefixo #', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.marker-number')?.textContent).toContain('#02');
  });

  it('deve renderizar a etiqueta e variante vermilion com estado ativo', () => {
    fixture.componentRef.setInput('label', 'OBRAS');
    fixture.componentRef.setInput('variant', 'vermilion');
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const marker = el.querySelector('.chapter-marker');
    expect(marker?.classList.contains('variant-vermilion')).toBe(true);
    expect(marker?.classList.contains('is-active')).toBe(true);
    expect(el.querySelector('.marker-label')?.textContent).toContain('OBRAS');
    expect(el.querySelector('.active-dot')).toBeTruthy();
  });
});
