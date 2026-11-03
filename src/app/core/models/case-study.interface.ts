export interface CaseStudySection {
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  content: string;
  contentEn?: string;
  bulletPoints?: string[];
  bulletPointsEn?: string[];
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
    captionEn?: string;
  };
  highlightBox?: {
    title: string;
    titleEn?: string;
    text: string;
    textEn?: string;
    type: 'technical' | 'vermilion' | 'note';
  };
}

export interface CaseStudy {
  id: string;
  projectId: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  subtitleEn?: string;
  category: string;
  categoryEn?: string;
  date: string;
  author: string;
  readTime: string;
  heroIllustration: string;
  githubUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  statusBadge: string;
  statusBadgeEn?: string;
  techStack: string[];

  // Os 9 tópicos obrigatórios do estudo de caso
  context: CaseStudySection;
  problem: CaseStudySection;
  constraints: CaseStudySection;
  alternativesConsidered: CaseStudySection;
  architectureDecisions: CaseStudySection;
  implementation: CaseStudySection;
  testingAndValidation: CaseStudySection;
  provenResults: CaseStudySection;
  learningsAndNextSteps: CaseStudySection;
}
