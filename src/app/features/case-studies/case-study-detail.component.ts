import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CASE_STUDIES_DATA } from '../../core/data/case-studies.data';
import { CaseStudy, CaseStudySection } from '../../core/models/case-study.interface';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-case-study-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './case-study-detail.component.html',
  styleUrls: ['./case-study-detail.component.scss']
})
export class CaseStudyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  caseStudy = signal<CaseStudy | null>(null);
  allStudies = CASE_STUDIES_DATA;
  sections = computed<CaseStudySection[]>(() => {
    const study = this.caseStudy();
    if (!study) return [];
    return [
      study.context,
      study.problem,
      study.constraints,
      study.alternativesConsidered,
      study.architectureDecisions,
      study.implementation,
      study.testingAndValidation,
      study.provenResults,
      study.learningsAndNextSteps
    ];
  });

  openSection(index: number): void {
    const section = document.getElementById(`case-section-${index}`) as HTMLDetailsElement | null;
    if (!section) return;

    section.open = true;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

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
