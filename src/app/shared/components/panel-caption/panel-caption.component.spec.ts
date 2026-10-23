import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelCaptionComponent } from './panel-caption.component';

describe('PanelCaptionComponent', () => {
  let component: PanelCaptionComponent;
  let fixture: ComponentFixture<PanelCaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCaptionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente panel-caption', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a legenda do tipo narration por padrão', () => {
    const el = fixture.nativeElement as HTMLElement;
    const caption = el.querySelector('.panel-caption');
    expect(caption?.classList.contains('type-narration')).toBe(true);
  });

  it('deve exibir o carimbo e estilo técnico quando configurado', () => {
    fixture.componentRef.setInput('type', 'technical');
    fixture.componentRef.setInput('stampText', 'TELEMETRY // LOG_01');
    fixture.componentRef.setInput('vermilionAccent', true);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const caption = el.querySelector('.panel-caption');
    expect(caption?.classList.contains('type-technical')).toBe(true);
    expect(caption?.classList.contains('accent-vermilion')).toBe(true);
    expect(el.querySelector('.caption-stamp')?.textContent).toContain('TELEMETRY // LOG_01');
  });
});
