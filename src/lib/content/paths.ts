import type { ContentCollection } from "@/lib/content/types";

export function collectionBasePath(collection: ContentCollection): string {
  switch (collection) {
    case "blog":
      return "/learn/blog";
    case "product-guides":
      return "/learn/product-guides";
    case "industry-guides":
      return "/learn/industry-guides";
    case "sustainability":
      return "/learn/sustainability";
    case "buying-guide":
      return "/learn/buying-guide";
    case "comparisons":
      return "/learn/comparisons";
  }
}

export const collectionLabels: Record<ContentCollection, string> = {
  blog: "Blog",
  "product-guides": "Product Guides",
  "industry-guides": "Industry Guides",
  sustainability: "Sustainability",
  "buying-guide": "Buying Guide",
  comparisons: "Comparisons",
};

export interface CollectionMeta {
  title: string;
  kicker: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export const collectionMeta: Record<ContentCollection, CollectionMeta> = {
  blog: {
    title: "Blog",
    kicker: "Sustainable Dining Blog",
    description: "Ideas, research, and stories on edible cutlery and plastic-free dining.",
    seoTitle: "Sustainable Dining Blog",
    seoDescription: "Read the latest articles on edible cutlery, plastic-free dining, and sustainable foodservice from the Snacklery team.",
  },
  "product-guides": {
    title: "Product Guides",
    kicker: "Product Guides",
    description: "In-depth guides to every edible cutlery product Snacklery makes.",
    seoTitle: "Edible Cutlery Product Guides",
    seoDescription: "Detailed guides to edible spoons, forks, stirrers, straws, and cutlery — how they're made, how to use them, and where they fit.",
  },
  "industry-guides": {
    title: "Industry Guides",
    kicker: "Industry Guides",
    description: "How edible cutlery fits hotels, airlines, restaurants, events, and more.",
    seoTitle: "Edible Cutlery Guides by Industry",
    seoDescription: "Industry-specific guides to adopting edible cutlery in hotels, restaurants, airlines, railways, cafes, hospitals, and events.",
  },
  sustainability: {
    title: "Sustainability",
    kicker: "Sustainability",
    description: "Plastic pollution, ESG, circular economy, and zero-waste dining.",
    seoTitle: "Sustainability & Zero-Waste Dining Resources",
    seoDescription: "Explore plastic pollution, ESG, SDGs, carbon footprint, and circular economy topics related to sustainable dining.",
  },
  "buying-guide": {
    title: "Buying Guide",
    kicker: "Buying Guide",
    description: "MOQ, pricing, shelf life, private label, OEM, and export basics.",
    seoTitle: "Edible Cutlery Buying Guide",
    seoDescription: "Everything you need to know before ordering edible cutlery in bulk: MOQ, pricing, shelf life, storage, private label, OEM, and export.",
  },
  comparisons: {
    title: "Comparisons",
    kicker: "Comparisons",
    description: "Edible cutlery compared against plastic, wood, bamboo, paper, and steel.",
    seoTitle: "Edible Cutlery vs Other Cutlery Types",
    seoDescription: "Side-by-side comparisons of edible cutlery against plastic, wooden, bamboo, paper, and steel alternatives.",
  },
};

export interface LearnNavItem {
  label: string;
  path: string;
  description: string;
}

export const learnNavItems: LearnNavItem[] = [
  { label: "Edible Cutlery Guide", path: "/learn/product-guides/edible-cutlery", description: "The complete guide to edible cutlery" },
  { label: "FAQ", path: "/learn/faq", description: "Answers to common questions" },
  { label: "Product Guides", path: "/learn/product-guides", description: "Deep dives on each edible cutlery product" },
  { label: "Industry Guides", path: "/learn/industry-guides", description: "Edible cutlery by industry: hotels, airlines, events" },
  { label: "Sustainability", path: "/learn/sustainability", description: "Plastic pollution, ESG, circular economy" },
  { label: "Buying Guide", path: "/learn/buying-guide", description: "MOQ, pricing, private label, export" },
  { label: "Comparisons", path: "/learn/comparisons", description: "Edible cutlery vs plastic, wood, bamboo, paper, steel" },
  { label: "Blog", path: "/learn/blog", description: "Latest articles on sustainable dining" },
];
