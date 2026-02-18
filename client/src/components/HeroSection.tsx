/*
 * Waldhotel Bad Essen – Hero Section Component
 * Design: Fullscreen image with overlay text, parallax-like effect
 */
import { useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  alt: string;
  height?: string;
}

export default function HeroSection({ image, title, subtitle, alt, height = 'h-screen' }: HeroSectionProps) {
  const [offset, setOffset] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setOffset(window.scrollY * 0.3);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={heroRef} className={`relative ${height} overflow-hidden`}>
      <div
        className="absolute inset-0 w-full h-[120%]"
        style={{ transform: `translateY(-${offset}px)` }}
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
      <div className="relative h-full flex flex-col justify-end pb-20 md:pb-28 container">
        <div className="max-w-2xl">
          {subtitle && (
            <p className="subtitle-caps text-white/80 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {subtitle}
            </p>
          )}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
