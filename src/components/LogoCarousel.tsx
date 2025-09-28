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
    stopAutoPlay();
    setActiveIndex((prev) => {
      const newIndex = prev >= partners.length - 1 ? 0 : prev + 1;
      console.log(`Going next: ${prev} -> ${newIndex}`);
      return newIndex;
    });
    resumeAutoPlay();
  };

  const goToPrev = () => {
    stopAutoPlay();
    setActiveIndex((prev) => {
      const newIndex = prev <= 0 ? partners.length - 1 : prev - 1;
      console.log(`Going prev: ${prev} -> ${newIndex}`);
      return newIndex;
    });
    resumeAutoPlay();
  };

  const goToSlide = (index: number) => {
    stopAutoPlay();
    setActiveIndex(index);
    resumeAutoPlay();
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

  // Mobile: Interactive carousel with themed background, arrows, swipe, auto-advance
  if (isMobile) {
    return (
      <div className="w-full">
        {/* Main carousel area */}
        <div 
          className="relative bg-primary/10 backdrop-blur-sm rounded-3xl p-6 mb-4 border border-primary/20"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-green-50 border border-green-200/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Previous partner"
          >
            <ChevronLeft className="w-5 h-5 text-green-600" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-green-50 border border-green-200/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Next partner"
          >
            <ChevronRight className="w-5 h-5 text-green-600" />
          </button>

          {/* Logo display */}
          <div className="flex items-center justify-center h-28 px-6">
            <img
              src={partners[activeIndex].logo}
              alt={partners[activeIndex].name}
              className="object-contain h-24 w-full transition-all duration-300"
              loading="lazy"
              onError={(e) => {
                console.warn(`Failed to load image: ${partners[activeIndex].logo}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          <div className="text-center text-sm text-gray-700 mt-4 leading-tight font-medium">
            <div>{partners[activeIndex].name}</div>
            {partners[activeIndex].location && (
              <div className="text-xs text-gray-600 mt-1">{partners[activeIndex].location}</div>
            )}
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