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
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
              {faq.category && <p className="text-xs uppercase tracking-wide text-primary">{faq.category}</p>}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
