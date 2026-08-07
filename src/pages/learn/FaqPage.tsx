import { useMemo, useState } from "react";
import SEO from "@/components/SEO";
import LearnBreadcrumbs from "@/components/learn/LearnBreadcrumbs";
import SearchBar from "@/components/learn/SearchBar";
import FilterPills from "@/components/learn/FilterPills";
import FaqAccordion from "@/components/learn/FaqAccordion";
import { getFaqs, getFaqCategories } from "@/lib/content/loader";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo/schema";

const categories = [
  "Basics & Definitions",
  "Ingredients & Manufacturing",
  "Safety, Allergens & Food Handling",
  "Performance & Durability",
  "Storage & Shelf Life",
  "Sustainability & Environmental Impact",
  "Comparisons with Other Cutlery",
  "Ordering & Business",
  "Industry-Specific Questions",
  "Product Formats",
  "Health & Dietary Questions",
  "Environmental & Regulatory Questions",
  "Quality & Troubleshooting",
  "Export & International Shipping",
  "Samples & Pilot Programs",
] as const;

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const FaqPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const allFaqs = getFaqs();
  const categoryOptions = getFaqCategories();

  const filtered = useMemo(() => {
    return allFaqs.filter((f) => {
      const matchesQuery = query ? (f.question + " " + f.answer).toLowerCase().includes(query.toLowerCase()) : true;
      const matchesCategory = category ? f.category === category : true;
      return matchesQuery && matchesCategory;
    });
  }, [allFaqs, query, category]);

  const groupedFaqs = useMemo(() => {
    return categories
      .map((name) => ({
        name,
        faqs: filtered.filter((faq) => faq.category === name),
      }))
      .filter((group) => group.faqs.length > 0);
  }, [filtered]);

  return (
    <>
      <SEO
        title="Edible Cutlery FAQ: 50+ Answered Questions | Snacklery"
        description="Answers to the most common questions about edible cutlery — what it's made from, safety, performance, storage, sustainability, and ordering — from Snacklery."
        path="/learn/faq"
        schema={[
          breadcrumbSchema([
            { name: "Learn", path: "/learn" },
            { name: "FAQ", path: "/learn/faq" },
          ]),
          faqPageSchema(allFaqs),
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LearnBreadcrumbs items={[{ name: "Learn", path: "/learn" }, { name: "FAQ", path: "/learn/faq" }]} />

        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">FAQ</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">Edible Cutlery FAQ</h1>
          <p className="text-muted-foreground text-lg">
            Practical answers to the most common questions about edible cutlery — from what it is and how it is made to ordering, safety, storage, sustainability, and comparisons.
          </p>
        </header>

        <div className="mb-8 rounded-[1.5rem] border border-border bg-card/70 p-5 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">Jump to a category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((categoryName) => (
              <a
                key={categoryName}
                href={`#${slugify(categoryName)}`}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
              >
                {categoryName}
              </a>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <SearchBar value={query} onChange={setQuery} placeholder="Search FAQs…" />
        </div>

        <FilterPills label="Category" options={categoryOptions} selected={category} onSelect={setCategory} />

        <div className="mt-8 space-y-10">
          {groupedFaqs.length > 0 ? (
            groupedFaqs.map((group) => (
              <section key={group.name} id={slugify(group.name)} className="rounded-[1.5rem] border border-border bg-background p-6 shadow-soft">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{group.name}</h2>
                <FaqAccordion faqs={group.faqs} query={query} />
              </section>
            ))
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground">
              No questions matched your search. Try another keyword or clear the filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FaqPage;
