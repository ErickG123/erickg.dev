import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MangaHeroComponent } from './manga-hero.component';

describe('MangaHeroComponent', () => {
  let component: MangaHeroComponent;
  let fixture: ComponentFixture<MangaHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaHeroComponent],
      providers: [provideRouter([])]
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
    expect(el.querySelector('.hero-tagline')?.textContent).toContain('TECNOLOGIA COM PROPÓSITO.');
    expect(el.querySelector('.hero-description')?.textContent).toContain(
      'Transformo problemas complexos em soluções de software claras, estruturadas e úteis.'
    );
  });

  it('deve renderizar a identidade do autor e o identificador de volume/capítulo', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('ERICK GABRIEL');
    expect(el.textContent).toContain('DESENVOLVEDOR FULL-STACK');
    expect(el.textContent).toContain('BRASIL · SOFTWARE & PRODUTO');
  });

  it('deve conter as ações primárias (Projetos) e secundárias (Sobre o Autor)', () => {
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('a')).map((a) => (a as HTMLAnchorElement).getAttribute('href'));
    expect(links).toContain('#projects');
    expect(links).toContain('#about');
  });

  it('does not render a scroll prompt when the current hero has no such action', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.hero-scroll-prompt')).toBeNull();
  });

  it('deve incorporar a ilustração de capa com app-manga-image', () => {
    const mangaImg = fixture.debugElement.query(By.css('app-manga-image'));
    expect(mangaImg).toBeTruthy();
    expect(mangaImg.componentInstance.src()).toBe('/assets/images/profile/erick-gabriel.png');
    expect(mangaImg.componentInstance.priority()).toBe(true);
  });
});
