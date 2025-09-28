import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LogoCarousel = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const partners: Array<{name: string; location?: string; logo: string}> = [
    {
      name: "Cradle - Mentor, Nurture, Grow",
      location: "Ahmedabad",
      logo: "/lovable-uploads/0b60f8ed-49e0-47ec-ac38-b11eb5c765eb.png"
    },
    {
      name: "EDII - Entrepreneurship Development Institute of India", 
      logo: "/lovable-uploads/a50a67ad-eec7-4428-9468-c8c5da3e510f.png"
    },
    {
      name: "CFTRI - Central Food Technological Research Institute",
      logo: "/lovable-uploads/0e3f4199-9f88-4b9e-9184-6860cd48244c.png"
    },
    {
      name: "Badruka College of Commerce & Arts - Entrepreneurship Development Cell",
      logo: "/images/badruka-college-logo-removebg-preview.png"
    }
  ];

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (isAutoPlaying && isMobile) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % partners.length);
      }, 3000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isMobile, partners.length]);

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const resumeAutoPlay = () => {
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % partners.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      goToNext(); // Swipe left -> next
    } else if (touchEndX.current - touchStartX.current > 50) {
      goToPrev(); // Swipe right -> previous
    }
  };

  // Create exactly 4 copies for 4 logos - seamless 25% animation cycle
  const copies = 4;
  const allPartners = Array.from({ length: copies }, () => partners).flat();

  // Mobile: Clean swipe-only carousel with auto-advance
  if (isMobile) {
    const currentPartner = partners[activeIndex];
    
    return (
      <div className="w-full">
        {/* Main carousel area - swipe only, no arrows */}
        <div 
          className="relative bg-primary/10 backdrop-blur-sm rounded-3xl p-8 mb-4 border border-primary/20"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Logo and text together - synchronized */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center h-32">
              <img
                src={currentPartner.logo}
                alt={currentPartner.name}
                className="object-contain h-28 w-full transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  console.warn(`Failed to load image: ${currentPartner.logo}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            <div className="text-center text-sm text-gray-700 leading-tight font-medium">
              <div>{currentPartner.name}</div>
              {currentPartner.location && (
                <div className="text-xs text-gray-600 mt-1">{currentPartner.location}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Keep the carousel
  return (
    <div className="overflow-hidden">
      <div className="flex animate-scroll-left space-x-8">
        {allPartners.map((partner, index) => {
          const isBadrukaLogo = partner.name.includes("Badruka College of Commerce & Arts");
          return (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-48 h-32"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="object-contain transition-transform hover:scale-105 h-28 w-44"
                loading="lazy"
                onError={(e) => {
                  console.warn(`Failed to load image: ${partner.logo}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogoCarousel;