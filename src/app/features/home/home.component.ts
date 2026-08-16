import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../projects/services/project.service';
import { ProjectCardComponent } from '../projects/components/project-card/project-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProjectCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projectService = inject(ProjectService);
  featuredProjects = computed(() => this.projectService.projects().slice(0, 3));

  ngOnInit() {
    this.projectService.loadProjects();
  }
}
