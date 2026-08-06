import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/content/types";
import { collectionBasePath } from "@/lib/content/paths";

const RelatedArticles = ({ articles }: { articles: Article[] }) => {
  if (!articles.length) return null;

  return (
    <section className="mt-12" aria-labelledby="related-articles-heading">
      <h2 id="related-articles-heading" className="font-serif text-2xl font-semibold text-foreground mb-6">
        Related guides
      </h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => {
          const href = `${collectionBasePath(article.collection)}/${article.slug}`;
          return (
            <Link
              key={article.slug}
              to={href}
              className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-smooth"
            >
              <div className="text-sm font-medium text-primary mb-2">{article.category}</div>
              <h3 className="font-semibold text-foreground mb-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
              <div className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read article
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedArticles;
