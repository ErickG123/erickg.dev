import { Injectable, signal } from '@angular/core';
import { Project } from '../../../core/models/project.interface';
import { FEATURED_PROJECTS_DATA } from '../../../core/data/portfolio.data';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  readonly projects = signal<Project[]>([]);
  readonly isLoading = signal<boolean>(false);

  loadProjects(): void {
    this.isLoading.set(false);
    this.projects.set(FEATURED_PROJECTS_DATA);
  }
}
