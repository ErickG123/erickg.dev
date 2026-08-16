import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  readonly projects = signal<Project[]>([]);
  readonly isLoading = signal<boolean>(false);

  private readonly MOCK_DATA: Project[] = [
    {
      id: '1',
      title: 'The Architect\'s Forge',
      description: 'Ferramenta CLI para arquitetar e forjar estruturas Angular com precisão tática e layouts customizáveis.',
      link: 'https://github.com/ErickG123/ng-architect-cli'
    },
    {
      id: '2',
      title: 'Cyber Sleuth Toolkit',
      description: 'Kit de desenvolvimento especializado para investigação forense digital e perícia cibernética.',
      link: 'https://github.com/ErickG123/devkit_forense'
    },
    {
      id: '3',
      title: 'Network Guardian Node',
      description: 'Interceptor inteligente atuando como escudo na camada de requisições de rede. Regras de processo e validação rigorosa.',
      link: 'https://github.com/ErickG123/ngx-smart-interceptor'
    },
    {
      id: '4',
      title: 'Otaku Courier Network',
      description: 'Sistema de broadcast e Newsletter focado no universo anime, disparando sinais por toda a rede.',
      link: 'https://anime-newsletter-sooty.vercel.app/'
    }
  ];

  loadProjects(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.projects.set(this.MOCK_DATA);
      this.isLoading.set(false);
    }, 600);
  }
}
