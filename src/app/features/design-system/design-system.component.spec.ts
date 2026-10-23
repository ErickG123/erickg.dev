import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignSystemComponent } from './design-system.component';
import { provideRouter } from '@angular/router';

describe('DesignSystemComponent', () => {
  let component: DesignSystemComponent;
  let fixture: ComponentFixture<DesignSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignSystemComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DesignSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar a página de demonstração do design system', () => {
    expect(component).toBeTruthy();
  });

  it('deve conter os 4 tokens de cores obrigatórios da paleta', () => {
    const colorNames = component.colorTokens.map((c) => c.name);
    expect(colorNames).toContain('Ink Black');
    expect(colorNames).toContain('Paper White');
    expect(colorNames).toContain('Vermilion Red');
    expect(colorNames).toContain('Ink Gray');
  });

  it('deve renderizar o carimbo Hanko com assinatura do autor', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const hankoEl = compiled.querySelector('.hanko-stamp');
    expect(hankoEl).toBeTruthy();
    expect(hankoEl?.textContent).toContain('ERICK');
  });

  it('deve renderizar a suíte de componentes de quadros editoriais', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-chapter-header')).toBeTruthy();
    expect(compiled.querySelector('app-manga-panel')).toBeTruthy();
    expect(compiled.querySelector('app-artwork-frame')).toBeTruthy();
    expect(compiled.querySelector('app-editorial-divider')).toBeTruthy();
    expect(compiled.querySelector('app-chapter-marker')).toBeTruthy();
  });
});
