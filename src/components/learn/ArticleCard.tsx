import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Article } from "@/lib/content/types";
import { collectionBasePath } from "@/lib/content/paths";

const ArticleCard = ({ article }: { article: Article }) => {
  const href = `${collectionBasePath(article.collection)}/${article.slug}`;

  return (
    <Card className="group overflow-hidden border-border hover:shadow-medium transition-smooth h-full flex flex-col">
      <Link to={href} className="flex flex-col h-full">
        {article.heroImage ? (
          <div className="aspect-[16/9] overflow-hidden bg-muted">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] gradient-sustainable flex items-center justify-center">
            <span className="font-serif text-2xl text-foreground/40">Snacklery</span>
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {article.readingTime} min read
            </span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {article.description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            Read more
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-smooth" />
          </span>
        </div>
      </Link>
    </Card>
  );
};

export default ArticleCard;
