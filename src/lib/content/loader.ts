import { parseFrontmatter } from "./frontmatter";
import { renderMarkdown, estimateReadingTime } from "./markdown";
import type { Article, ArticleFAQ, ContentCollection, FaqItem, AuthorProfile } from "./types";
import faqsData from "@/content/faqs";
import authorsData from "@/content/authors";

const rawFiles = import.meta.glob("/src/content/*/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function collectionFromPath(path: string): ContentCollection | null {
  const match = /\/src\/content\/([^/]+)\/[^/]+\.md$/.exec(path);
  const folder = match?.[1];
  const valid: ContentCollection[] = [
    "blog",
    "product-guides",
    "industry-guides",
    "sustainability",
    "buying-guide",
    "comparisons",
  ];
  return valid.includes(folder as ContentCollection) ? (folder as ContentCollection) : null;
}

function slugFromPath(path: string): string {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(/\.md$/, "");
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (typeof value === "string" && value.length) return [value];
  return [];
}

function isPlaceholder(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const v = value.trim().toLowerCase();
  if (!v) return false;
  const patterns = ["[insert", "insert ", "tbd", "to be confirmed", "snacklery-specific", "[snacklery", "[insert publish date"];
  return patterns.some((p) => v.includes(p));
}

function buildArticle(path: string, raw: string): Article | null {
  const collection = collectionFromPath(path);
  const slug = slugFromPath(path);
  if (!collection || slug.startsWith("_")) return null;

  const { data, content } = parseFrontmatter(raw);
  const { html, toc } = renderMarkdown(content);

  const faqs: ArticleFAQ[] = [];
  for (let i = 1; i <= 20; i++) {
    const q = data[`faq_${i}_q`];
    const a = data[`faq_${i}_a`];
    if (typeof q === "string" && typeof a === "string" && q && a) {
      faqs.push({ question: q, answer: a });
    }
  }

  return {
    slug,
    collection,
    title: (data.title as string) || slug,
    description: (data.description as string) || "",
    author: (data.author as string) || "Snacklery Team",
    date: !isPlaceholder(data.date) ? ((data.date as string) || new Date().toISOString().slice(0, 10)) : new Date().toISOString().slice(0, 10),
    updated: !isPlaceholder(data.updated) ? ((data.updated as string) || undefined) : undefined,
    readingTime: data.readingTime ? Number(data.readingTime) : estimateReadingTime(content),
    keywords: toArray(data.keywords).filter((k) => !isPlaceholder(k)),
    category: (data.category as string) || "General",
    tags: toArray(data.tags).filter((t) => !isPlaceholder(t)),
    heroImage: (data.heroImage as string) || undefined,
    heroImageAlt: (data.heroImageAlt as string) || (data.title as string) || "",
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    faqs,
    relatedSlugs: toArray(data.relatedSlugs),
    content,
    html,
    toc,
  };
}

const allArticles: Article[] = Object.entries(rawFiles)
  .map(([path, raw]) => buildArticle(path, raw))
  .filter((a): a is Article => a !== null)
  .filter((a) => !a.draft || import.meta.env.DEV)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getArticles(collection: ContentCollection): Article[] {
  return allArticles.filter((a) => a.collection === collection);
}

export function getArticleBySlug(collection: ContentCollection, slug: string): Article | undefined {
  return allArticles.find((a) => a.collection === collection && a.slug === slug);
}

export function getAllArticles(): Article[] {
  return allArticles;
}

export function getFeaturedArticles(collection?: ContentCollection, limit = 3): Article[] {
  const pool = collection ? getArticles(collection) : allArticles;
  const featured = pool.filter((a) => a.featured);
  const list = featured.length ? featured : pool;
  return list.slice(0, limit);
}

export function getCategories(collection: ContentCollection): string[] {
  return Array.from(new Set(getArticles(collection).map((a) => a.category))).sort();
}

export function getTags(collection: ContentCollection): string[] {
  return Array.from(new Set(getArticles(collection).flatMap((a) => a.tags))).sort();
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  if (article.relatedSlugs.length) {
    const explicit = article.relatedSlugs
      .map((slug) => allArticles.find((a) => a.slug === slug))
      .filter((a): a is Article => Boolean(a));
    if (explicit.length) return explicit.slice(0, limit);
  }

  const sameCollection = getArticles(article.collection).filter((a) => a.slug !== article.slug);

  const scored = sameCollection
    .map((candidate) => {
      const tagOverlap = candidate.tags.filter((t) => article.tags.includes(t)).length;
      const sameCategory = candidate.category === article.category ? 1 : 0;
      return { candidate, score: tagOverlap * 2 + sameCategory };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.candidate);
}

export function searchArticles(query: string, collection?: ContentCollection): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const pool = collection ? getArticles(collection) : allArticles;
  return pool.filter((a) => {
    const haystack = [a.title, a.description, a.category, ...a.tags, ...a.keywords]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getFaqs(): FaqItem[] {
  return faqsData;
}

export function getFaqCategories(): string[] {
  return Array.from(new Set(getFaqs().map((f) => f.category)));
}

export function searchFaqs(query: string): FaqItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return getFaqs();
  return getFaqs().filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
}

export function getAuthor(name: string): AuthorProfile | undefined {
  return authorsData.find((a) => a.name === name);
}

export function getAuthorByName(name: string): AuthorProfile | undefined {
  return getAuthor(name);
}
