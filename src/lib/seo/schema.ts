import type { Article, FaqItem } from "@/lib/content/types";

export const SITE_URL = "https://snacklery.com";
export const SITE_NAME = "Snacklery";
export const DEFAULT_OG_IMAGE = "/images/snacklery-logo.jpeg";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    sameAs: [
      "https://facebook.com/snacklery",
      "https://twitter.com/snacklery",
      "https://instagram.com/snacklery",
      "https://linkedin.com/company/snacklery",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/learn/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.heroImage ? `${SITE_URL}${article.heroImage}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/learn/${article.collection}/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
  };
}

export function faqPageSchema(faqs: FaqItem[] | { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function productSchema(opts: { name: string; description: string; image?: string; category?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image ? `${SITE_URL}${opts.image}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    category: opts.category,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  };
}
