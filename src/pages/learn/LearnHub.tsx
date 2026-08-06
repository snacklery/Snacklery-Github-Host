import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, HelpCircle, Leaf, ShoppingCart, Scale, Building2, Newspaper } from "lucide-react";
import SEO from "@/components/SEO";
import LearnBreadcrumbs from "@/components/learn/LearnBreadcrumbs";
import ArticleCard from "@/components/learn/ArticleCard";
import { getFeaturedArticles } from "@/lib/content/loader";
import { collectionBasePath, collectionMeta } from "@/lib/content/paths";
import { breadcrumbSchema, websiteSchema, organizationSchema } from "@/lib/seo/schema";
import { Card } from "@/components/ui/card";

const sections = [
  { collection: "product-guides" as const, icon: BookOpen, path: "/learn/product-guides" },
  { collection: "industry-guides" as const, icon: Building2, path: "/learn/industry-guides" },
  { collection: "sustainability" as const, icon: Leaf, path: "/learn/sustainability" },
  { collection: "buying-guide" as const, icon: ShoppingCart, path: "/learn/buying-guide" },
  { collection: "comparisons" as const, icon: Scale, path: "/learn/comparisons" },
  { collection: "blog" as const, icon: Newspaper, path: "/learn/blog" },
];

const LearnHub = () => {
  const latestBlog = getFeaturedArticles("blog", 3);

  return (
    <>
      <SEO
        title="Learn — Edible Cutlery & Sustainable Dining Hub"
        description="Your complete resource for edible cutlery, plastic-free dining, and sustainable foodservice — guides, comparisons, FAQs, and research."
        path="/learn"
        schema={[breadcrumbSchema([{ name: "Learn", path: "/learn" }]), websiteSchema(), organizationSchema()]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LearnBreadcrumbs items={[{ name: "Learn", path: "/learn" }]} />

        <header className="max-w-3xl mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Learn</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            The edible cutlery &amp; sustainable dining hub
          </h1>
          <p className="text-muted-foreground text-lg">
            Guides, comparisons, industry playbooks, and answers — everything you need to understand and
            adopt edible cutlery, in one place.
          </p>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sections.map(({ collection, icon: Icon, path }) => {
            const meta = collectionMeta[collection];
            return (
              <Link key={collection} to={path}>
                <Card className="h-full p-6 border-border hover:border-primary/40 hover:shadow-medium transition-smooth group">
                  <div className="h-11 w-11 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-smooth">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-foreground mb-2">{meta.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{meta.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-smooth" />
                  </span>
                </Card>
              </Link>
            );
          })}

          <Link to="/learn/faq">
            <Card className="h-full p-6 border-border hover:border-primary/40 hover:shadow-medium transition-smooth group bg-accent/40">
              <div className="h-11 w-11 rounded-lg bg-background flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-smooth">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-2">FAQ</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Quick answers to the questions we hear most often.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Browse FAQs
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-smooth" />
              </span>
            </Card>
          </Link>
        </section>

        {latestBlog.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-foreground">From the blog</h2>
              <Link
                to={collectionBasePath("blog")}
                className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-smooth"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestBlog.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default LearnHub;
