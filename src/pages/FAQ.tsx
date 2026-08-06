import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqSections = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is edible cutlery?",
        answer:
          "Edible cutlery is a sustainable alternative to single-use plastic utensils. Snacklery makes spoons, stirrers, and cutlery from food-grade ingredients so they can be eaten after use or disposed of responsibly.",
      },
      {
        question: "How does edible cutlery work?",
        answer:
          "Snacklery cutlery performs like traditional disposable utensils during meals. It stays sturdy while eating, then either dissolves naturally or can be eaten as a tasty after-meal nibble.",
      },
      {
        question: "Why should I choose edible cutlery over plastic?",
        answer:
          "Plastic cutlery can last for centuries in landfills and oceans. Snacklery eliminates that waste by offering a product that is edible, biodegradable, and designed for sustainable dining experiences.",
      },
      {
        question: "What are edible utensils made of?",
        answer:
          "Snacklery uses carefully selected food-grade ingredients, including grains and plant-based components. Ingredient details vary by product and flavour, and are listed on packaging.",
      },
      {
        question: "Is edible cutlery safe to eat?",
        answer:
          "Yes. Snacklery edible cutlery is manufactured under hygienic conditions and is safe to consume after use. It is made from food-safe ingredients and audited production processes.",
      },
      {
        question: "Does edible cutlery taste good?",
        answer:
          "Yes. Snacklery offers flavours such as Classic, Peri Peri, Chilli Garlic, and Chocolate so the dining experience is enjoyable while supporting sustainability.",
      },
    ],
  },
  {
    title: "Product Questions",
    items: [
      {
        question: "How long does edible cutlery last?",
        answer:
          "Snacklery edible cutlery typically has a shelf life of up to 9 months when stored in a cool, dry place in sealed packaging.",
      },
      {
        question: "Does edible cutlery become soft while eating?",
        answer:
          "Snacklery products are designed to remain functional during normal meal consumption. They retain strength while you eat and gradually soften over time.",
      },
      {
        question: "Can edible spoons be used for hot soup?",
        answer:
          "Yes. Snacklery edible spoons are built to handle hot foods and beverages for standard serving durations, making them suitable for soups, desserts, and stews.",
      },
      {
        question: "Can edible spoons be used for ice cream?",
        answer:
          "Yes. They are ideal for ice cream, frozen desserts, puddings, yogurt, and cold beverages.",
      },
      {
        question: "Can edible cutlery be reused?",
        answer:
          "Snacklery products are single-use by design for hygiene and food safety. After use, they may be eaten or disposed of responsibly.",
      },
      {
        question: "Is edible cutlery waterproof?",
        answer:
          "Snacklery utensils are moisture-resistant under normal dining conditions, but they are not intended for prolonged soaking in liquid.",
      },
    ],
  },
  {
    title: "Sustainability Questions",
    items: [
      {
        question: "Is edible cutlery biodegradable?",
        answer:
          "Yes. Snacklery cutlery biodegrades much faster than conventional plastic utensils if it is not consumed.",
      },
      {
        question: "Is edible cutlery compostable?",
        answer:
          "Yes. If not eaten, Snacklery products can decompose naturally under suitable composting conditions.",
      },
      {
        question: "How does edible cutlery help the environment?",
        answer:
          "Snacklery reduces single-use plastic waste, lowers landfill burden, supports circular economy thinking, and encourages sustainable dining practices.",
      },
      {
        question: "Is edible cutlery better than wooden cutlery?",
        answer:
          "Edible cutlery can be eaten after use, which further reduces waste. It also supports sustainable dining without requiring additional disposal.",
      },
      {
        question: "Can edible cutlery replace plastic completely?",
        answer:
          "Snacklery is designed to replace many single-use plastic applications in catering, hospitality, transport, and event service settings.",
      },
    ],
  },
  {
    title: "Business Questions",
    items: [
      {
        question: "Who can use Snacklery products?",
        answer:
          "Snacklery products are ideal for airlines, railways, hotels, restaurants, cafes, caterers, food delivery companies, educational institutions, corporate cafeterias, and event organizers.",
      },
      {
        question: "Can restaurants buy edible cutlery in bulk?",
        answer:
          "Yes. Snacklery supplies bulk quantities for restaurants, hotels, caterers, and institutional customers.",
      },
      {
        question: "Do you supply edible cutlery for airlines?",
        answer:
          "Yes. Snacklery is suitable for airline catering where reducing plastic waste and improving passenger experience are priorities.",
      },
      {
        question: "Can hotels use edible cutlery?",
        answer:
          "Absolutely. Hotels can enhance sustainability initiatives while offering guests a memorable dining experience.",
      },
      {
        question: "Can edible cutlery be customised?",
        answer:
          "Yes. Snacklery offers customised packaging and branding solutions for bulk business orders, subject to order requirements.",
      },
      {
        question: "Do you export internationally?",
        answer:
          "Yes. Snacklery works with international distributors and partners to supply edible cutlery across global markets.",
      },
      {
        question: "How can I become a distributor?",
        answer:
          "Businesses can contact Snacklery through the website to discuss distribution partnerships, market availability, and collaboration models.",
      },
    ],
  },
  {
    title: "Health & Usage Questions",
    items: [
      {
        question: "Is edible cutlery vegan?",
        answer:
          "Many Snacklery products are vegan. Please refer to individual product ingredient lists for confirmation.",
      },
      {
        question: "Is edible cutlery healthy?",
        answer:
          "Snacklery uses food-grade ingredients and designs products as edible alternatives to disposable plastic cutlery.",
      },
      {
        question: "Does edible cutlery contain preservatives?",
        answer:
          "Formulations vary by product. Complete ingredient information is available on product packaging.",
      },
      {
        question: "Is edible cutlery suitable for children?",
        answer:
          "Yes. Snacklery products are food-safe. Adult supervision is recommended for young children during meals.",
      },
      {
        question: "How should edible cutlery be stored?",
        answer:
          "Store in a cool, dry place away from direct sunlight and moisture. Keep sealed until use.",
      },
      {
        question: "Can edible cutlery be microwaved?",
        answer:
          "Microwave suitability depends on the specific product and usage instructions. Refer to product packaging for guidance.",
      },
      {
        question: "Can edible cutlery be used outdoors?",
        answer:
          "Yes. Snacklery is suitable for outdoor catering, picnics, festivals, weddings, and events.",
      },
      {
        question: "Can edible cutlery be used with beverages?",
        answer:
          "Yes. Snacklery offers edible stirrers suitable for coffee, tea, and other beverages.",
      },
      {
        question: "How can I request samples?",
        answer:
          "Businesses can contact Snacklery through the website to discuss sample availability for evaluation.",
      },
      {
        question: "What is the minimum order quantity?",
        answer:
          "Minimum order quantities vary by product and customisation. Contact our sales team for details.",
      },
      {
        question: "Do you provide private label manufacturing?",
        answer:
          "Yes. Snacklery supports private-label and custom branding opportunities for eligible business customers.",
      },
      {
        question: "What makes Snacklery different?",
        answer:
          "Snacklery combines sustainability and innovation by creating edible dining solutions that reduce plastic waste while delivering an enjoyable user experience.",
      },
      {
        question: "Why is Snacklery unique?",
        answer:
          "Snacklery transforms everyday dining cutlery into an edible, sustainable experience that helps businesses differentiate themselves while supporting environmental goals.",
      },
    ],
  },
];

