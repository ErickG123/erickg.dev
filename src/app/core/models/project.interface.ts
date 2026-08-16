export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoType?: 'sleuth' | 'forge' | 'link';
  url?: string;
  status: string;
}
