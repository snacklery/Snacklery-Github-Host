import { useEffect } from "react";

const CookiePolicy = () => {
  useEffect(() => {
    document.title = "Cookie Policy - Snacklery";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8"><strong>Effective Date:</strong> 17 September 2025</p>

        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <p>Snacklery respects your privacy. At present, we do <strong>not</strong> use cookies or tracking technologies on our website.</p>

          <p>If we introduce cookies in the future (for analytics, personalization, or marketing), we will update this policy and provide a clear consent mechanism in compliance with applicable laws.</p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;