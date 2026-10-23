import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaProjectCardComponent } from './manga-project-card.component';
import { Project } from '../../../core/models/project.interface';

describe('MangaProjectCardComponent', () => {
  let component: MangaProjectCardComponent;
  let fixture: ComponentFixture<MangaProjectCardComponent>;

  const mockProject: Project = {
    id: '1',
    title: "The Architect's Forge",
    description: 'CLI de arquitetura para Angular.',
    problem: 'Necessidade de automatizar scaffolds corporativos com Clean Architecture.',
    role: 'Criador & Engenheiro Principal',
    techStack: ['Angular', 'TypeScript'],
    status: 'Estável',
    url: 'https://github.com/ErickG123/ng-architect-cli',
    demoUrl: 'https://demo.architect-forge.dev',
    highlight: 'Scaffolds de alta performance',
    year: 2024
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaProjectCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaProjectCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();
  });

  it('deve criar o card de projeto', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o título e link real do repositório', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h3')?.textContent).toContain("The Architect's Forge");
    const linkEl = el.querySelector('a') as HTMLAnchorElement;
    expect(linkEl).toBeTruthy();
    expect(linkEl.href).toBe('https://github.com/ErickG123/ng-architect-cli');
  });

  it('deve exibir o papel do autor e o bloco de problema de arquitetura', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.project-role-tag')?.textContent).toContain('Criador & Engenheiro Principal');
    expect(el.querySelector('.project-problem-box')?.textContent).toContain('Necessidade de automatizar scaffolds');
  });

  it('deve renderizar botão de demo quando demoUrl estiver presente', () => {
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('a'));
    const demoLink = links.find(a => a.textContent?.includes('DEMO'));
    expect(demoLink).toBeTruthy();
    expect(demoLink?.href).toBe('https://demo.architect-forge.dev/');
  });
});
