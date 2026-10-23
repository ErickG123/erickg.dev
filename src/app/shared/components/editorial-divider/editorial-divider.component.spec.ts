import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorialDividerComponent } from './editorial-divider.component';

describe('EditorialDividerComponent', () => {
  let component: EditorialDividerComponent;
  let fixture: ComponentFixture<EditorialDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorialDividerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EditorialDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente editorial-divider', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar variante sólida com quadrado de acento por padrão', () => {
    const el = fixture.nativeElement as HTMLElement;
    const divider = el.querySelector('.editorial-divider');
    expect(divider?.classList.contains('variant-solid')).toBe(true);
    expect(el.querySelector('.divider-square')).toBeTruthy();
  });

  it('deve renderizar rótulo centralizado quando fornecido', () => {
    fixture.componentRef.setInput('label', 'ACT II // BREAK');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.divider-label')?.textContent).toContain('ACT II // BREAK');
  });

  it('deve ocultar o quadrado de acento quando withAccentSquare for false', () => {
    fixture.componentRef.setInput('withAccentSquare', false);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.divider-square')).toBeNull();
  });
});
