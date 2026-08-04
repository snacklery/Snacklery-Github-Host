import React from 'react';

const LogoCarousel = () => {
  const partners = [
    {
      name: "Cradle",
      fullName: "A start up incubation centre",
      location: "Ahmedabad, India",
      logo: "/lovable-uploads/0b60f8ed-49e0-47ec-ac38-b11eb5c765eb.png",
      logoClass: "max-h-20",
      href: "https://cradle-edii.in/"
    },
    {
      name: "EDII",
      fullName: "Entrepreneurship Development Institute of India",
      location: "Ahmedabad, India",
      logo: "/lovable-uploads/a50a67ad-eec7-4428-9468-c8c5da3e510f.png",
      logoClass: "max-h-28",
      href: "https://www.ediindia.org"
    },
    {
      name: "CFTRI",
      fullName: "Central Food Technological Research Institute",
      location: "Mysore, India",
      logo: "/lovable-uploads/0e3f4199-9f88-4b9e-9184-6860cd48244c.png",
      logoClass: "max-h-36",
      href: "https://www.cftri.res.in"
    },
    {
      name: "Badruka",
      fullName: "Badruka College of Commerce and Arts",
      location: "Hyderabad, India",
      logo: "/images/badruka-college-logo.png",
      logoClass: "max-h-36",
      href: "https://www.badruka.com/bcca/"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-0">
      {partners.map((partner, index) => (
        <div key={index} className="flex flex-col items-stretch gap-2">
        <a
          href={partner.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4 bg-white rounded-3xl shadow-soft border border-border h-[180px] transition hover:-translate-y-1 hover:shadow-lg"
          title={partner.name}
        >
          <img
            src={partner.logo}
            alt={partner.name}
            className={`object-contain max-w-full ${partner.logoClass}`}
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
        </a>
        <div className="text-center">
          <a
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sm text-slate-900 hover:text-slate-700"
          >
            {partner.name} — {partner.fullName}
          </a>
          <p className="text-[11px] text-muted-foreground">{partner.location}</p>
        </div>
      </div>
      ))}
    </div>
  );
};

export default LogoCarousel;
