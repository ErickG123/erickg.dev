import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('Home integration', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the current portfolio sections and featured projects', () => {
    const root = fixture.nativeElement as HTMLElement;
    ['cover', 'projects', 'method', 'notes', 'about', 'contact'].forEach(id => {
      expect(root.querySelector(`#${id}`)).not.toBeNull();
    });
    expect(root.querySelectorAll('app-manga-project-card')).toHaveLength(component.projects.length);
  });

  it('filters the article list by topic and restores all articles', () => {
    expect(component.visibleArticles()).toHaveLength(component.articles.length);

    component.selectedArticleTopic.set('DevOps');
    fixture.detectChanges();
    expect(component.visibleArticles().length).toBeGreaterThan(0);
    expect(component.visibleArticles().every(article => article.topic === 'DevOps')).toBe(true);

    component.selectedArticleTopic.set('all');
    expect(component.visibleArticles()).toHaveLength(component.articles.length);
  });

  it('keeps outbound project and article links secure', () => {
    const links = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('a[target="_blank"]'));
    expect(links.length).toBeGreaterThan(0);
    links.forEach(link => expect(link.getAttribute('rel')).toContain('noopener'));
  });
});
