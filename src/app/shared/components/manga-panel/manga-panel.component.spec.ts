import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaPanelComponent } from './manga-panel.component';

describe('MangaPanelComponent', () => {
  let component: MangaPanelComponent;
  let fixture: ComponentFixture<MangaPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente de quadro manga-panel', () => {
    expect(component).toBeTruthy();
  });

  it('deve aplicar as classes da variante padrão', () => {
    const el = fixture.nativeElement as HTMLElement;
    const panel = el.querySelector('.manga-panel');
    expect(panel?.classList.contains('variant-default')).toBe(true);
    expect(panel?.classList.contains('pad-md')).toBe(true);
  });

  it('deve alternar para variante dark e padding lg quando informado', () => {
    fixture.componentRef.setInput('variant', 'dark');
    fixture.componentRef.setInput('padding', 'lg');
    fixture.detectChanges();

    const panel = (fixture.nativeElement as HTMLElement).querySelector('.manga-panel');
    expect(panel?.classList.contains('variant-dark')).toBe(true);
    expect(panel?.classList.contains('pad-lg')).toBe(true);
  });

  it('deve adicionar a classe de interatividade quando interactive for true', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.detectChanges();

    const panel = (fixture.nativeElement as HTMLElement).querySelector('.manga-panel');
    expect(panel?.classList.contains('is-interactive')).toBe(true);
  });

  it('deve aplicar classe non-decorative quando decorative for false', () => {
    fixture.componentRef.setInput('decorative', false);
    fixture.detectChanges();

    const panel = (fixture.nativeElement as HTMLElement).querySelector('.manga-panel');
    expect(panel?.classList.contains('non-decorative')).toBe(true);
  });
});
