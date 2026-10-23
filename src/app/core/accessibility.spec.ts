import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { HomeComponent } from '../features/home/home.component';
import { By } from '@angular/platform-browser';
import { App } from '../app';
import { HeaderComponent } from '../layout/header/header.component';
import { AudioService } from './audio.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

@Pipe({ name: 'translate', standalone: true })
class MockTranslatePipe implements PipeTransform {
  transform(value: string): string { return value; }
}

describe('Systematic Accessibility & Keyboard Navigation (WCAG 2.1 AA)', () => {
  describe('Landmarks & Skip Link Architecture (App Root)', () => {
    let fixture: ComponentFixture<App>;

    beforeEach(async () => {
      const mockAudioService = {
        isBgmPlaying: signal(false),
        toggleBgm: jest.fn()
      };

      await TestBed.configureTestingModule({
        imports: [App],
        providers: [
          provideNoopAnimations(),
          provideRouter([]),
          { provide: AudioService, useValue: mockAudioService },
          { provide: SwUpdate, useValue: { isEnabled: false, versionUpdates: of() } },
          {
            provide: TranslateService,
            useValue: {
              get: () => of(''),
              instant: (k: string) => k,
              translate: (k: string) => k,
              setFallbackLang: jest.fn(),
              use: jest.fn()
            }
          }
        ]
      })
      .overrideComponent(HeaderComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [MockTranslatePipe] }
      })
      .compileComponents();

      fixture = TestBed.createComponent(App);
      fixture.detectChanges();
    });

    it('deve conter um Skip Link funcional com destino #main-content para usuários de teclado', () => {
      const el = fixture.nativeElement as HTMLElement;
      const skipLink = el.querySelector('a.skip-link') as HTMLAnchorElement;

      expect(skipLink).toBeTruthy();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
      expect(skipLink.textContent).toContain('PULAR PARA O CONTEÚDO PRINCIPAL');

      const mainTarget = el.querySelector('#main-content');
      expect(mainTarget).toBeTruthy();
      expect(mainTarget?.tagName.toLowerCase()).toBe('main');
    });

    it('deve possuir apenas um elemento <main> no nível superior da aplicação', () => {
      const el = fixture.nativeElement as HTMLElement;
      const mainLandmarks = el.querySelectorAll('main');
      expect(mainLandmarks.length).toBe(1);
    });
  });

  describe('Semântica, Heading Hierarchy & Dialogs (HomeComponent)', () => {
    let homeFixture: ComponentFixture<HomeComponent>;
    let homeComp: HomeComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HomeComponent],
        providers: [provideRouter([])]
      }).compileComponents();

      homeFixture = TestBed.createComponent(HomeComponent);
      homeComp = homeFixture.componentInstance;
      homeComp.readerState.setReadingMode('editorial');
      homeFixture.detectChanges();
    });

    it('deve possuir um único <h1> descritivo no Hero/Capa da página', () => {
      const el = homeFixture.nativeElement as HTMLElement;
      const h1List = el.querySelectorAll('h1');
      expect(h1List.length).toBe(1);
      expect(h1List[0].textContent?.trim()).toBeTruthy();
    });

    it('deve possuir todas as 7 seções semânticas com identificadores ou rótulos semânticos', () => {
      const el = homeFixture.nativeElement as HTMLElement;
      const sections = el.querySelectorAll('section, nav, footer');
      expect(sections.length).toBeGreaterThanOrEqual(7);

      const projectsSection = el.querySelector('#projects');
      expect(projectsSection?.getAttribute('aria-labelledby')).toBe('projects-title');
    });

    it('deve gerenciar atributos de diálogo acessível no modal de Field Note', () => {
      homeComp.openFieldNote('1');
      homeFixture.detectChanges();

      const modalBackdrop = homeFixture.nativeElement.querySelector('.field-note-modal-backdrop');
      expect(modalBackdrop).toBeTruthy();
      expect(modalBackdrop.getAttribute('role')).toBe('dialog');
      expect(modalBackdrop.getAttribute('aria-modal')).toBe('true');
      expect(modalBackdrop.getAttribute('aria-labelledby')).toBe('active-note-title');
      expect(modalBackdrop.getAttribute('aria-describedby')).toBe('active-note-synopsis');

      const closeButton = modalBackdrop.querySelector('button[aria-label*="Fechar"]');
      expect(closeButton).toBeTruthy();
    });

    it('deve fechar o modal e restaurar o estado ao acionar a tecla Escape', () => {
      homeComp.openFieldNote('1');
      homeFixture.detectChanges();
      expect(homeComp.activeFieldNote()).toBeTruthy();

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      homeFixture.detectChanges();

      expect(homeComp.activeFieldNote()).toBeNull();
    });

    it('todos os inputs do formulário de contato devem ter identificadores e labels associadas', () => {
      const el = homeFixture.nativeElement as HTMLElement;
      const inputs = el.querySelectorAll('#contact input, #contact textarea');

      inputs.forEach(input => {
        const id = input.getAttribute('id');
        expect(id).toBeTruthy();
        const label = el.querySelector(`label[for="${id}"]`);
        expect(label).toBeTruthy();
        expect(input.getAttribute('aria-required')).toBe('true');
      });
    });

    it('todas as imagens devem possuir texto alternativo (alt) significativo', () => {
      const el = homeFixture.nativeElement as HTMLElement;
      const images = el.querySelectorAll('img');

      images.forEach(img => {
        const alt = img.getAttribute('alt');
        expect(alt).not.toBeNull();
        expect(alt?.trim().length).toBeGreaterThan(0);
      });
    });

    it('parágrafos de leitura e sinopse não devem ter classes de retícula pontilhada diretamente em seu contêiner', () => {
      homeComp.openFieldNote('1');
      homeFixture.detectChanges();
      const el = homeFixture.nativeElement as HTMLElement;
      const synopsis = el.querySelector('#active-note-synopsis');
      expect(synopsis).toBeTruthy();
      const parent = synopsis?.parentElement;
      expect(parent?.classList.contains('screentone-dots-light')).toBe(false);
      expect(parent?.classList.contains('screentone-dots-dense')).toBe(false);
      expect(parent?.classList.contains('text-surface')).toBe(true);
    });
  });

  describe('Cálculo Matemático de Contraste de Cores (WCAG 2.1 AA)', () => {
    // Função utilitária para cálculo de luminância relativa conforme especificação W3C
    function getRelativeLuminance(hex: string): number {
      const cleanHex = hex.replace('#', '');
      const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
      const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
      const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

      const [rs, gs, bs] = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function getContrastRatio(hex1: string, hex2: string): number {
      const lum1 = getRelativeLuminance(hex1);
      const lum2 = getRelativeLuminance(hex2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }

    it('o texto em nanquim (--manga-ink #111111) sobre papel (--manga-paper #F4F0E9) deve superar 16:1 (WCAG AAA)', () => {
      const ratio = getContrastRatio('#111111', '#F4F0E9');
      expect(ratio).toBeGreaterThan(16);
    });

    it('o texto secundário (--manga-gray #595552) sobre papel (#F4F0E9) deve superar 4.5:1 (WCAG AA para texto regular)', () => {
      const ratio = getContrastRatio('#595552', '#F4F0E9');
      expect(ratio).toBeGreaterThan(4.5);
    });

    it('o texto de ênfase vermilion escuro (#B32027) sobre papel (#F4F0E9) deve superar 4.5:1 (WCAG AA)', () => {
      const ratio = getContrastRatio('#B32027', '#F4F0E9');
      expect(ratio).toBeGreaterThan(4.5);
    });

    it('o texto branco (#FFFFFF) sobre o vermelho de ação (#D9363E) deve superar 4.5:1 (WCAG AA)', () => {
      const ratio = getContrastRatio('#FFFFFF', '#D9363E');
      expect(ratio).toBeGreaterThan(4.5);
    });

    it('o texto em nanquim sobre superfície branca de painel (--manga-surface #FFFFFF) deve superar 18:1 (WCAG AAA)', () => {
      const ratio = getContrastRatio('#111111', '#FFFFFF');
      expect(ratio).toBeGreaterThan(18);
    });

    it('o texto em nanquim sobre superfície suave (--manga-surface-muted #EAE5DC) deve superar 14:1 (WCAG AAA)', () => {
      const ratio = getContrastRatio('#111111', '#EAE5DC');
      expect(ratio).toBeGreaterThan(14);
    });
  });
});
