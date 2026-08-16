import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../projects/services/project.service';
import { ProjectCardComponent } from '../projects/components/project-card/project-card.component';
import { TypewriterDirective } from '../../shared/directives/typewriter.directive';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProjectCardComponent, TypewriterDirective, DragDropModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projectService = inject(ProjectService);
  featuredProjects = computed(() => this.projectService.projects().slice(0, 3));

  tacticalBlocks = [
    { id: 'text' },
    { id: 'actions' },
    { id: 'avatar' }
  ];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tacticalBlocks, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.projectService.loadProjects();
  }
}
