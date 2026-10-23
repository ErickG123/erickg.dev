import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterHeadingComponent } from './chapter-heading.component';

describe('ChapterHeadingComponent', () => {
  let component: ChapterHeadingComponent;
  let fixture: ComponentFixture<ChapterHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterHeadingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterHeadingComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('chapter', 'CHAPTER 01');
    fixture.componentRef.setInput('title', 'O PROTAGONISTA');
    fixture.componentRef.setInput('subtitle', 'Perfil biográfico');
    fixture.detectChanges();
  });

  it('deve criar o componente de cabeçalho de capítulo', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o número do capítulo e título', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.chapter-badge')?.textContent).toContain('CHAPTER 01');
    expect(el.querySelector('h2')?.textContent).toContain('O PROTAGONISTA');
  });
});
