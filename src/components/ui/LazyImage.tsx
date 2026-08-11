import React, { useEffect, useRef, useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

const LazyImage: React.FC<Props> = ({ src, alt, className = "", ...props }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              obs.disconnect();
            }
          });
        },
        { rootMargin: '200px' }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }

    // Fallback: immediately load
    setInView(true);
  }, []);

  return (
    <div className={`relative overflow-hidden ${!loaded ? 'bg-muted animate-pulse' : ''}`}>
      {inView ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoaded(true)}
          {...props}
        />
      ) : (
        <img ref={imgRef} src={undefined as unknown as string} alt={alt} className={className} {...props} />
      )}

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-md bg-gradient-to-r from-muted/40 via-muted/60 to-muted/40 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;
