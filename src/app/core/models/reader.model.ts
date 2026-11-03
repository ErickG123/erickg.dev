export type ReadingMode = 'editorial' | 'immersive';

export type ChapterSectionId =
  | 'cover'
  | 'index-section'
  | 'projects'
  | 'method'
  | 'notes'
  | 'about'
  | 'contact';

export interface SectionPageMapping {
  sectionId: ChapterSectionId;
  pageIndex: number;
  chapterNumber: string;
  title: string;
}

export interface ReaderPage {
  index: number;
  chapterNumber: string;
  title: string;
  type: 'cover' | 'index' | 'projects-1' | 'projects-2' | 'method' | 'notes' | 'about' | 'contact';
}
