/*
 * Waldhotel Bad Essen – Lage & Umgebung
 * Design: "Waldstille" – Nature imagery, Google Maps with consent
 * Data loaded from database via tRPC, with i18n fallback
 */
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/contexts/CookieContext';
import { IMAGES } from '@/lib/images';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLocationSections } from '@/hooks/useHotelData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import HeroSection from '@/components/HeroSection';
import { TreePine, Landmark, Heart, MapPin, Navigation, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const sectionIcons: Record<string, LucideIcon> = {
  nature: TreePine,
  culture: Landmark,
  health: Heart,
};

export default function Location() {
  const { lang, t } = useLanguage();
  const { consent } = useCookieConsent();
  const [mapLoaded, setMapLoaded] = useState(false);

  const canLoadMap = consent?.functional || mapLoaded;

  // Fetch data from database
  const { data: dbSections, isLoading: sectionsLoading } = useLocationSections(lang);

  // Use DB data or fall back to i18n
  const sections = dbSections && dbSections.length > 0
    ? dbSections.map(s => ({
        icon: sectionIcons[s.slug] || TreePine,
        title: s.title,
        items: s.items ? JSON.parse(s.items) as string[] : [],
      }))
    : [
        { icon: TreePine, ...t.locationPage.nature },
        { icon: Landmark, ...t.locationPage.culture },
        { icon: Heart, ...t.locationPage.health },
      ];

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection
        image={IMAGES.nature}
        title={t.locationPage.heroTitle}
        alt={lang === 'de' ? 'Wiehengebirge Panorama' : 'Wiehengebirge panorama'}
        height="h-[60vh] min-h-[400px]"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container">
          <RevealSection className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg leading-[1.75] text-[#253541]/80">
              {t.locationPage.intro}
            </p>
            <div className="gold-line mx-auto mt-8" />
          </RevealSection>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="pb-20 bg-white">
        <div className="container">
          {sectionsLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-[#C8A96E]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {sections.map((section, i) => {
                const Icon = section.icon;
                return (
                  <RevealSection key={section.title} delay={i * 150}>
                    <div className="bg-[#F7F5F0] p-8 rounded-[3px] h-full">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5 text-[#28863E]" />
                      </div>
                      <h3 className="font-heading text-xl text-[#253541] mb-4">{section.title}</h3>
                      <ul className="space-y-3">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] mt-2 flex-shrink-0" />
                            <span className="text-sm text-[#253541]/70 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Directions & Map */}
      <section className="section-padding bg-[#F7F5F0]">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <RevealSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Navigation className="w-5 h-5 text-[#28863E]" />
                    <h2 className="font-heading text-[28px] text-[#253541] font-light">
                      {t.locationPage.directions.title}
                    </h2>
                  </div>
                  <div className="gold-line mb-8" />
                  <p className="text-base leading-[1.75] text-[#253541]/80 mb-6">
                    {t.locationPage.directions.text}
                  </p>
                  <div className="flex items-start gap-3 text-sm text-[#253541]/70">
                    <MapPin className="w-4 h-4 text-[#C8A96E] mt-0.5 flex-shrink-0" />
                    <span>Bergstraße 51, 49152 Bad Essen</span>
                  </div>
                </div>

                {/* Google Maps with consent */}
                <div className="rounded-[3px] overflow-hidden shadow-sm bg-white" style={{ minHeight: '350px' }}>
                  {canLoadMap ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.5!2d8.339!3d52.3203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBergstra%C3%9Fe%2051%2C%2049152%20Bad%20Essen!5e0!3m2!1sde!2sde!4v1"
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={lang === 'de' ? 'Standort Waldhotel Bad Essen' : 'Location Waldhotel Bad Essen'}
                    />
                  ) : (
                    <div className="h-[350px] flex flex-col items-center justify-center bg-[#F7F5F0] p-8 text-center">
                      <MapPin className="w-8 h-8 text-[#C8A96E] mb-4" />
                      <p className="text-sm text-[#253541]/60 mb-4 max-w-xs">
                        {t.locationPage.mapConsentText}
                      </p>
                      <button
                        onClick={() => setMapLoaded(true)}
                        className="bg-[#28863E] text-white px-5 py-2.5 text-sm rounded-[3.5px] hover:bg-[#1f6d32] transition-colors duration-300"
                      >
                        {t.locationPage.mapConsent}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
