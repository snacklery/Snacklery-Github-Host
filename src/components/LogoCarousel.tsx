import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const LogoCarousel = () => {
  const isMobile = useIsMobile();
  
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

  // Create exactly 4 copies for 4 logos - seamless 25% animation cycle
  const copies = 4;
  const allPartners = Array.from({ length: copies }, () => partners).flat();

  return (
    <div className="overflow-hidden">
      {/* Fast moving carousel for all devices */}
      <div className="flex animate-scroll-left space-x-8">
        {allPartners.map((partner, index) => {
          const isBadrukaLogo = partner.name.includes("Badruka College of Commerce & Arts");
          return (
            <div
              key={index}
              className={`flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                isMobile ? 'w-32 h-20' : 'w-48 h-32'
              }`}
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`object-contain transition-transform hover:scale-105 ${
                  isMobile 
                    ? (isBadrukaLogo ? "max-h-16 max-w-full scale-110" : "max-h-12 max-w-full")
                    : (isBadrukaLogo ? "max-h-28 max-w-48 scale-110" : "max-h-24 max-w-44")
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