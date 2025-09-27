import { useEffect } from "react";

const TermsConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions - Snacklery";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8"><strong>Effective Date:</strong> 17 September 2025</p>

        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
            <p>By accessing or using this website, you agree to these Terms & Conditions. If you do not agree, please do not use the site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Use of Website</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>This website is for informational purposes only.</li>
              <li>You agree not to misuse the website, attempt unauthorized access, or engage in unlawful activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Intellectual Property</h2>
            <p>All trademarks, logos, product names, designs, and content displayed on this website are the property of Snacklery Private Limited unless stated otherwise. Unauthorized use is prohibited.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Third-Party Links</h2>
            <p>This site may contain links to third-party websites. Snacklery is not responsible for their content, practices, or availability.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Disclaimer of Warranties</h2>
            <p>This website is provided "as is" and "as available," without warranties of any kind regarding accuracy, completeness, or uninterrupted access.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
            <p>Snacklery, its directors, officers, employees, or affiliates shall not be liable for any direct, indirect, incidental, or consequential damages arising from use of this site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Changes to Terms</h2>
            <p>Snacklery reserves the right to update these Terms at any time. Continued use of the website indicates acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Governing Law</h2>
            <p>These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of courts in LB Nagar, Hyderabad.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;