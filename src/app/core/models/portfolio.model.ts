export interface AuthorProfile {
  name: string;
  alias: string;
  role: string;
  roleEn?: string;
  headline: string;
  headlineEn?: string;
  bio: string;
  bioEn?: string;
  journeySummary: string;
  journeySummaryEn?: string;
  currentFocus: string;
  currentFocusEn?: string;
  contactIntro: string;
  contactIntroEn: string;
  location: string;
  careerPeriod: string;
  careerPeriodEn?: string;
  avatarUrl?: string;
  skills: { category: string; categoryEn?: string; description: string; descriptionEn?: string; mark: string; items: string[]; itemsEn?: string[] }[];
  socialLinks: { name: string; url: string; iconLabel: string }[];
  pendingNotes?: string;
  pendingNotesEn?: string;
}

export interface CareerEntry {
  period: string;
  periodEn?: string;
  title: string;
  titleEn?: string;
  company: string;
  companyEn?: string;
  summary: string;
  summaryEn?: string;
  technologies: string[];
  technologiesEn?: string[];
}

export interface HeroContent {
  authorName: string;
  authorRole: string;
  volumeId: string;
  volumeIdEn?: string;
  chapterId: string;
  chapterIdEn?: string;
  tagline: string;
  taglineEn?: string;
  description: string;
  descriptionEn?: string;
  primaryCtaText: string;
  primaryCtaTextEn?: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaTextEn?: string;
  secondaryCtaLink: string;
  scrollHintText: string;
  illustration: {
    src: string;
    alt: string;
    altEn?: string;
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
