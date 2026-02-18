/*
 * Waldhotel Bad Essen – Waldsauna & Wellness
 * Design: "Waldstille" – Warm tones, nature imagery, clean tables
 * Data loaded from database via tRPC, with i18n fallback
 */
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/lib/images';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useWellnessOfferings, useWellnessHours, useWellnessPrices } from '@/hooks/useHotelData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import HeroSection from '@/components/HeroSection';
import { ArrowRight, Phone, Mail, Globe, Flame, Droplets, Wind, Snowflake, TreePine, Loader2 } from 'lucide-react';
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

// Map icon names from DB to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  thermometer: Flame,
  flame: Flame,
  cloud: Wind,
  droplets: Droplets,
  snowflake: Snowflake,
  trees: TreePine,
};

const defaultIcons = [Flame, Flame, Droplets, Snowflake, TreePine];

export default function Wellness() {
  const { lang, t } = useLanguage();
  const bookUrl = lang === 'de' ? '/buchen' : '/en/book';

  // Fetch data from database
  const { data: dbOfferings, isLoading: offeringsLoading } = useWellnessOfferings(lang);
  const { data: dbHours, isLoading: hoursLoading } = useWellnessHours(lang);
  const { data: dbPrices, isLoading: pricesLoading } = useWellnessPrices(lang);

  // Use DB data or fall back to i18n
  const offerings = dbOfferings && dbOfferings.length > 0
    ? dbOfferings.map((o, i) => ({
        title: o.title,
        desc: o.description || '',
        icon: o.iconName ? (iconMap[o.iconName] || defaultIcons[i] || Flame) : (defaultIcons[i] || Flame),
      }))
    : t.wellnessPage.offerings.map((o, i) => ({
        title: o.title,
        desc: o.desc,
        icon: defaultIcons[i] || Flame,
      }));

  const hours = dbHours && dbHours.length > 0
    ? dbHours.map(h => ({ day: h.dayName, time: h.timeRange, note: h.note || '–' }))
    : t.wellnessPage.hours;

  const prices = dbPrices && dbPrices.length > 0
    ? dbPrices.map(p => `${p.label}: ${p.price}`)
    : [t.wellnessPage.priceGuest, t.wellnessPage.priceExternal];

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection
        image={IMAGES.wellness}
        title={t.wellnessPage.heroTitle}
        alt={lang === 'de' ? 'Waldsauna Bad Essen' : 'Forest Sauna Bad Essen'}
        height="h-[60vh] min-h-[400px]"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container">
          <RevealSection className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg leading-[1.75] text-[#253541]/80">
              {t.wellnessPage.intro}
            </p>
            <div className="gold-line mx-auto mt-8" />
          </RevealSection>
        </div>
      </section>

      {/* Sauna Offerings Grid */}
      <section className="pb-20 bg-white">
        <div className="container">
          {offeringsLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-[#C8A96E]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {offerings.map((offering, i) => {
                const Icon = offering.icon;
                return (
                  <RevealSection key={offering.title} delay={i * 100}>
                    <div className="bg-[#F7F5F0] p-8 rounded-[3px] hover:shadow-md transition-all duration-500 hover:-translate-y-1 group">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-5 group-hover:bg-[#28863E]/10 transition-colors duration-500">
                        <Icon className="w-5 h-5 text-[#28863E]" />
                      </div>
                      <h3 className="font-heading text-lg text-[#253541] mb-2">{offering.title}</h3>
                      <p className="text-sm text-[#253541]/60 leading-relaxed">{offering.desc}</p>
                    </div>
                  </RevealSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Opening Hours & Prices */}
      <section className="section-padding bg-[#F7F5F0]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Hours */}
            <RevealSection>
              <h2 className="font-heading text-[28px] text-[#253541] font-light mb-6">
                {t.wellnessPage.hoursTitle}
              </h2>
              <div className="gold-line mb-8" />
              {hoursLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-[#C8A96E]" />
                </div>
              ) : (
                <div className="bg-white rounded-[3px] overflow-hidden shadow-sm">
                  <table className="w-full">
                    <tbody>
                      {hours.map((row, i) => (
                        <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F0]/50'}`}>
                          <td className="px-5 py-3.5 text-sm text-[#253541] font-medium">{row.day}</td>
                          <td className="px-5 py-3.5 text-sm text-[#253541]/70">{row.time}</td>
                          <td className="px-5 py-3.5 text-sm text-[#C8A96E] italic">{row.note !== '–' ? row.note : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </RevealSection>

            {/* Prices & Contact */}
            <RevealSection delay={200}>
              <h2 className="font-heading text-[28px] text-[#253541] font-light mb-6">
                {t.wellnessPage.pricesTitle}
              </h2>
              <div className="gold-line mb-8" />
              <div className="space-y-3 mb-12">
                {prices.map((price, i) => (
                  <p key={i} className="text-base text-[#253541]/80">{price}</p>
                ))}
              </div>

              <h3 className="font-heading text-xl text-[#253541] mb-6">
                {t.wellnessPage.contactTitle}
              </h3>
              <div className="space-y-4">
                <a href={`tel:${t.wellnessPage.contactPhone}`} className="flex items-center gap-3 text-sm text-[#253541]/80 hover:text-[#28863E] transition-colors duration-300">
                  <Phone className="w-4 h-4 text-[#C8A96E]" />
                  {t.wellnessPage.contactPhone}
                </a>
                <a href={`mailto:${t.wellnessPage.contactEmail}`} className="flex items-center gap-3 text-sm text-[#253541]/80 hover:text-[#28863E] transition-colors duration-300">
                  <Mail className="w-4 h-4 text-[#C8A96E]" />
                  {t.wellnessPage.contactEmail}
                </a>
                <a href="https://waldsauna-badessen.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#253541]/80 hover:text-[#28863E] transition-colors duration-300">
                  <Globe className="w-4 h-4 text-[#C8A96E]" />
                  {t.wellnessPage.contactWeb}
                </a>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#253541]">
        <div className="container text-center">
          <RevealSection>
            <h2 className="font-heading text-[28px] md:text-[34px] text-white font-light mb-6">
              {t.wellnessPage.cta}
            </h2>
            <div className="gold-line mx-auto mb-8" />
            <Link
              href={bookUrl}
              className="inline-flex items-center gap-2 bg-[#28863E] text-white px-8 py-4 text-base tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-all duration-300 group"
            >
              {lang === 'de' ? 'Jetzt buchen' : 'Book Now'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </RevealSection>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
