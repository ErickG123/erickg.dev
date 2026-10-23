export interface Project {
  id: string;
  title: string;
  description: string;
  problem?: string;
  role?: string;
  techStack: string[];
  status: string;
  demoType?: 'sleuth' | 'forge' | 'link';
  image?: string;
  url?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  highlight?: string;
  year?: number;
  featured?: boolean;
  layoutSpan?: 'col-6' | 'col-7' | 'col-5' | 'col-12';
}
