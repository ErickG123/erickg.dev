import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
    <section class="container flex flex-column gap-4 fadein">
      <div class="flex align-center gap-2 mb-4" style="border-bottom: 2px dashed var(--gba-border); padding-bottom: 1rem;">
        <h2 class="pixel-font m-0" style="font-size: 2rem;">QUEST_LOG</h2>
      </div>

      @if (projectService.isLoading()) {
        <div class="flex justify-center align-center" style="height: 15rem;">
          <span class="pixel-font">LOADING...</span>
        </div>
      } @else {
        <div class="projects-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
          @for (project of projectService.projects(); track project.id) {
            <app-project-card [project]="project"></app-project-card>
          }
        </div>
      }
    </section>
  `
})
export class ProjectsComponent implements OnInit {
  projectService = inject(ProjectService);

  ngOnInit() {
    this.projectService.loadProjects();
  }
}
