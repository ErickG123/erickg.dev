import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { ProjectService } from './services/project.service';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let mockProjectService: any;

  beforeEach(async () => {
    const mockProjects = [
      { id: '1', title: 'Normal Project', description: 'Just a normal project.', technologies: [], role: 'Dev', year: 2024, link: 'https://ex.com' },
      { id: '2', title: 'The Architect\'s Forge', description: 'CLI Generator.', technologies: [], role: 'Dev', year: 2024, link: 'https://ex.com' }
    ];

    mockProjectService = {
      projects: signal(mockProjects),
      loadProjects: jest.fn(),
      isLoading: signal(false)
    };

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        { provide: ProjectService, useValue: mockProjectService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve atualizar o Signal do projeto selecionado ao receber um click nativo em um item da lista', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.inventory-item'));
    expect(listItems.length).toBe(2);

    listItems[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedProject()?.title).toBe('Normal Project');
  });

  it('se o projeto Equipado for "The Architect\'s Forge", o container .cli-terminal-demo deve emergir no DOM', () => {
    const forgeProject = mockProjectService.projects().find((p: any) => p.title === 'The Architect\'s Forge');
    
    component.selectedProject.set(forgeProject);
    component.activeDemo.set('forge');
    fixture.detectChanges();

    const terminalEl = fixture.debugElement.query(By.css('.cli-terminal-demo'));
    
    expect(terminalEl).toBeTruthy();
  });
});
