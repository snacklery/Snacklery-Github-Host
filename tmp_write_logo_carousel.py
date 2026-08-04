from pathlib import Path

content = '''import React from 'react';

const LogoCarousel = () => {
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-0">
      {partners.map((partner, index) => (
        <div
          key={index}
          className="flex items-center justify-center p-6 bg-white rounded-3xl shadow-soft border border-border min-h-[128px]"
          title={partner.name}
        >
          <img
            src={partner.logo}
            alt={partner.name}
            className="object-contain max-h-20 max-w-full"
            loading="lazy"
            onError={(n) => {
              const target = n.currentTarget;
              console.warn(`Failed to load image: ${partner.logo}`);
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.textContent = partner.name;
              fallback.className = 'text-sm text-center text-muted-foreground px-2';
              target.parentElement?.appendChild(fallback);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default LogoCarousel;
'''
Path('src/components/LogoCarousel.tsx').write_text(content, encoding='utf-8')
