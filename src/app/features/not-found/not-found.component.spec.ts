import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { SeoService } from '../../core/seo.service';
import { provideRouter } from '@angular/router';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let seoService: SeoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        provideRouter([]),
        SeoService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    seoService = TestBed.inject(SeoService);
  });

  it('deve ser instanciado corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar seo.setNotFoundTags() no ngOnInit', () => {
    const seoSpy = jest.spyOn(seoService, 'setNotFoundTags');
    fixture.detectChanges();
    expect(seoSpy).toHaveBeenCalled();
  });

  it('deve renderizar o código 404 e os links de navegação para Home e Projetos', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.glitch-number')?.textContent).toContain('404');

    const links = compiled.querySelectorAll('a');
    expect(links.length).toBeGreaterThanOrEqual(2);
    const linkTexts = Array.from(links).map(l => l.textContent?.trim());
    expect(linkTexts.some(t => t?.includes('RETORNAR À CAPA'))).toBe(true);
    expect(linkTexts.some(t => t?.includes('VER PROJETOS'))).toBe(true);
  });
});
