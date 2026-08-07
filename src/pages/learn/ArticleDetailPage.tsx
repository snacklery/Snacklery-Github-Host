import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Clock, Calendar } from "lucide-react";
import SEO from "@/components/SEO";
import LearnBreadcrumbs from "@/components/learn/LearnBreadcrumbs";
import TableOfContents from "@/components/learn/TableOfContents";
import AuthorCard from "@/components/learn/AuthorCard";
import ShareButtons from "@/components/learn/ShareButtons";
import RelatedArticles from "@/components/learn/RelatedArticles";
import PrevNextNav from "@/components/learn/PrevNextNav";
import FaqAccordion from "@/components/learn/FaqAccordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getArticleBySlug, getArticles, getRelatedArticles } from "@/lib/content/loader";
import { collectionBasePath, collectionMeta } from "@/lib/content/paths";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/seo/schema";
import type { ContentCollection } from "@/lib/content/types";

const ArticleDetailPage = ({ collection }: { collection: ContentCollection }) => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(collection, slug) : undefined;

  if (!article) return <Navigate to="/learn" replace />;

  const meta = collectionMeta[collection];
  const basePath = collectionBasePath(collection);
  const path = `${basePath}/${article.slug}`;

  const siblings = getArticles(collection);
  const currentIndex = siblings.findIndex((a) => a.slug === article.slug);
  const prev = currentIndex > 0 ? siblings[currentIndex - 1] : undefined;
  const next = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : undefined;

  const related = getRelatedArticles(article, 3);

  const schemas: object[] = [
    articleSchema(article),
    breadcrumbSchema([
      { name: "Learn", path: "/learn" },
      { name: meta.title, path: basePath },
      { name: article.title, path },
    ]),
  ];
  if (article.faqs.length) schemas.push(faqPageSchema(article.faqs));

  useEffect(() => {
    const key = `checklist:${article.collection}:${article.slug}`;
    const checkboxes = Array.from(document.querySelectorAll<HTMLLabelElement | HTMLInputElement>(
      ".article-card-checklist input[type=checkbox]",
    ));
    if (!checkboxes.length) return;

    try {
      const raw = localStorage.getItem(key);
      const saved = raw ? JSON.parse(raw) : {};

      checkboxes.forEach((el, idx) => {
        const input = el as HTMLInputElement;
        const savedVal = Boolean(saved[idx]);
        input.checked = savedVal;
        const handler = () => {
          const state: Record<number, boolean> = {};
          checkboxes.forEach((cb, i) => (state[i] = (cb as HTMLInputElement).checked));
          localStorage.setItem(key, JSON.stringify(state));
        };
        input.addEventListener("change", handler);
        (input as any)._snacklery_handler = handler;
      });
    } catch (e) {
      // ignore storage errors
    }

    return () => {
      const checkboxesCleanup = Array.from(document.querySelectorAll<HTMLInputElement>(
        ".article-card-checklist input[type=checkbox]",
      ));
      checkboxesCleanup.forEach((input: any) => {
        const h = input._snacklery_handler;
        if (h) input.removeEventListener("change", h);
      });
    };
  }, [article.collection, article.slug]);

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        path={path}
        image={article.heroImage}
        type="article"
        schema={schemas}
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LearnBreadcrumbs
          items={[
            { name: "Learn", path: "/learn" },
            { name: meta.title, path: basePath },
            { name: article.title, path },
          ]}
        />

        <section className="overflow-hidden rounded-[2rem] border border-border bg-card/95 p-8 shadow-soft mb-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 inline-flex uppercase tracking-[0.28em] text-xs font-semibold">
                {article.category}
              </Badge>
              <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-muted-foreground">{article.description}</p>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-4 py-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.updated || article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-4 py-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readingTime} min read</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 min-w-[220px]">
              <ShareButtons path={path} title={article.title} />
              <AuthorCard authorName={article.author} />
            </div>
          </div>

          {article.heroImage && (
            <div className="mt-10 overflow-hidden rounded-[1.5rem] bg-muted shadow-soft">
              <img
                src={article.heroImage}
                alt={article.heroImageAlt || article.title}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          )}
          {!article.heroImage && (
            <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-dashed border-border bg-card/60 p-12 text-center">
              <div className="mx-auto max-w-2xl">
                <div className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Hero image</div>
                <div className="text-2xl font-semibold mb-2">No hero image provided</div>
                <p className="text-sm text-muted-foreground">Add a high-resolution hero image for best presentation. Suggested: product in-use or industry context.</p>
              </div>
            </div>
          )}
        </section>

        <div className="grid gap-12 xl:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <div
              className="prose prose-lg prose-neutral max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline prose-a:font-semibold prose-ul:list-disc prose-ol:list-decimal prose-img:rounded-3xl prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:bg-primary/5 prose-blockquote:px-6 prose-blockquote:py-4"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />

            {/* Persist checklist state for interactive procurement checklists */}
            <script
              // This script is intentionally injected as text for progressive enhancement; React will run a hydration effect below to wire checkboxes.
              dangerouslySetInnerHTML={{
                __html: `// Checklist persistence placeholder - enhanced by client
                  `,
              }}
            />

            <div className="rounded-[1.75rem] border border-border bg-background p-6 shadow-soft">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Ready to make it happen?</p>
                  <h2 className="mt-4 text-2xl font-semibold text-foreground">Transform operational sustainability with a custom sample and quote.</h2>
                </div>
                <Button asChild variant="hero" size="xl" className="w-full md:w-auto">
                  <Link to="/business">Request a sample & quote</Link>
                </Button>
              </div>
            </div>

            <PrevNextNav prev={prev} next={next} />

            <RelatedArticles articles={related} />

            {article.faqs.length > 0 && (
              <section className="mt-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Frequently asked questions</h2>
                <FaqAccordion
                  faqs={article.faqs.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))}
                />
              </section>
            )}

            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <TableOfContents toc={article.toc} />
        </div>
      </article>
    </>
  );
};

export default ArticleDetailPage;
