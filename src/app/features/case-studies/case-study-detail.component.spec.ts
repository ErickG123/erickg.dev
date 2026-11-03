import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CaseStudyDetailComponent } from './case-study-detail.component';

describe('CaseStudyDetailComponent', () => {
  let component: CaseStudyDetailComponent;
  let fixture: ComponentFixture<CaseStudyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudyDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: (key: string) => key === 'id' ? 'schema-lens' : null }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads SchemaLens and renders its documented sections', () => {
    expect(component.caseStudy()?.title).toBe('SchemaLens');
    expect(component.sections()).toHaveLength(9);
    expect(fixture.nativeElement.querySelectorAll('.case-study-section')).toHaveLength(9);
  });

  it('renders the architecture map with a readable Japanese glossary', () => {
    const nodes = fixture.nativeElement.querySelectorAll('.architecture-node');
    expect(nodes).toHaveLength(component.architectureLayers.length);
    expect(fixture.nativeElement.querySelector('.architecture-note-reading').textContent).toContain('gamen');
  });

  it('updates the selected architecture explanation when a layer is selected', () => {
    const nodes = fixture.nativeElement.querySelectorAll<HTMLButtonElement>('.architecture-node');
    nodes[1].click();
    fixture.detectChanges();

    expect(component.selectedArchitecture().id).toBe('desktop');
    expect(nodes[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('provides a route back to the projects page', () => {
    expect(fixture.nativeElement.querySelector('.case-back-link')?.getAttribute('href')).toBe('/projects');
  });
});
