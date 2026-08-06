import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import LearnBreadcrumbs from "@/components/learn/LearnBreadcrumbs";
import ArticleCard from "@/components/learn/ArticleCard";
import EmptyState from "@/components/learn/EmptyState";
import { getArticles } from "@/lib/content/loader";
import { collectionBasePath, collectionMeta } from "@/lib/content/paths";
import { breadcrumbSchema } from "@/lib/seo/schema";
import type { ContentCollection } from "@/lib/content/types";

const guideCollections: ContentCollection[] = [
  "product-guides",
  "industry-guides",
  "buying-guide",
  "comparisons",
  "sustainability",
];

const GuidesDirectory = () => {
  return (
    <>
      <SEO
        title="All Guides — Edible Cutlery & Sustainable Dining"
        description="Browse every Snacklery guide: product guides, industry playbooks, buying guidance, comparisons, and sustainability resources."
        path="/learn/guides"
        schema={breadcrumbSchema([
          { name: "Learn", path: "/learn" },
          { name: "Guides", path: "/learn/guides" },
        ])}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LearnBreadcrumbs items={[{ name: "Learn", path: "/learn" }, { name: "Guides", path: "/learn/guides" }]} />

        <header className="max-w-3xl mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Guides</p>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-3">All guides</h1>
          <p className="text-muted-foreground text-lg">
            Every guide Snacklery publishes, organized by topic — product deep dives, industry playbooks,
            buying guidance, comparisons, and sustainability resources.
          </p>
        </header>

        <div className="space-y-14">
          {guideCollections.map((collection) => {
            const meta = collectionMeta[collection];
            const articles = getArticles(collection).slice(0, 3);
            return (
              <section key={collection}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground">{meta.title}</h2>
                    <p className="text-sm text-muted-foreground">{meta.description}</p>
                  </div>
                  <Link
                    to={collectionBasePath(collection)}
                    className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-smooth shrink-0"
                  >
                    View all <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                {articles.length ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((a) => (
                      <ArticleCard key={a.slug} article={a} />
                    ))}
                  </div>
                ) : (
                  <EmptyState message={`${meta.title} guides are coming soon.`} />
                )}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GuidesDirectory;