const longTailKeywords = [
  "best alternative to plastic cutlery",
  "which edible spoon is best for soup",
  "are edible spoons environmentally friendly",
  "can edible cutlery replace disposable plastic",
  "how long do edible spoons last",
  "is edible cutlery compostable",
  "can edible cutlery be eaten",
  "is edible cutlery safe for children",
  "where can I buy edible cutlery",
  "which companies manufacture edible cutlery",
  "is edible cutlery suitable for airlines",
  "can hotels use edible cutlery",
  "what are sustainable catering solutions",
  "which eco-friendly spoon is best",
  "are edible stirrers biodegradable",
  "what is the shelf life of edible cutlery",
  "is edible cutlery better than wooden cutlery",
  "does edible cutlery contain plastic",
  "what is edible tableware",
  "how can restaurants eliminate plastic cutlery",
];

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ - Snacklery";
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <section className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-secondary font-semibold mb-4">
            Knowledge Base
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Explore Snacklery's complete edible cutlery FAQ for businesses, hotels, airlines, caterers, and eco-conscious diners. This page is designed to answer common questions about sustainable dining, edible utensils, and plastic alternatives.
          </p>
        </section>

        <section className="grid gap-12">
          {faqSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold text-foreground mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.title === "General Questions"
                    ? "Basic edible cutlery questions for first-time buyers and curious visitors."
                    : section.title === "Product Questions"
                    ? "Technical and performance details to help you select the right Snacklery products."
                    : section.title === "Sustainability Questions"
                    ? "How Snacklery supports plastic-free dining and eco-friendly operations."
                    : section.title === "Business Questions"
                    ? "Bulk ordering, distribution, and commercial use cases for sustainable brands."
                    : "Health, usage, and ordering guidance for safe and practical edible cutlery use."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item) => (
                  <Card key={item.question} className="shadow-soft border border-muted/50">
                    <CardHeader className="p-5">
                      <CardTitle className="text-base font-semibold text-foreground">
                        {item.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 bg-card border border-muted/50 rounded-3xl p-8 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Long-tail SEO keywords</h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                These are common search queries that Snacklery can rank for with this SEO-focused FAQ page.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
            {longTailKeywords.map((keyword) => (
              <span key={keyword} className="rounded-2xl bg-background px-4 py-3 border border-muted/30">
                {keyword}
              </span>
            ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
};

export default FAQ;
