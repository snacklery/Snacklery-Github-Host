import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
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
import ContactModal from "./components/ContactModal";
import { useContactModal } from "./hooks/useContactModal";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Impact from "./pages/Impact";
import Business from "./pages/Business";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isOpen, openModal, closeModal } = useContactModal();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes openModal={openModal} closeModal={closeModal} isOpen={isOpen} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
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
