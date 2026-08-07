import { Suspense, lazy, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { trackPageView } from "./lib/analytics";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import { useContactModal } from "./hooks/useContactModal";
import Home from "./pages/Home";
import type { ContentCollection } from "./lib/content/types";
import { collectionBasePath } from "./lib/content/paths";

const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Impact = lazy(() => import("./pages/Impact"));
const Business = lazy(() => import("./pages/Business"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LearnHub = lazy(() => import("./pages/learn/LearnHub"));
const GuidesDirectory = lazy(() => import("./pages/learn/GuidesDirectory"));
const FaqPage = lazy(() => import("./pages/learn/FaqPage"));
const CollectionIndexPage = lazy(() => import("./pages/learn/CollectionIndexPage"));
const ArticleDetailPage = lazy(() => import("./pages/learn/ArticleDetailPage"));
const ContactModal = lazy(() => import("./components/ContactModal"));

const learnCollections: ContentCollection[] = [
  "blog",
  "product-guides",
  "industry-guides",
  "sustainability",
  "buying-guide",
  "comparisons",
];

const queryClient = new QueryClient();

const App = () => {
  const { isOpen, openModal, closeModal } = useContactModal();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <AppRoutes openModal={openModal} closeModal={closeModal} isOpen={isOpen} />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

const AppRoutes = ({
  openModal,
  closeModal,
  isOpen,
}: {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}) => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
            <Header onContactClick={openModal} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home onContactClick={openModal} />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/business" element={<Business onContactClick={openModal} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />

                <Route path="/learn" element={<LearnHub />} />
                <Route path="/learn/guides" element={<GuidesDirectory />} />
                <Route path="/learn/faq" element={<FaqPage />} />
                {learnCollections.map((collection) => (
                  <Route key={collection} path={collectionBasePath(collection)}>
                    <Route index element={<CollectionIndexPage collection={collection} />} />
                    <Route path=":slug" element={<ArticleDetailPage collection={collection} />} />
                  </Route>
                ))}

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton isFloating={true} onContactClick={openModal} />
            <ContactModal isOpen={isOpen} onClose={closeModal} />
          </div>
  );
};

export default App;
