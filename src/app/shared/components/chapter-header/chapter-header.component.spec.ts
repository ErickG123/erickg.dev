import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterHeaderComponent } from './chapter-header.component';

describe('ChapterHeaderComponent', () => {
  let component: ChapterHeaderComponent;
  let fixture: ComponentFixture<ChapterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterHeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('chapter', 'ACT 01');
    fixture.componentRef.setInput('title', 'O COMEÇO');
    fixture.detectChanges();
  });

  it('deve criar o cabeçalho de capítulo', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o capítulo e o título informados', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.chapter-badge')?.textContent).toContain('ACT 01');
    expect(el.querySelector('h2')?.textContent).toContain('O COMEÇO');
  });

  it('deve renderizar subtítulo e meta quando fornecidos', () => {
    fixture.componentRef.setInput('subtitle', 'Subtítulo editorial');
    fixture.componentRef.setInput('meta', '5 MIN DE LEITURA');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.subtitle-text')?.textContent).toContain('Subtítulo editorial');
    expect(el.textContent).toContain('5 MIN DE LEITURA');
  });

  it('deve ocultar a sarjeta divisora quando showDivider for false', () => {
    fixture.componentRef.setInput('showDivider', false);
    fixture.detectChanges();

    const divider = (fixture.nativeElement as HTMLElement).querySelector('.gutter-divider');
    expect(divider).toBeNull();
  });
});
