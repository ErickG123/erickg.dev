import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseStudyDetailComponent } from './case-study-detail.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('CaseStudyDetailComponent', () => {
  let component: CaseStudyDetailComponent;
  let fixture: ComponentFixture<CaseStudyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudyDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => (key === 'id' ? '1' : null)
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar a página de estudo de caso detalhado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar o estudo de caso 01 (The Architect\'s Forge)', () => {
    expect(component.caseStudy()).toBeTruthy();
    expect(component.caseStudy()?.title).toContain("The Architect's Forge");
  });

  it('deve renderizar os 9 tópicos estruturais do estudo de caso', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('1. Contexto');
    expect(el.textContent).toContain('2. O Problema');
    expect(el.textContent).toContain('3. Restrições Técnicas');
    expect(el.textContent).toContain('4. Alternativas Consideradas');
    expect(el.textContent).toContain('5. Arquitetura e Decisões Técnicas');
    expect(el.textContent).toContain('6. Implementação');
    expect(el.textContent).toContain('7. Testes e Validação');
    expect(el.textContent).toContain('8. Resultados Comprovados');
    expect(el.textContent).toContain('9. Aprendizados e Próximos Passos');
  });

  it('deve renderizar o bloco de código da implementação', () => {
    const el = fixture.nativeElement as HTMLElement;
    const codeEl = el.querySelector('pre code');
    expect(codeEl).toBeTruthy();
    expect(codeEl?.textContent).toContain('generateCleanArchitecture');
  });

  it('deve oferecer link de retorno para as obras selecionadas', () => {
    const el = fixture.nativeElement as HTMLElement;
    const returnLinks = Array.from(el.querySelectorAll('a')).filter(a =>
      a.textContent?.includes('VOLTAR PARA OBRAS SELECIONADAS') ||
      a.textContent?.includes('RETORNAR À SEÇÃO DE OBRAS SELECIONADAS')
    );
    expect(returnLinks.length).toBeGreaterThan(0);
  });
});
