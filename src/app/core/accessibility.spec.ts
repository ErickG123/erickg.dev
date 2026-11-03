import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { App } from '../app';
import { HomeComponent } from '../features/home/home.component';
import { of } from 'rxjs';

describe('Portfolio accessibility', () => {
  describe('application landmarks', () => {
    let fixture: ComponentFixture<App>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [App],
        providers: [
          provideRouter([]),
          provideNoopAnimations(),
          { provide: SwUpdate, useValue: { isEnabled: false, versionUpdates: of() } }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(App);
      fixture.detectChanges();
    });

    it('provides a skip link targeting the main content landmark', () => {
      const root = fixture.nativeElement as HTMLElement;
      expect(root.querySelector('a.skip-link')?.getAttribute('href')).toBe('#main-content');
      expect(root.querySelector('#main-content')?.tagName.toLowerCase()).toBe('main');
      expect(root.querySelectorAll('main')).toHaveLength(1);
    });
  });

  describe('home page semantics', () => {
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [HomeComponent], providers: [provideRouter([])] }).compileComponents();
      fixture = TestBed.createComponent(HomeComponent);
      fixture.detectChanges();
    });

    it('uses one page heading and labels the projects section', () => {
      const root = fixture.nativeElement as HTMLElement;
      expect(root.querySelectorAll('h1')).toHaveLength(1);
      expect(root.querySelector('#projects')?.getAttribute('aria-labelledby')).toBe('projects-title');
    });

    it('provides non-empty alternative text for rendered images', () => {
      const images = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('img'));
      expect(images.length).toBeGreaterThan(0);
      images.forEach(image => expect(image.getAttribute('alt')?.trim()).toBeTruthy());
    });

    it('marks external links to open safely in a new tab', () => {
      const links = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('a[target="_blank"]'));
      expect(links.length).toBeGreaterThan(0);
      links.forEach(link => expect(link.getAttribute('rel')).toContain('noopener'));
    });
  });
});
