export const CATEGORIES = [
  'Classic Algorithms',
  'Python Idiomatic Patterns',
  'Functional Programming Gems',
  'Unix Shell & Pipeline Philosophy',
  'JavaScript & TypeScript Patterns',
  'Mathematical Elegance in Code',
  'Data Structure Design Moments',
  'Recursion & Self-Reference',
  'Language Design Insights',
  'Compression & Encoding Tricks',
  'Beautiful API Design',
  'Concurrency Made Simple',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface CuratedExample {
  id: string;
  title: string;
  language: string;
  category: Category;
  conceptTags: string[];
  code: string;
  explanation: string;
  whyElegant: string;
  keyInsight: string;
  analogy: string;
  sourceNote: string;
}
