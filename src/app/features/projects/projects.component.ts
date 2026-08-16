import { Component, inject, OnInit, effect, signal } from '@angular/core';
import { ProjectService } from './services/project.service';
import { Project } from '../../core/models/project.interface';
import { UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { track } from '@vercel/analytics';
import { GameStateService } from '../../core/state/game-state.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [UpperCasePipe, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectService = inject(ProjectService);
  gameState = inject(GameStateService);
  selectedProject = signal<Project | null>(null);
  activeDemo = signal<string | null>(null);

  constructor() {
    effect(() => {
      const projects = this.projectService.projects();
      if (projects.length > 0 && !this.selectedProject()) {
        this.selectedProject.set(projects[0]);
      }
    });
  }

  ngOnInit() {
    this.projectService.loadProjects();
  }

  onSelectProject(project: Project) {
    this.selectedProject.set(project);
    this.activeDemo.set(null); 
  }

  onEquipProject(project: Project) {
    if (project.demoType === 'sleuth' || project.title === 'Cyber Sleuth Toolkit') {
      this.activeDemo.set('sleuth');
      try { track('Viewed Project Demo', { project: project.title }); } catch (e) {}
    } else if (project.demoType === 'forge' || project.title === 'The Architect\'s Forge') {
      this.activeDemo.set('forge');
      try { track('Viewed Project Demo', { project: project.title }); } catch (e) {}
    } else if (project.title === 'Corporate Glasses' || project.title.includes('Corporate')) {
      try { track('Equipped Corporate Glasses'); } catch (e) {}
      this.gameState.toggleCorporateMode();
      if (project.url) window.open(project.url, '_blank');
    } else {
      if (project.url) window.open(project.url, '_blank');
    }
  }
}
