import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CASE_STUDIES_DATA } from '../../core/data/case-studies.data';
import { CaseStudy, CaseStudySection } from '../../core/models/case-study.model';
import { SeoService } from '../../core/seo.service';
import { LanguageService } from '../../core/language.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-case-study-detail',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './case-study-detail.component.html',
  styleUrls: ['./case-study-detail.component.scss']
})
export class CaseStudyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  currentLang = inject(LanguageService).currentLang;

  readonly architectureLayers = [
    {
      id: 'interface', character: '画面', furigana: [{ text: '画', kana: 'が' }, { text: '面', kana: 'めん' }], reading: 'がめん', romaji: 'gamen', translationPt: 'tela', translationEn: 'screen', labelPt: 'Interface', labelEn: 'Interface', tech: 'Angular',
      detailPt: 'A documentação posiciona o Angular na interface do aplicativo, apresentando os fluxos de inspeção, comparação e análise.',
      detailEn: 'The documentation places Angular at the application interface, presenting inspection, comparison, and analysis flows.'
    },
    {
      id: 'desktop', character: '連携', furigana: [{ text: '連', kana: 'れん' }, { text: '携', kana: 'けい' }], reading: 'れんけい', romaji: 'renkei', translationPt: 'integração', translationEn: 'integration', labelPt: 'Aplicativo desktop', labelEn: 'Desktop app', tech: 'Tauri 2',
      detailPt: 'O Tauri conecta a interface aos comandos nativos por IPC tipado; os contratos também descrevem progresso e cancelamento.',
      detailEn: 'Tauri connects the interface to native commands through typed IPC; the contracts also describe progress and cancellation.'
    },
    {
      id: 'engine', character: '比較', furigana: [{ text: '比', kana: 'ひ' }, { text: '較', kana: 'かく' }], reading: 'ひかく', romaji: 'hikaku', translationPt: 'comparação', translationEn: 'comparison', labelPt: 'Motor de comparação', labelEn: 'Comparison engine', tech: 'Rust',
      detailPt: 'O backend Rust separa casos de uso, domínio, introspecção dos esquemas, comparação e geração de scripts SQL.',
      detailEn: 'The Rust backend separates use cases, domain logic, schema introspection, comparison, and SQL script generation.'
    },
    {
      id: 'sources', character: '接続', furigana: [{ text: '接', kana: 'せつ' }, { text: '続', kana: 'ぞく' }], reading: 'せつぞく', romaji: 'setsuzoku', translationPt: 'conexão', translationEn: 'connection', labelPt: 'Origens de dados', labelEn: 'Data sources', tech: 'SQL Server · SQL files',
      detailPt: 'O guia documenta comparação entre bancos conectados e arquivos SQL, mantendo o fluxo de análise no aplicativo desktop.',
      detailEn: 'The user guide documents comparisons between connected databases and SQL files, with the analysis flow kept in the desktop app.'
    }
  ];
  selectedArchitectureIndex = signal(0);
  selectedArchitecture = computed(() => this.architectureLayers[this.selectedArchitectureIndex()]);

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
