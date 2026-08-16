import { Component, input } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <article class="gba-card h-full flex flex-column justify-between">
      <div>
        <div class="flex align-center justify-center mb-4" style="height: 8rem; background-color: var(--gba-bg); border-bottom: 2px solid var(--gba-border);">
           <span class="pixel-font text-red" style="font-size: 3rem;">[ ]</span>
        </div>
        
        <h3 class="pixel-font m-0 mb-2" style="font-size: 1.2rem;">{{ project().title }}</h3>
        
        <span class="gba-badge mb-3">STATUS: EM_EVOLUÇÃO</span>
        
        <p class="m-0 mt-2">
          {{ project().description }}
        </p>
      </div>
      
      <div class="mt-4 pt-3" style="border-top: 2px dashed var(--gba-border);">
        <a [href]="project().link" target="_blank" class="gba-btn w-full text-center" style="display: block;">
          > VISUALIZAR
        </a>
      </div>
    </article>
  `
})
export class ProjectCardComponent {
  project = input.required<Project>();
}
