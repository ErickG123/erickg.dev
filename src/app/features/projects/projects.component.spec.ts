import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProjectsComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders every featured project from the shared portfolio data', () => {
    expect(fixture.nativeElement.querySelectorAll('app-manga-project-card')).toHaveLength(component.projects.length);
  });

  it('limits the Japanese reading glossary to projects with poster metadata', () => {
    expect(component.posterGlossary.length).toBeGreaterThan(0);
    expect(component.posterGlossary.every(project => !!project.poster)).toBe(true);

    const entries = fixture.nativeElement.querySelectorAll('.glossary-entry');
    const glossary = fixture.nativeElement.querySelector('.projects-glossary') as HTMLDetailsElement;
    glossary.open = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.glossary-entry')).toHaveLength(component.posterGlossary.length);
    expect(entries.length).toBe(component.posterGlossary.length);
  });
});
