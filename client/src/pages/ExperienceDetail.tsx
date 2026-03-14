/*
 * Waldhotel Bad Essen – Arrangement Detail Page
 * Design: "Waldstille" – Emotional, verkaufsstark, ruhig und hochwertig
 * Data loaded from database via tRPC
 */
import { Link, useParams } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/lib/images';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useExperienceBySlug } from '@/hooks/useHotelData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import HeroSection from '@/components/HeroSection';
import { ArrowRight, ArrowLeft, Check, Clock, Phone, Mail, Loader2 } from 'lucide-react';

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

export default function ExperienceDetail() {
  const { lang, t } = useLanguage();
  const params = useParams<{ slug: string }>();
  const slug = params.slug || '';
  const bookUrl = lang === 'de' ? '/buchen' : '/en/book';
  const experiencesUrl = lang === 'de' ? '/erlebnisse' : '/en/experiences';

  const { data: experience, isLoading } = useExperienceBySlug(lang, slug);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-10 h-10 text-[#C8A96E] animate-spin" />
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          <h1 className="font-heading text-3xl text-[#253541]">
            {lang === 'de' ? 'Erlebnis nicht gefunden' : 'Experience not found'}
          </h1>
          <Link
            href={experiencesUrl}
            className="inline-flex items-center gap-2 text-[#28863E] hover:text-[#1f6d32] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'de' ? 'Zurück zu Erlebnisse' : 'Back to Experiences'}
          </Link>
        </div>
      </div>
    );
  }

  const includes: string[] = experience.includes ? JSON.parse(experience.includes) : [];
  const descriptionParagraphs = experience.description?.split('\n\n') || [];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <HeroSection
        image={experience.imageUrl || IMAGES.wellnessSauna}
        title={experience.title}
        subtitle={experience.headline || undefined}
        alt={experience.title}
        height="h-[60vh] md:h-[75vh]"
      />

      {/* Back link */}
      <div className="container pt-8">
        <Link
          href={experiencesUrl}
          className="inline-flex items-center gap-2 text-sm text-[#253541]/60 hover:text-[#C8A96E] transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'de' ? 'Alle Erlebnisse' : 'All Experiences'}
        </Link>
      </div>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left: Description (2/3 width) */}
            <div className="lg:col-span-2">
              <RevealSection>
                {/* Subtitle */}
                {experience.subtitle && (
                  <p className="text-xl md:text-2xl text-[#253541]/60 font-light italic mb-8">
                    {experience.subtitle}
                  </p>
                )}

                {/* Description paragraphs */}
                <div className="space-y-6">
                  {descriptionParagraphs.map((paragraph, i) => (
                    <p key={i} className="text-[#253541]/80 leading-[1.8] text-base md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </RevealSection>

              {/* SEO Text */}
              {experience.seoText && (
                <RevealSection delay={200}>
                  <div className="mt-16 pt-12 border-t border-[#253541]/10">
                    <p className="text-[#253541]/50 leading-relaxed text-sm">
                      {experience.seoText}
                    </p>
                  </div>
                </RevealSection>
              )}
            </div>

            {/* Right: Sidebar (1/3 width) */}
            <div className="lg:col-span-1">
              <RevealSection delay={100}>
                <div className="sticky top-28">
                  {/* Booking Card */}
                  <div className="bg-[#F7F5F0] rounded-sm p-8">
                    {/* Duration */}
                    {experience.duration && (
                      <div className="flex items-center gap-2 mb-6">
                        <Clock className="w-5 h-5 text-[#C8A96E]" />
                        <span className="text-[#253541] font-medium">{experience.duration}</span>
                      </div>
                    )}

                    {/* Included services */}
                    <h3 className="text-xs tracking-[0.15em] uppercase text-[#C8A96E] mb-4">
                      {lang === 'de' ? 'Inklusive' : 'Included'}
                    </h3>
                    <ul className="space-y-3 mb-8">
                      {includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-[#28863E] flex-shrink-0 mt-1" />
                          <span className="text-sm text-[#253541]/80">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="h-px bg-[#253541]/10 mb-6" />

                    {/* Price */}
                    {experience.price && (
                      <div className="mb-8">
                        <p className="text-3xl font-heading text-[#253541] font-light">
                          {experience.price}
                        </p>
                        {experience.priceLabel && (
                          <p className="text-sm text-[#253541]/50 mt-1">{experience.priceLabel}</p>
                        )}
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link
                      href={bookUrl}
                      className="flex items-center justify-center gap-2 w-full bg-[#28863E] text-white px-6 py-4 text-sm tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-colors duration-300"
                    >
                      {experience.ctaText || (lang === 'de' ? 'Jetzt anfragen' : 'Enquire now')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Contact */}
                    <div className="mt-8 pt-6 border-t border-[#253541]/10">
                      <p className="text-xs tracking-[0.15em] uppercase text-[#C8A96E] mb-4">
                        {lang === 'de' ? 'Fragen?' : 'Questions?'}
                      </p>
                      <div className="space-y-3">
                        <a
                          href="tel:+4917632419623"
                          className="flex items-center gap-3 text-sm text-[#253541]/70 hover:text-[#C8A96E] transition-colors duration-300"
                        >
                          <Phone className="w-4 h-4 text-[#C8A96E]" />
                          +49 176 3241 9623
                        </a>
                        <a
                          href="mailto:kontakt@waldhotel-badessen.de"
                          className="flex items-center gap-3 text-sm text-[#253541]/70 hover:text-[#C8A96E] transition-colors duration-300"
                        >
                          <Mail className="w-4 h-4 text-[#C8A96E]" />
                          kontakt@waldhotel-badessen.de
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
