import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LogoCarousel = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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

  const totalPartners = partners.length; // 4 partners

  // Clean up function
  const cleanupTimers = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  // Navigation functions with guaranteed circular logic
  const goToNext = useCallback(() => {
    setActiveIndex((current) => {
      const next = current >= totalPartners - 1 ? 0 : current + 1;
      console.log('Next: Moving from', current, 'to', next);
      return next;
    });
  }, [totalPartners]);

  const goToPrev = useCallback(() => {
    setActiveIndex((current) => {
      const prev = current <= 0 ? totalPartners - 1 : current - 1;
      console.log('Prev: Moving from', current, 'to', prev);
      return prev;
    });
  }, [totalPartners]);

  // Stop auto-play function
  const stopAutoPlay = useCallback(() => {
    cleanupTimers();
    setIsAutoPlaying(false);
  }, [cleanupTimers]);

  // Resume auto-play function
  const resumeAutoPlay = useCallback(() => {
    cleanupTimers();
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  }, [cleanupTimers]);

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (isAutoPlaying && isMobile) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, 3000);
    }
    
    return cleanupTimers;
  }, [isAutoPlaying, isMobile, goToNext, cleanupTimers]);

  // Button click handlers
  const handlePrevClick = useCallback(() => {
    stopAutoPlay();
    goToPrev();
    resumeAutoPlay();
  }, [stopAutoPlay, goToPrev, resumeAutoPlay]);

  const handleNextClick = useCallback(() => {
    stopAutoPlay();
    goToNext();
    resumeAutoPlay();
  }, [stopAutoPlay, goToNext, resumeAutoPlay]);

  // Touch/swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const deltaX = touchStartX.current - touchEndX.current;
    
    if (Math.abs(deltaX) > 50) { // Minimum swipe distance
      if (deltaX > 0) {
        // Swiped left -> go to next
        handleNextClick();
      } else {
        // Swiped right -> go to previous  
        handlePrevClick();
      }
    }
  }, [handleNextClick, handlePrevClick]);

  // Create exactly 4 copies for 4 logos - seamless 25% animation cycle
  const copies = 4;
  const allPartners = Array.from({ length: copies }, () => partners).flat();

  // Mobile: Interactive carousel with arrows, swipe, and auto-advance
  if (isMobile) {
    const currentPartner = partners[activeIndex];
    
    return (
      <div className="w-full">
        {/* Main carousel area with arrows */}
        <div 
          className="relative bg-primary/10 backdrop-blur-sm rounded-3xl p-8 mb-4 border border-primary/20"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Large, visible navigation arrows for mobile */}
          <button
            type="button"
            onClick={handlePrevClick}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-4 w-12 h-12 bg-white border-2 border-green-500 rounded-full shadow-xl flex items-center justify-center active:bg-green-50 active:scale-90 transition-all duration-200 select-none"
            aria-label="Previous partner"
          >
            <ChevronLeft className="w-6 h-6 text-green-600 font-bold pointer-events-none" />
          </button>
          
          <button
            type="button"
            onClick={handleNextClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-4 w-12 h-12 bg-white border-2 border-green-500 rounded-full shadow-xl flex items-center justify-center active:bg-green-50 active:scale-90 transition-all duration-200 select-none"
            aria-label="Next partner"
          >
            <ChevronRight className="w-6 h-6 text-green-600 font-bold pointer-events-none" />
          </button>

          {/* Logo and text together - perfectly synchronized */}
          <div className="flex flex-col items-center justify-center space-y-4 px-12">
            <div className="flex items-center justify-center h-32">
              <img
                key={`logo-${activeIndex}`}
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
            
            <div key={`text-${activeIndex}`} className="text-center text-sm text-gray-700 leading-tight font-medium h-12 flex flex-col justify-center">
              <div className="line-clamp-1">{currentPartner.name}</div>
              {currentPartner.location && (
                <div className="text-xs text-gray-600 mt-1 line-clamp-1">{currentPartner.location}</div>
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