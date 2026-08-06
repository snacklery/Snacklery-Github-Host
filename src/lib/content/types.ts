export type ContentCollection =
  | "blog"
  | "product-guides"
  | "industry-guides"
  | "sustainability"
  | "buying-guide"
  | "comparisons";

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  collection: ContentCollection;
  title: string;
  description: string;
  author: string;
  date: string;
  updated?: string;
  readingTime: number;
  keywords: string[];
  category: string;
  tags: string[];
  heroImage?: string;
  heroImageAlt?: string;
  featured?: boolean;
  draft?: boolean;
  faqs: ArticleFAQ[];
  relatedSlugs: string[];
  content: string;
  html: string;
  toc: TocEntry[];
}

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface AuthorProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
}
