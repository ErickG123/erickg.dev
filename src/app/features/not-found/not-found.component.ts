import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { MangaPanelComponent } from '../../shared/components/manga-panel/manga-panel.component';
import { ChapterHeaderComponent } from '../../shared/components/chapter-header/chapter-header.component';
import { EditorialDividerComponent } from '../../shared/components/editorial-divider/editorial-divider.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MangaPanelComponent,
    ChapterHeaderComponent,
    EditorialDividerComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setNotFoundTags();
  }
}
