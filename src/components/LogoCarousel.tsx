import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const LogoCarousel = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(0);
  
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

  // Mobile: Tab-based interface, Desktop: Carousel
  if (isMobile) {
    return (
      <div className="w-full">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 mb-4">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-2 px-1 text-sm font-medium text-center border-b-2 transition-colors ${
                activeTab === index
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Partner {index + 1}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-center h-24">
              <img
                src={partners[activeTab].logo}
                alt={partners[activeTab].name}
                className={`object-contain max-h-20 max-w-full ${
                  partners[activeTab].name.includes("Badruka College of Commerce & Arts") ? "scale-110" : ""
                }`}
                loading="lazy"
                onError={(e) => {
                  console.warn(`Failed to load image: ${partners[activeTab].logo}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-3 leading-tight">
              {partners[activeTab].name}
            </p>
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