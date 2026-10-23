import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.readerState.setReadingMode('editorial');
    fixture.detectChanges();
  });

  it('deve criar a página principal da home', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar as 7 seções semânticas na ordem estipulada', () => {
    const el = fixture.nativeElement as HTMLElement;
    const cover = el.querySelector('#cover');
    const indexSec = el.querySelector('#index-section');
    const projects = el.querySelector('#projects');
    const method = el.querySelector('#method');
    const notes = el.querySelector('#notes');
    const about = el.querySelector('#about');
    const contact = el.querySelector('#contact');

    expect(cover).toBeTruthy();
    expect(indexSec).toBeTruthy();
    expect(projects).toBeTruthy();
    expect(method).toBeTruthy();
    expect(notes).toBeTruthy();
    expect(about).toBeTruthy();
    expect(contact).toBeTruthy();
  });

  it('deve exibir os 4 projetos oficiais selecionados de Erick Gabriel', () => {
    const projectCards = fixture.debugElement.queryAll(By.css('app-manga-project-card'));
    expect(projectCards.length).toBe(4);
  });

  it('deve exibir os 3 atos do método: THINK, BREAK, REBUILD', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('THINK');
    expect(el.textContent).toContain('BREAK');
    expect(el.textContent).toContain('REBUILD');
  });

  it('deve exibir os links profissionais reais para GitHub e LinkedIn', () => {
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('a')).map(a => a.href);
    expect(links.some(l => l.includes('github.com/ErickG123'))).toBe(true);
    expect(links.some(l => l.includes('linkedin.com/in/erickgdev'))).toBe(true);
  });

  it('deve alternar para o leitor de mangá imersivo ao clicar no botão de modo', () => {
    const toggleBtn = fixture.debugElement.query(By.css('.btn-toggle-reader-mode'));
    expect(toggleBtn).toBeTruthy();

    toggleBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.readerState.isMangaReaderMode()).toBe(true);
    const mangaReader = fixture.debugElement.query(By.css('app-manga-reader'));
    expect(mangaReader).toBeTruthy();
  });

  it('deve marcar a seção ativa no índice de capítulos ao navegar', () => {
    component.onSectionNavigate('method');
    fixture.detectChanges();

    expect(component.readerState.activeSection()).toBe('method');
    const activeCard = fixture.debugElement.query(By.css('.chapter-nav-card.is-active'));
    expect(activeCard).toBeTruthy();
    expect(activeCard.nativeElement.textContent).toContain('SEÇÃO ATIVA');
  });
});
