export interface CaseStudySection {
  title: string;
  subtitle?: string;
  content: string;
  bulletPoints?: string[];
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  highlightBox?: {
    title: string;
    text: string;
    type: 'technical' | 'vermilion' | 'note';
  };
}

export interface CaseStudy {
  id: string;
  projectId: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  heroIllustration: string;
  githubUrl?: string;
  demoUrl?: string;
  statusBadge: string;
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
