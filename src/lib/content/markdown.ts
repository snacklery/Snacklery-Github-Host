import { Marked } from "marked";
import type { TocEntry } from "./types";

const editorialSectionTitles = [
  "internal linking suggestions",
  "suggested images",
  "suggested images / infographics",
  "json-ld schema recommendation",
  "seo title",
  "meta description",
  "url slug",
  "primary keyword",
  "secondary keywords",
];

function sanitizeEditorialNotes(line: string): string {
  return line
    .replace(/\*\*\[Snacklery-specific information[^\]]*\]\*\*/gi, "")
    .replace(/\[Snacklery-specific information[^\]]*\]/gi, "")
    .replace(/^>\s*Primary CTA:\s*/i, "")
    .replace(/^>\s*Secondary CTA:\s*/i, "")
    .replace(/Primary CTA:\s*/i, "")
    .replace(/Secondary CTA:\s*/i, "")
    .replace(/\s{2,}/g, " ")
    .trimEnd();
}

function normalizeHeadingText(text: string): string {
  return text.replace(/^H[1-6]:\s*/i, "").trim().toLowerCase();
}

function cleanMarkdown(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const cleaned: string[] = [];
  let skipSectionLevel: number | null = null;
  let firstHeadingProcessed = false;

  for (const rawLine of lines) {
    let line = rawLine;
    const headingMatch = line.match(/^(#{1,6})\s*(.*)$/);

    if (headingMatch) {
      const depth = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const normalized = normalizeHeadingText(text);

      if (!firstHeadingProcessed && depth <= 2 && /^h[1-6]:/i.test(text)) {
        firstHeadingProcessed = true;
        continue;
      }
      firstHeadingProcessed = firstHeadingProcessed || depth <= 2;

      if (skipSectionLevel !== null && depth <= skipSectionLevel) {
        skipSectionLevel = null;
      }

      if (skipSectionLevel === null && editorialSectionTitles.some((title) => normalized.startsWith(title))) {
        skipSectionLevel = depth;
        continue;
      }
    }

    if (skipSectionLevel !== null) {
      const skipHeadingMatch = line.match(/^(#{1,6})\s*/);
      if (skipHeadingMatch && skipHeadingMatch[1].length <= skipSectionLevel) {
        skipSectionLevel = null;
      }
    }
    if (skipSectionLevel !== null) {
      continue;
    }

    line = sanitizeEditorialNotes(line);
    cleaned.push(line);
  }

  return cleaned.join("\n");
}

function wrapSection(html: string, headingPattern: RegExp, wrapperClass: string): string {
  return html.replace(
    new RegExp(`(<h[1-6][^>]*>\\s*${headingPattern.source}\\s*</h[1-6]>)([\\s\\S]*?)(?=<h[1-6][^>]*>|$)`, "gi"),
    `<div class="${wrapperClass}">$1$2</div>`,
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function renderMarkdown(markdown: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  const seenSlugs = new Map<string, number>();
  const cleanedMarkdown = cleanMarkdown(markdown);

  const marked = new Marked({
    gfm: true,
    breaks: false,
  });

  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = tokens.map((t) => ("raw" in t ? t.raw : "")).join("");
        if (depth !== 2 && depth !== 3) {
          return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>`;
        }

        let slug = slugify(text);
        const count = seenSlugs.get(slug) ?? 0;
        seenSlugs.set(slug, count + 1);
        if (count > 0) slug = `${slug}-${count}`;

        toc.push({ id: slug, text, level: depth as 2 | 3 });

        return `<h${depth} id="${slug}" class="scroll-mt-28 group">
          <a href="#${slug}" class="no-underline hover:text-primary transition-smooth">${this.parser.parseInline(tokens)}</a>
        </h${depth}>`;
      },
    },
  });

  let html = marked.parse(cleanedMarkdown, { async: false }) as string;
  html = wrapSection(html, /executive summary/i, "article-card article-card-info");
  html = wrapSection(html, /procurement checklist|decision checklist/i, "article-card article-card-checklist");
  html = wrapSection(html, /common mistake(s)?/i, "article-card article-card-warning");
  html = wrapSection(html, /business benefit(s)?/i, "article-card article-card-highlight");
  html = wrapSection(html, /call-to-action/i, "article-cta-card");

  return { html, toc };
}

export function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
