/*
 * Waldhotel Bad Essen – Startseite
 * Design: "Waldstille" – Japandi Minimalism
 * Asymmetrische Balance, extreme Weißräume, natürliche Materialehrlichkeit
 * Data loaded from database via tRPC, with i18n fallback
 */
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/lib/images';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useHotelInfo } from '@/hooks/useHotelData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import JsonLd from '@/components/JsonLd';
import HeroSection from '@/components/HeroSection';
import { ArrowRight } from 'lucide-react';

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

export default function Home() {
  const { lang, t } = useLanguage();
  const bookUrl = lang === 'de' ? '/buchen' : '/en/book';
  const roomsUrl = lang === 'de' ? '/zimmer' : '/en/rooms';
  const wellnessUrl = lang === 'de' ? '/wellness' : '/en/wellness';
  const locationUrl = lang === 'de' ? '/bad-essen' : '/en/location';

  // Fetch hotel info from database
  const { data: dbInfo } = useHotelInfo(lang);

  // Use DB data with i18n fallback
  const heroTitle = dbInfo?.heroTitle || t.hero.title;
  const heroSubtitle = dbInfo?.heroSubtitle || t.hero.subtitle;
  const heroCta = dbInfo?.heroCta || t.hero.cta;
  const aboutLabel = dbInfo?.aboutLabel || t.hotel.label;
  const aboutTitle = dbInfo?.aboutTitle || t.hotel.title;
  const aboutText1 = dbInfo?.aboutText1 || t.hotel.text1;
  const aboutText2 = dbInfo?.aboutText2 || t.hotel.text2;
  const aboutCta = dbInfo?.aboutCta || t.hotel.cta;

  return (
    <div className="min-h-screen">
      <JsonLd />
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt={lang === 'de' ? 'Waldhotel Bad Essen – Fachwerkhaus am Wiehengebirge' : 'Waldhotel Bad Essen – Half-timbered hotel at the Wiehengebirge'}
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative h-full flex flex-col justify-end pb-20 md:pb-32 container">
          <div className="max-w-2xl">
            <p className="subtitle-caps text-white/80 mb-4">{heroSubtitle}</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] text-white font-light tracking-wide leading-[1.1]">
              {heroTitle}
            </h1>
            <div className="gold-line mt-8 mb-8" />
            <Link
              href={bookUrl}
              className="inline-flex items-center gap-2 bg-[#28863E] text-white px-7 py-3.5 text-sm tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-all duration-300 group"
            >
              {heroCta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Das Hotel – Bild links, Text rechts */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <RevealSection className="lg:col-span-5">
              <div className="relative overflow-hidden">
                <img
                  src={IMAGES.hotelExterior1}
                  alt={lang === 'de' ? 'Waldhotel Bad Essen Außenansicht' : 'Waldhotel Bad Essen exterior view'}
                  className="w-full h-[400px] lg:h-[520px] object-cover"
                  loading="lazy"
                />
              </div>
            </RevealSection>
            <RevealSection className="lg:col-span-7 lg:pl-8" delay={200}>
              <p className="subtitle-caps mb-4">{aboutLabel}</p>
              <h2 className="font-heading text-[28px] md:text-[34px] text-[#253541] font-light leading-tight mb-6">
                {aboutTitle}
              </h2>
              <div className="gold-line mb-8" />
              <p className="text-base leading-[1.75] text-[#253541]/80 mb-4">
                {aboutText1}
              </p>
              <p className="text-base leading-[1.75] text-[#253541]/80 mb-8">
                {aboutText2}
              </p>
              <Link
                href={roomsUrl}
                className="inline-flex items-center gap-2 text-[#28863E] text-sm tracking-wide hover:text-[#1f6d32] transition-colors duration-300 group"
              >
                {aboutCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Wellness – Text links, Bild rechts */}
      <section className="section-padding bg-[#F7F5F0]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <RevealSection className="lg:col-span-7 lg:pr-8 order-2 lg:order-1" delay={200}>
              <p className="subtitle-caps mb-4">{t.wellness.label}</p>
              <h2 className="font-heading text-[28px] md:text-[34px] text-[#253541] font-light leading-tight mb-6">
                {t.wellness.title}
              </h2>
              <div className="gold-line mb-8" />
              <p className="text-base leading-[1.75] text-[#253541]/80 mb-8">
                {t.wellness.text}
              </p>
              <Link
                href={wellnessUrl}
                className="inline-flex items-center gap-2 text-[#28863E] text-sm tracking-wide hover:text-[#1f6d32] transition-colors duration-300 group"
              >
                {t.wellness.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </RevealSection>
            <RevealSection className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative overflow-hidden">
                <img
                  src={IMAGES.wellness}
                  alt={lang === 'de' ? 'Waldsauna Bad Essen – Saunalandschaft' : 'Forest Sauna Bad Essen – Sauna landscape'}
                  className="w-full h-[400px] lg:h-[520px] object-cover"
                  loading="lazy"
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Lage & Umgebung – Fullwidth background image */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.nature}
            alt={lang === 'de' ? 'Wiehengebirge Panorama' : 'Wiehengebirge panorama'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-[#253541]/60" />
        <div className="relative container section-padding">
          <RevealSection className="max-w-xl">
            <p className="subtitle-caps text-[#C8A96E] mb-4">{t.location.label}</p>
            <h2 className="font-heading text-[28px] md:text-[34px] text-white font-light leading-tight mb-6">
              {t.location.title}
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-base leading-[1.75] text-white/80 mb-8">
              {t.location.text}
            </p>
            <Link
              href={locationUrl}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-7 py-3.5 text-sm tracking-wide rounded-[3.5px] border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              {t.location.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Direkt buchen */}
      <section className="section-padding bg-white">
        <div className="container">
          <RevealSection className="text-center max-w-2xl mx-auto">
            <p className="subtitle-caps mb-4">{t.booking.label}</p>
            <h2 className="font-heading text-[28px] md:text-[34px] text-[#253541] font-light leading-tight mb-6">
              {t.booking.title}
            </h2>
            <div className="gold-line mx-auto mb-8" />
            <p className="text-base leading-[1.75] text-[#253541]/80 mb-10">
              {t.booking.text}
            </p>
            <Link
              href={bookUrl}
              className="inline-flex items-center gap-2 bg-[#28863E] text-white px-8 py-4 text-base tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-all duration-300 group"
            >
              {lang === 'de' ? 'Jetzt buchen' : 'Book Now'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </RevealSection>

          {/* Booking platforms */}
          <RevealSection className="mt-16 text-center" delay={200}>
            <p className="text-sm text-[#253541]/50 mb-6">{t.booking.also}</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <a href={dbInfo?.bookingComUrl || "https://www.booking.com/hotel/de/mullers-im-waldquartier.de.html"} target="_blank" rel="noopener noreferrer" className="text-[#253541]/40 hover:text-[#253541]/70 transition-colors duration-300 text-sm font-medium tracking-wide">
                Booking.com
              </a>
              <span className="text-[#C8A96E]">|</span>
              <a href={dbInfo?.tripadvisorUrl || "https://www.tripadvisor.com/HotelHighlight-g644182-d24009515"} target="_blank" rel="noopener noreferrer" className="text-[#253541]/40 hover:text-[#253541]/70 transition-colors duration-300 text-sm font-medium tracking-wide">
                Tripadvisor
              </a>
              <span className="text-[#C8A96E]">|</span>
              <a href={dbInfo?.agodaUrl || "https://www.agoda.com/de-de/hotel-mullers-im-waldquartier/hotel/all/bad-essen-de.html"} target="_blank" rel="noopener noreferrer" className="text-[#253541]/40 hover:text-[#253541]/70 transition-colors duration-300 text-sm font-medium tracking-wide">
                Agoda
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
