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
  
  const partners = [
    {
      name: "Cradle - Mentor, Nurture, Grow",
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
      logo: "/images/badruka-college-logo.jpg"
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

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % partners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5s
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + partners.length) % partners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5s
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5s
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

  // Mobile: Interactive carousel with thumbnails, arrows, swipe, auto-advance
  if (isMobile) {
    return (
      <div className="w-full">
        {/* Main carousel area */}
        <div 
          className="relative bg-white rounded-lg shadow-sm p-6 mb-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label="Previous partner"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label="Next partner"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          {/* Logo display */}
          <div className="flex items-center justify-center h-24 px-8">
            <img
              src={partners[activeIndex].logo}
              alt={partners[activeIndex].name}
              className={`object-contain max-h-20 max-w-full transition-all duration-300 ${
                partners[activeIndex].name.includes("Badruka College of Commerce & Arts") ? "scale-110" : ""
              }`}
              loading="lazy"
              onError={(e) => {
                console.warn(`Failed to load image: ${partners[activeIndex].logo}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-3 leading-tight">
            {partners[activeIndex].name}
          </p>
        </div>

        {/* Logo thumbnails as navigation */}
        <div className="flex justify-center space-x-2">
          {partners.map((partner, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`p-2 rounded-lg border-2 transition-all duration-300 ${
                activeIndex === index
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`w-8 h-8 object-contain ${
                  partner.name.includes("Badruka College of Commerce & Arts") ? "scale-110" : ""
                }`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center mt-3 space-x-1">
          {partners.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'w-8 bg-green-500' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
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
                className={`object-contain transition-transform hover:scale-105 ${
                  isBadrukaLogo ? "max-h-28 max-w-48 scale-110" : "max-h-24 max-w-44"
                }`}
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