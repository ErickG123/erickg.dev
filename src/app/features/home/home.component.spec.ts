import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

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
    fixture.detectChanges();
  });

  it('renders the hero, portfolio sections, and project cards', () => {
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('h1')).not.toBeNull();
    expect(root.querySelectorAll('section').length).toBeGreaterThanOrEqual(5);
    expect(fixture.debugElement.queryAll(By.css('app-manga-project-card'))).toHaveLength(component.projects.length);
  });

  it('shows the professional career entries from the shared portfolio data', () => {
    const entries = fixture.nativeElement.querySelectorAll('.career-entry');
    expect(entries.length).toBe(component.careerHistory.length);
  });

  it('filters articles when a topic is selected', () => {
    const devOpsFilter = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.article-filters button'))
      .find(button => button.textContent?.trim() === 'DevOps') as HTMLButtonElement;
    expect(devOpsFilter).toBeTruthy();
    devOpsFilter.click();
    fixture.detectChanges();

    expect(component.selectedArticleTopic()).toBe('DevOps');
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('.article-card')).toHaveLength(
      component.articles.filter(article => article.topic === 'DevOps').length
    );
  });
});
