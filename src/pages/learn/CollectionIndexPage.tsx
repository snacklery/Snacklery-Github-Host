import { useMemo, useState } from "react";
import SEO from "@/components/SEO";
import LearnBreadcrumbs from "@/components/learn/LearnBreadcrumbs";
import ArticleCard from "@/components/learn/ArticleCard";
import SearchBar from "@/components/learn/SearchBar";
import FilterPills from "@/components/learn/FilterPills";
import LearnPagination from "@/components/learn/LearnPagination";
import EmptyState from "@/components/learn/EmptyState";
import { getArticles, getCategories, getTags, getFeaturedArticles } from "@/lib/content/loader";
import { collectionMeta, collectionBasePath } from "@/lib/content/paths";
import { breadcrumbSchema } from "@/lib/seo/schema";
import type { ContentCollection } from "@/lib/content/types";

const PAGE_SIZE = 6;

const CollectionIndexPage = ({ collection }: { collection: ContentCollection }) => {
  const meta = collectionMeta[collection];
  const basePath = collectionBasePath(collection);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const all = getArticles(collection);
  const categories = getCategories(collection);
  const tags = getTags(collection);
  const featured = collection === "blog" ? getFeaturedArticles(collection, 3) : [];

  const filtered = useMemo(() => {
    return all.filter((a) => {
      const matchesQuery = query
        ? [a.title, a.description, a.category, ...a.tags].join(" ").toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesCategory = category ? a.category === category : true;
      const matchesTag = tag ? a.tags.includes(tag) : true;
      return matchesQuery && matchesCategory && matchesTag;
    });
  }, [all, query, category, tag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <>
      <SEO
        title={meta.seoTitle}
        description={meta.seoDescription}
        path={basePath}
        schema={breadcrumbSchema([
          { name: "Learn", path: "/learn" },
          { name: meta.title, path: basePath },
        ])}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LearnBreadcrumbs items={[{ name: "Learn", path: "/learn" }, { name: meta.title, path: basePath }]} />

        <header className="max-w-3xl mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">{meta.kicker}</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">{meta.title}</h1>
          <p className="text-muted-foreground text-lg">{meta.description}</p>
        </header>

        {featured.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Featured</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {all.length > 0 && (
          <div className="grid lg:grid-cols-[280px_1fr] gap-10">
            <aside>
              <div className="mb-6">
                <SearchBar
                  value={query}
                  onChange={(v) => {
                    setQuery(v);
                    resetPage();
                  }}
                  placeholder={`Search ${meta.title.toLowerCase()}…`}
                />
              </div>
              <FilterPills
                label="Category"
                options={categories}
                selected={category}
                onSelect={(v) => {
                  setCategory(v);
                  resetPage();
                }}
              />
              <FilterPills
                label="Tags"
                options={tags}
                selected={tag}
                onSelect={(v) => {
                  setTag(v);
                  resetPage();
                }}
              />
            </aside>

            <div>
              {paged.length ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {paged.map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                  <LearnPagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
              ) : (
                <EmptyState message="No results match your filters. Try clearing search or filters." />
              )}
            </div>
          </div>
        )}

        {all.length === 0 && <EmptyState />}
      </div>
    </>
  );
};

export default CollectionIndexPage;
