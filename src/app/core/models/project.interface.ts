export interface Project {
  id: string;
  title: string;
  description: string;
  descriptionEn?: string;
  problem?: string;
  problemEn?: string;
  role?: string;
  roleEn?: string;
  techStack: string[];
  status: string;
  statusEn?: string;
  demoType?: 'sleuth' | 'forge' | 'link';
  image?: string;
  imageAlt?: string;
  imageAltEn?: string;
  poster?: {
    character: string;
    furigana: { text: string; kana?: string }[];
    reading: string;
    romaji: string;
    meaning: string;
    meaningEn: string;
    translation: string;
    translationEn: string;
    credit: string;
    style: 'quiet' | 'technical' | 'flow' | 'forensic' | 'resilience';
  };
  url?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  highlight?: string;
  highlightEn?: string;
  year?: number;
  featured?: boolean;
  layoutSpan?: 'col-6' | 'col-7' | 'col-5' | 'col-12';
  previewSteps?: ProjectPreviewStep[];
}

export interface ProjectPreviewStep {
  id: string;
  label: string;
  labelEn?: string;
  description: string;
  descriptionEn?: string;
}
