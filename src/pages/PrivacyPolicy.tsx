import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - Snacklery";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8"><strong>Effective Date:</strong> 17 September 2025</p>

        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <p>Snacklery Private Limited ("Snacklery," "we," "our," "us") values your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or contact us.</p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Details you provide directly (name, email, phone number, organization) via inquiry or contact forms.</li>
              <li>We do <strong>not</strong> collect sensitive data, financial information, or government IDs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiries.</li>
              <li>To improve communication and site functionality.</li>
              <li>To comply with applicable laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Legal Basis</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>GDPR (EU/UK):</strong> Legitimate interest in responding to inquiries.</li>
              <li><strong>CCPA (California):</strong> We do not sell personal data.</li>
              <li><strong>India (IT Act & DPDP Act 2023):</strong> Consent is obtained when submitting inquiries.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Retention & Sharing</h2>
            <p>We retain inquiry data only as long as needed or required by law. We do not sell or rent personal data. Limited sharing may occur with service providers under strict confidentiality or when required by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Your Rights</h2>
            <p>You may request access, correction, deletion, or restriction of your data. Please contact us at: <strong>hello@snacklery.com</strong>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p>Snacklery Private Limited<br />
            LB Nagar, Hyderabad, India<br />
            Email: hello@snacklery.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;