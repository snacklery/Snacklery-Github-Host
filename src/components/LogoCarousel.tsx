import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LogoCarousel = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const partners = [
    {
      name: "Cradle - Mentor, Nurture, Grow, Ahmedabad",
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

  // Auto-advance every 3 seconds for mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % partners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, partners.length]);

  // Simple navigation - guaranteed to work
  const goNext = () => {
    setActiveIndex((prev) => prev === partners.length - 1 ? 0 : prev + 1);
  };

  const goPrev = () => {
    setActiveIndex((prev) => prev === 0 ? partners.length - 1 : prev - 1);
  };



  // Mobile: Simple carousel with working arrows
  if (isMobile) {
    const currentPartner = partners[activeIndex];
    
    return (
      <div className="w-full">
        <div className="relative bg-primary/10 backdrop-blur-sm rounded-3xl p-8 mb-4 border border-primary/20">
          {/* Left Arrow */}
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-4 w-12 h-12 bg-white border-2 border-green-500 rounded-full shadow-xl flex items-center justify-center active:bg-green-50"
            aria-label="Previous partner"
          >
            <ChevronLeft className="w-6 h-6 text-green-600" />
          </button>
          
          {/* Right Arrow */}
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-4 w-12 h-12 bg-white border-2 border-green-500 rounded-full shadow-xl flex items-center justify-center active:bg-green-50"
            aria-label="Next partner"
          >
            <ChevronRight className="w-6 h-6 text-green-600" />
          </button>

          {/* Content */}
          <div className="flex flex-col items-center justify-center space-y-4 px-12">
            <div className="flex items-center justify-center h-32">
              <img
                src={currentPartner.logo}
                alt={currentPartner.name}
                className="object-contain h-28 w-full transition-all duration-300"
                loading="lazy"
              />
            </div>
            
            <div className="text-center text-sm text-gray-700 leading-tight font-medium min-h-[3rem] flex items-center justify-center">
              <div>{currentPartner.name}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Keep the scrolling carousel
  const copies = 4;
  const allPartners = Array.from({ length: copies }, () => partners).flat();

  return (
    <div className="overflow-hidden">
      <div className="flex animate-scroll-left space-x-8">
        {allPartners.map((partner, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;