import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  query?: string;
}

const FaqAccordion = ({ faqs, query }: FaqAccordionProps) => {
  const normalizedQuery = query?.trim().toLowerCase();

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => {
        const showMatch = normalizedQuery
          ? `${faq.question} ${faq.answer}`.toLowerCase().includes(normalizedQuery)
          : true;

        if (!showMatch) return null;

        return (
          <AccordionItem key={faq.id} value={faq.id} id={faq.id} className="border-b border-border/60 last:border-b-0">
            <AccordionTrigger className="text-left py-5 hover:no-underline">
              <span className="font-medium text-foreground">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pb-4">
                <p className="text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                {faq.category && <p className="text-xs uppercase tracking-[0.2em] text-primary">{faq.category}</p>}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default FaqAccordion;
