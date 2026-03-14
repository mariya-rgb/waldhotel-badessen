/*
 * Waldhotel Bad Essen – Erlebnis-Landingpage
 * Jedes Erlebnis hat eine eigene, Social-Media-optimierte Landingpage
 * mit starken Überschriften, 3-4 Hochkant-Fotos und OG/Twitter/Pinterest-Tags
 */
import { Link, useParams } from 'wouter';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/lib/images';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useExperienceBySlug } from '@/hooks/useHotelData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import SeoHead from '@/components/SeoHead';
import { ArrowRight, ArrowLeft, Check, Clock, Phone, Mail, Loader2, X } from 'lucide-react';

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

/* Lightbox für Bildergalerie */
function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-50"
        aria-label="Schließen"
      >
        <X className="w-8 h-8" />
      </button>
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors z-50 bg-black/30 rounded-full p-3"
            aria-label="Vorheriges Bild"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors z-50 bg-black/30 rounded-full p-3"
            aria-label="Nächstes Bild"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </>
      )}
      <img
        src={images[currentIndex]}
        alt=""
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
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

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
  const galleryImages: string[] = experience.galleryImages ? JSON.parse(experience.galleryImages) : [];
  const descriptionParagraphs = experience.description?.split('\n\n') || [];

  // Canonical URL für Social Media
  const baseUrl = 'https://waldhotel-badessen.de';
  const canonicalPath = lang === 'de' ? `/erlebnisse/${slug}` : `/en/experiences/${slug}`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  // SEO Meta-Beschreibung
  const metaDescription = experience.seoText
    ? experience.seoText.substring(0, 160)
    : (experience.description?.substring(0, 160) || '');

  // OG-Bild: erstes Galeriebild oder Hauptbild
  const ogImage = galleryImages.length > 0 ? galleryImages[0] : (experience.imageUrl || IMAGES.nature);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* SEO & Social Media Meta Tags */}
      <SeoHead
        title={`${experience.title} – Waldhotel Bad Essen`}
        description={metaDescription}
        image={ogImage}
        url={canonicalUrl}
        type="article"
        locale={lang === 'de' ? 'de_DE' : 'en_US'}
      />

      <Header />

      {/* Hero – Fullscreen mit Hauptbild */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 w-full h-[120%]">
          <img
            src={experience.imageUrl || IMAGES.nature}
            alt={experience.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative h-full flex flex-col justify-end pb-16 md:pb-24 container">
          <div className="max-w-3xl">
            {/* Starke Headline */}
            {experience.headline && (
              <p className="subtitle-caps text-[#C8A96E] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {experience.headline}
              </p>
            )}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              {experience.title}
            </h1>
            {experience.subtitle && (
              <p className="text-lg md:text-xl text-white/80 font-light mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                {experience.subtitle}
              </p>
            )}
            {/* Preis-Badge im Hero */}
            {experience.price && (
              <div className="mt-8 inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm px-6 py-3 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <span className="text-2xl font-heading text-white font-light">{experience.price}</span>
                {experience.priceLabel && (
                  <span className="text-sm text-white/70">{experience.priceLabel}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Zurück-Link */}
      <div className="container pt-8">
        <Link
          href={experiencesUrl}
          className="inline-flex items-center gap-2 text-sm text-[#253541]/60 hover:text-[#C8A96E] transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'de' ? 'Alle Erlebnisse' : 'All Experiences'}
        </Link>
      </div>

      {/* Beschreibung – Starke Typografie */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <RevealSection>
            <div className="space-y-8">
              {descriptionParagraphs.map((paragraph, i) => (
                <p key={i} className={`leading-[1.9] ${
                  i === 0
                    ? 'text-xl md:text-2xl text-[#253541]/90 font-light'
                    : 'text-base md:text-lg text-[#253541]/75'
                }`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Hochkant-Fotogalerie – Pinterest-optimiert */}
      {galleryImages.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="container">
            <RevealSection>
              <h2 className="font-heading text-2xl md:text-3xl text-[#253541] font-light tracking-wide text-center mb-12">
                {lang === 'de' ? 'Eindrücke' : 'Impressions'}
              </h2>
            </RevealSection>
            <div className={`grid gap-4 md:gap-6 ${
              galleryImages.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              galleryImages.length === 2 ? 'grid-cols-2 max-w-3xl mx-auto' :
              galleryImages.length === 3 ? 'grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto' :
              'grid-cols-2 md:grid-cols-4'
            }`}>
              {galleryImages.map((img, i) => (
                <RevealSection key={i} delay={i * 100}>
                  <div
                    className="relative overflow-hidden rounded-sm cursor-pointer group aspect-[3/4]"
                    onClick={() => openLightbox(i)}
                  >
                    <img
                      src={img}
                      alt={`${experience.title} – ${lang === 'de' ? 'Bild' : 'Image'} ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leistungen & Buchung */}
      <section className="bg-[#F7F5F0] py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
            {/* Leistungen */}
            <RevealSection>
              <h2 className="font-heading text-2xl md:text-3xl text-[#253541] font-light tracking-wide mb-8">
                {lang === 'de' ? 'Das ist enthalten' : 'What\'s included'}
              </h2>
              <ul className="space-y-5">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#28863E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#28863E]" />
                    </div>
                    <span className="text-[#253541]/80 text-base md:text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              {/* Dauer */}
              {experience.duration && (
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#253541]/10">
                  <Clock className="w-5 h-5 text-[#C8A96E]" />
                  <span className="text-[#253541]/70">{experience.duration}</span>
                </div>
              )}
            </RevealSection>

            {/* Buchungs-Card */}
            <RevealSection delay={200}>
              <div className="bg-white rounded-sm p-8 md:p-10 shadow-sm">
                <h3 className="font-heading text-xl md:text-2xl text-[#253541] font-light mb-2">
                  {lang === 'de' ? 'Jetzt buchen' : 'Book now'}
                </h3>
                <div className="gold-line mb-8" />

                {/* Preis */}
                {experience.price && (
                  <div className="mb-8">
                    <p className="text-3xl md:text-4xl font-heading text-[#253541] font-light">
                      {experience.price}
                    </p>
                    {experience.priceLabel && (
                      <p className="text-sm text-[#253541]/50 mt-2">{experience.priceLabel}</p>
                    )}
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={bookUrl}
                  className="flex items-center justify-center gap-2 w-full bg-[#28863E] text-white px-6 py-4 text-sm tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-colors duration-300 mb-4"
                >
                  {experience.ctaText || (lang === 'de' ? 'Jetzt anfragen' : 'Enquire now')}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Kontakt */}
                <div className="mt-8 pt-6 border-t border-[#253541]/10">
                  <p className="text-xs tracking-[0.15em] uppercase text-[#C8A96E] mb-4">
                    {lang === 'de' ? 'Persönliche Beratung' : 'Personal advice'}
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
            </RevealSection>
          </div>
        </div>
      </section>

      {/* SEO-Text */}
      {experience.seoText && (
        <section className="py-16 md:py-20">
          <div className="container max-w-3xl">
            <RevealSection>
              <p className="text-[#253541]/45 leading-relaxed text-sm">
                {experience.seoText}
              </p>
            </RevealSection>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && galleryImages.length > 0 && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
        />
      )}

      <Footer />
      <CookieBanner />
    </div>
  );
}
