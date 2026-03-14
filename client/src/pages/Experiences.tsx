/*
 * Waldhotel Bad Essen – Erlebnisse & Arrangements
 * Design: "Waldstille" – Japandi Minimalism
 * Data loaded from database via tRPC, with i18n fallback
 */
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/lib/images';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useExperiences, usePageMeta } from '@/hooks/useHotelData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import HeroSection from '@/components/HeroSection';
import { ArrowRight, Clock, Check, Loader2 } from 'lucide-react';

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

export default function Experiences() {
  const { lang, t } = useLanguage();
  const bookUrl = lang === 'de' ? '/buchen' : '/en/book';

  // Fetch data from database
  const { data: experiences, isLoading } = useExperiences(lang);
  const { data: pageMeta } = usePageMeta(lang, 'experiences');

  // i18n fallback
  const heroTitle = pageMeta?.heroTitle || (lang === 'de' ? 'Erlebnisse & Arrangements' : 'Experiences & Arrangements');
  const introText = pageMeta?.introText || (lang === 'de'
    ? 'Besondere Momente verdienen besondere Rahmen. Unsere Arrangements verbinden das Beste, was das Waldhotel Bad Essen zu bieten hat – zu einem Erlebnis, das in Erinnerung bleibt.'
    : 'Special moments deserve special settings. Our arrangements combine the best the Waldhotel Bad Essen has to offer – into an experience that stays with you.');

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <HeroSection
        image={IMAGES.nature}
        title={heroTitle}
        alt={lang === 'de' ? 'Waldhotel Bad Essen – Erlebnisse' : 'Waldhotel Bad Essen – Experiences'}
        height="h-[60vh] md:h-[70vh]"
      />

      {/* Intro */}
      <section className="section-padding">
        <div className="container max-w-3xl text-center">
          <RevealSection>
            <p className="text-lg md:text-xl text-[#253541]/80 leading-relaxed font-light">
              {introText}
            </p>
            <div className="gold-line mx-auto mt-8" />
          </RevealSection>
        </div>
      </section>

      {/* Arrangements List */}
      <section className="pb-20 md:pb-32">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#C8A96E] animate-spin" />
            </div>
          ) : experiences && experiences.length > 0 ? (
            <div className="space-y-24">
              {experiences.map((exp, index) => {
                const includes: string[] = exp.includes ? JSON.parse(exp.includes) : [];
                const detailUrl = lang === 'de'
                  ? `/erlebnisse/${exp.slug}`
                  : `/en/experiences/${exp.slug}`;

                return (
                  <RevealSection key={exp.id}>
                    <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                      {/* Image side */}
                      <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
                          <img
                            src={exp.imageUrl || IMAGES.wellnessSauna}
                            alt={exp.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                          />
                          {/* Duration badge */}
                          {exp.duration && (
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-sm flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#C8A96E]" />
                              <span className="text-sm font-medium text-[#253541]">{exp.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content side */}
                      <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                        {/* Headline */}
                        {exp.headline && (
                          <p className="subtitle-caps text-[#C8A96E] mb-3">{exp.headline}</p>
                        )}
                        <h2 className="font-heading text-3xl md:text-4xl text-[#253541] font-light tracking-wide mb-3">
                          {exp.title}
                        </h2>
                        {exp.subtitle && (
                          <p className="text-lg text-[#253541]/60 font-light italic mb-6">{exp.subtitle}</p>
                        )}

                        {/* Description (first paragraph only for overview) */}
                        <p className="text-[#253541]/70 leading-relaxed mb-8">
                          {exp.description?.split('\n\n')[0]}
                        </p>

                        {/* Included services */}
                        {includes.length > 0 && (
                          <ul className="space-y-3 mb-8">
                            {includes.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#28863E] flex-shrink-0 mt-0.5" />
                                <span className="text-[#253541]/80">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Price */}
                        {exp.price && (
                          <div className="bg-[#F7F5F0] rounded-sm p-5 mb-8">
                            <p className="text-2xl font-heading text-[#253541] font-light">
                              {exp.price}
                            </p>
                            {exp.priceLabel && (
                              <p className="text-sm text-[#253541]/60 mt-1">{exp.priceLabel}</p>
                            )}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link
                            href={detailUrl}
                            className="inline-flex items-center justify-center gap-2 bg-[#28863E] text-white px-7 py-3.5 text-sm tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-colors duration-300"
                          >
                            {lang === 'de' ? 'Mehr erfahren' : 'Learn more'}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <Link
                            href={bookUrl}
                            className="inline-flex items-center justify-center gap-2 border border-[#253541]/20 text-[#253541] px-7 py-3.5 text-sm tracking-wide rounded-[3.5px] hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors duration-300"
                          >
                            {exp.ctaText || (lang === 'de' ? 'Jetzt anfragen' : 'Enquire now')}
                          </Link>
                        </div>
                      </div>
                    </article>
                  </RevealSection>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#253541]/60">
                {lang === 'de' ? 'Aktuell keine Erlebnisse verfügbar.' : 'No experiences currently available.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#253541] section-padding">
        <div className="container max-w-3xl text-center">
          <RevealSection>
            <p className="subtitle-caps text-[#C8A96E] mb-4">
              {lang === 'de' ? 'Individuell planen' : 'Plan individually'}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-white font-light tracking-wide mb-6">
              {lang === 'de' ? 'Ihr Wunsch-Arrangement' : 'Your Custom Arrangement'}
            </h2>
            <p className="text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
              {lang === 'de'
                ? 'Sie haben besondere Wünsche oder möchten ein individuelles Erlebnis zusammenstellen? Kontaktieren Sie uns – wir gestalten Ihren Aufenthalt nach Ihren Vorstellungen.'
                : 'Do you have special wishes or would you like to put together an individual experience? Contact us – we will design your stay according to your ideas.'}
            </p>
            <Link
              href={bookUrl}
              className="inline-flex items-center gap-2 bg-[#28863E] text-white px-8 py-4 text-sm tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-colors duration-300"
            >
              {lang === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
