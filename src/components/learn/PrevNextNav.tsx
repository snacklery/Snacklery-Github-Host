import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/content/types";
import { collectionBasePath } from "@/lib/content/paths";

const PrevNextNav = ({ prev, next }: { prev?: Article; next?: Article }) => {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {prev ? (
        <Link
          to={`${collectionBasePath(prev.collection)}/${prev.slug}`}
          className="rounded-xl border border-border p-4 hover:border-primary/50 transition-smooth"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <ArrowLeft className="h-4 w-4" />
            Previous
          </div>
          <div className="font-semibold text-foreground">{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={`${collectionBasePath(next.collection)}/${next.slug}`}
          className="rounded-xl border border-border p-4 hover:border-primary/50 transition-smooth text-right"
        >
          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
            <ArrowRight className="h-4 w-4" />
            Next
          </div>
          <div className="font-semibold text-foreground">{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PrevNextNav;
