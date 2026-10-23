import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtworkFrameComponent } from './artwork-frame.component';

describe('ArtworkFrameComponent', () => {
  let component: ArtworkFrameComponent;
  let fixture: ComponentFixture<ArtworkFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkFrameComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtworkFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente artwork-frame', () => {
    expect(component).toBeTruthy();
  });

  it('deve aplicar proporção padrão de 16:9 e borda sólida', () => {
    const el = fixture.nativeElement as HTMLElement;
    const frame = el.querySelector('.artwork-frame');
    expect(frame?.getAttribute('data-aspect')).toBe('16:9');
    expect(frame?.classList.contains('border-solid')).toBe(true);
    expect(frame?.classList.contains('manga-crop-marks')).toBe(true);
  });

  it('deve renderizar o cabeçalho técnico quando frameLabel for fornecido', () => {
    fixture.componentRef.setInput('frameLabel', 'FIG 01.1 // ESQUEMA');
    fixture.componentRef.setInput('statusBadge', 'VERIFICADO');
    fixture.componentRef.setInput('statusBadgeVariant', 'vermilion');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.frame-label')?.textContent).toContain('FIG 01.1 // ESQUEMA');
    const badge = el.querySelector('.manga-badge');
    expect(badge?.textContent).toContain('VERIFICADO');
    expect(badge?.classList.contains('manga-badge--vermilion')).toBe(true);
  });

  it('deve aplicar retícula ao container de conteúdo quando configurado', () => {
    fixture.componentRef.setInput('screentoneBackground', 'blueprint');
    fixture.detectChanges();

    const content = (fixture.nativeElement as HTMLElement).querySelector('.frame-content');
    expect(content?.classList.contains('tone-blueprint')).toBe(true);
  });
});
