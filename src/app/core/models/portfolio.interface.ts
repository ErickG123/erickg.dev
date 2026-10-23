export interface AuthorProfile {
  name: string;
  alias: string;
  role: string;
  headline: string;
  bio: string;
  journeySummary: string;
  location: string;
  careerPeriod: string;
  avatarUrl?: string;
  skills: { category: string; items: string[] }[];
  socialLinks: { name: string; url: string; iconLabel: string }[];
  pendingNotes?: string;
}

export interface HeroContent {
  authorName: string;
  authorRole: string;
  volumeId: string;
  chapterId: string;
  tagline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  scrollHintText: string;
  illustration: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface ChapterNav {
  num: string;
  id: string;
  anchor: string;
  title: string;
  subtitle: string;
  pagesCount: string;
}

export interface MethodPillar {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  principles: string[];
}

export interface FieldNote {
  id: string;
  date: string;
  category: string;
  title: string;
  synopsis: string;
  readTime: string;
  linkText: string;
}
