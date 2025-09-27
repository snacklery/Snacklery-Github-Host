import { useEffect } from "react";

const Disclaimer = () => {
  useEffect(() => {
    document.title = "Disclaimer - Snacklery";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-4">Disclaimer</h1>
        <p className="text-muted-foreground mb-8"><strong>Effective Date:</strong> 17 September 2025</p>

        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <ul className="list-disc pl-6 space-y-3">
            <li>The content on this website is provided for informational purposes only and should not be considered professional or legal advice.</li>
            <li>Snacklery makes reasonable efforts to keep information updated but does not guarantee accuracy, completeness, or reliability.</li>
            <li>Snacklery is not responsible for any loss, damage, or consequences arising from use of this website or reliance on its content.</li>
            <li>Product images, designs, and descriptions may be illustrative and subject to change without prior notice.</li>
            <li>External links are provided for convenience only; Snacklery is not responsible for third-party websites or their content.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;