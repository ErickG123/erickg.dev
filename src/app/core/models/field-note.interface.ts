export interface FieldNoteDetail {
  id: string;
  noteNumber: string;
  date: string;
  category: string;
  title: string;
  synopsis: string;
  readTime: string;
  context: string;
  analysis: string;
  tradeoffs: string[];
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  conclusion: string;
  editorNote?: string;
}
