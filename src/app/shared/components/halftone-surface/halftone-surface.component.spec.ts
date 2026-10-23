import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HalftoneSurfaceComponent } from './halftone-surface.component';

describe('HalftoneSurfaceComponent', () => {
  let component: HalftoneSurfaceComponent;
  let fixture: ComponentFixture<HalftoneSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalftoneSurfaceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HalftoneSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente halftone-surface', () => {
    expect(component).toBeTruthy();
  });

  it('deve aplicar padrão padrão de dots-light', () => {
    const el = fixture.nativeElement as HTMLElement;
    const surface = el.querySelector('.halftone-surface');
    expect(surface?.classList.contains('pattern-dots-light')).toBe(true);
    expect(surface?.classList.contains('pad-md')).toBe(true);
  });

  it('deve alternar para crosshatch e borda ativada', () => {
    fixture.componentRef.setInput('pattern', 'crosshatch');
    fixture.componentRef.setInput('bordered', true);
    fixture.detectChanges();

    const surface = (fixture.nativeElement as HTMLElement).querySelector('.halftone-surface');
    expect(surface?.classList.contains('pattern-crosshatch')).toBe(true);
    expect(surface?.classList.contains('is-bordered')).toBe(true);
  });

  it('deve desativar o padrão decorativo quando disabled for true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const surface = (fixture.nativeElement as HTMLElement).querySelector('.halftone-surface');
    expect(surface?.classList.contains('is-disabled')).toBe(true);
  });
});
