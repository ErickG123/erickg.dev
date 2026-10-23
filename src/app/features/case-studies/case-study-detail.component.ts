import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CASE_STUDIES_DATA } from '../../core/data/case-studies.data';
import { CaseStudy } from '../../core/models/case-study.interface';
import { SeoService } from '../../core/seo.service';
import { ChapterHeaderComponent } from '../../shared/components/chapter-header/chapter-header.component';
import { MangaPanelComponent } from '../../shared/components/manga-panel/manga-panel.component';
import { ArtworkFrameComponent } from '../../shared/components/artwork-frame/artwork-frame.component';
import { PanelCaptionComponent } from '../../shared/components/panel-caption/panel-caption.component';
import { EditorialDividerComponent } from '../../shared/components/editorial-divider/editorial-divider.component';
import { MangaImageComponent } from '../../shared/components/manga-image/manga-image.component';

@Component({
  selector: 'app-case-study-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ChapterHeaderComponent,
    MangaPanelComponent,
    ArtworkFrameComponent,
    PanelCaptionComponent,
    EditorialDividerComponent,
    MangaImageComponent
  ],
  templateUrl: './case-study-detail.component.html',
  styleUrls: ['./case-study-detail.component.scss']
})
export class CaseStudyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  caseStudy = signal<CaseStudy | null>(null);
  allStudies = CASE_STUDIES_DATA;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = this.allStudies.find(c => c.id === id || c.projectId === id) || this.allStudies[0];
      this.caseStudy.set(found);
      if (found) {
        this.seo.setCaseStudyTags(found);
      }
    });
  }
}
