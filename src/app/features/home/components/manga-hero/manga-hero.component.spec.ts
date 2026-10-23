import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaHeroComponent } from './manga-hero.component';
import { By } from '@angular/platform-browser';

describe('MangaHeroComponent', () => {
  let component: MangaHeroComponent;
  let fixture: ComponentFixture<MangaHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaHeroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente de Hero e capa editorial', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a tagline memorável e a descrição profissional objetiva', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.hero-tagline')?.textContent).toContain('I BUILD. I SOLVE. I IMPROVE.');
    expect(el.querySelector('.hero-description')?.textContent).toContain(
      'Transformo problemas complexos em soluções de software claras, estruturadas e úteis.'
    );
  });

  it('deve renderizar a identidade do autor e o identificador de volume/capítulo', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('ERICK GABRIEL');
    expect(el.textContent).toContain('VOL. 01');
    expect(el.textContent).toContain('ACT 00');
  });

  it('deve conter as ações primárias (Projetos) e secundárias (Sobre o Autor)', () => {
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('a')).map((a) => (a as HTMLAnchorElement).getAttribute('href'));
    expect(links).toContain('#projects');
    expect(links).toContain('#about');
  });

  it('deve incluir o indicador discreto de rolagem para o sumário', () => {
    const scrollPrompt = fixture.debugElement.query(By.css('.hero-scroll-prompt'));
    expect(scrollPrompt).toBeTruthy();
    const scrollLink = scrollPrompt.query(By.css('a')).nativeElement as HTMLAnchorElement;
    expect(scrollLink.getAttribute('href')).toBe('#index-section');
    expect(scrollLink.textContent).toContain('ROLE PARA ACESSAR O SUMÁRIO');
  });

  it('deve incorporar a ilustração de capa com app-manga-image', () => {
    const mangaImg = fixture.debugElement.query(By.css('app-manga-image'));
    expect(mangaImg).toBeTruthy();
    expect(mangaImg.componentInstance.src()).toBe('/assets/images/cover/hero-manga-cover.svg');
    expect(mangaImg.componentInstance.priority()).toBe(true);
  });
});
