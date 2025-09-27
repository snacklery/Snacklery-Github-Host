import React from "react";
import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "outline" | "hero" | "sustainable";
  size?: "sm" | "lg" | "xl";
  isFloating?: boolean;
}

const WhatsAppButton = ({ 
  message = "Hi! I'm interested in Snacklery's edible cutlery products.",
  className = "",
  children,
  variant = "default",
  size = "lg",
  isFloating = false
}: WhatsAppButtonProps) => {
  const isMobile = useIsMobile();
  const phoneNumber = "918985985974"; // WhatsApp number without + and spaces
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const contactPageUrl = "/contact";
  
  const contactUrl = isMobile ? whatsappUrl : contactPageUrl;
  const contactLabel = isMobile ? "Chat with us on WhatsApp" : "Contact us";
  const contactIcon = isMobile ? MessageCircle : Mail;

  if (isFloating) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-float">
        <Button
          asChild
          variant="default"
          size="lg"
          className="rounded-full w-16 h-16 shadow-green hover:shadow-earth transition-smooth bg-green-500 hover:bg-green-600 text-white border-0"
        >
          <a
            href={contactUrl}
            target={isMobile ? "_blank" : "_self"}
            rel="noopener noreferrer"
            aria-label={contactLabel}
          >
            {React.createElement(contactIcon, { className: "h-8 w-8" })}
          </a>
        </Button>
      </div>
    );
  }

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={className}
    >
      <a
        href={contactUrl}
        target={isMobile ? "_blank" : "_self"}
        rel="noopener noreferrer"
        aria-label={contactLabel}
      >
        {children}
      </a>
    </Button>
  );
};

export default WhatsAppButton;