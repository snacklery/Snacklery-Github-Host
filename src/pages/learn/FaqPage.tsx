import { useMemo, useState } from "react";
import SEO from "@/components/SEO";
import LearnBreadcrumbs from "@/components/learn/LearnBreadcrumbs";
import SearchBar from "@/components/learn/SearchBar";
import FilterPills from "@/components/learn/FilterPills";
import FaqAccordion from "@/components/learn/FaqAccordion";
import { getFaqs, getFaqCategories } from "@/lib/content/loader";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo/schema";

const FaqPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const allFaqs = getFaqs();
  const categories = getFaqCategories();

  const filtered = useMemo(() => {
    return allFaqs.filter((f) => {
      const matchesQuery = query ? (f.question + " " + f.answer).toLowerCase().includes(query.toLowerCase()) : true;
      const matchesCategory = category ? f.category === category : true;
      return matchesQuery && matchesCategory;
    });
  }, [allFaqs, query, category]);

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about edible cutlery, ordering, safety, shelf life, and sustainability."
        path="/learn/faq"
        schema={[
          breadcrumbSchema([
            { name: "Learn", path: "/learn" },
            { name: "FAQ", path: "/learn/faq" },
          ]),
          faqPageSchema(allFaqs),
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LearnBreadcrumbs items={[{ name: "Learn", path: "/learn" }, { name: "FAQ", path: "/learn/faq" }]} />

        <header className="mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">FAQ</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about edible cutlery, ordering, and sustainability.
          </p>
        </header>

        <div className="mb-6">
          <SearchBar value={query} onChange={setQuery} placeholder="Search FAQs…" />
        </div>

        <FilterPills label="Category" options={categories} selected={category} onSelect={setCategory} />

        <div className="mt-6">
          <FaqAccordion faqs={filtered} query={query} />
        </div>
      </div>
    </>
  );
};

export default FaqPage;
