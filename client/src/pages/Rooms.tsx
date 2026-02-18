/*
 * Waldhotel Bad Essen – Zimmer & Suiten
 * Design: "Waldstille" – Cards with subtle shadows, asymmetric layout
 */
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/lib/images';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import HeroSection from '@/components/HeroSection';
import { ArrowRight, Wifi, Car, Coffee, Tv, Bath, Dog } from 'lucide-react';

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

export default function Rooms() {
  const { lang, t } = useLanguage();
  const bookUrl = lang === 'de' ? '/buchen' : '/en/book';

  const roomTypes = [
    {
      ...t.roomsPage.double,
      image: IMAGES.room,
      amenities: [Wifi, Tv, Coffee, Bath],
    },
    {
      ...t.roomsPage.single,
      image: IMAGES.hotelExterior2,
      amenities: [Wifi, Tv, Coffee, Bath],
    },
    {
      ...t.roomsPage.suite,
      image: IMAGES.hero,
      amenities: [Wifi, Tv, Coffee, Bath, Dog],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection
        image={IMAGES.room}
        title={t.roomsPage.heroTitle}
        alt={lang === 'de' ? 'Hotelzimmer im Waldhotel Bad Essen' : 'Hotel room at Waldhotel Bad Essen'}
        height="h-[60vh] min-h-[400px]"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container">
          <RevealSection className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg leading-[1.75] text-[#253541]/80">
              {t.roomsPage.intro}
            </p>
            <div className="gold-line mx-auto mt-8" />
          </RevealSection>
        </div>
      </section>

      {/* Room Types */}
      <section className="pb-20 bg-white">
        <div className="container">
          <div className="space-y-24">
            {roomTypes.map((room, index) => (
              <RevealSection key={room.title}>
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}>
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative overflow-hidden group">
                      {/* <!-- TODO: Echtes Foto einfügen --> */}
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-[350px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <p className="subtitle-caps mb-3">{t.roomsPage.heroTitle}</p>
                    <h2 className="font-heading text-[28px] md:text-[34px] text-[#253541] font-light leading-tight mb-4">
                      {room.title}
                    </h2>
                    <div className="gold-line mb-6" />
                    <p className="text-base leading-[1.75] text-[#253541]/80 mb-6">
                      {room.desc}
                    </p>
                    <div className="flex gap-4 mb-6">
                      {room.amenities.map((Icon, i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-[#F7F5F0] flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#253541]/60" />
                        </div>
                      ))}
                    </div>
                    <p className="text-lg font-heading text-[#C8A96E] mb-6">{room.price}</p>
                    <Link
                      href={bookUrl}
                      className="inline-flex items-center gap-2 bg-[#28863E] text-white px-6 py-3 text-sm tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-all duration-300 group"
                    >
                      {room.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Extras Table */}
      <section className="section-padding bg-[#F7F5F0]">
        <div className="container">
          <RevealSection className="max-w-3xl mx-auto">
            <h2 className="font-heading text-[28px] text-[#253541] font-light text-center mb-8">
              {t.roomsPage.extras}
            </h2>
            <div className="gold-line mx-auto mb-10" />
            <div className="bg-white rounded-[3px] overflow-hidden shadow-sm">
              <table className="w-full">
                <tbody>
                  {t.roomsPage.extrasData.map((item, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F0]/50'}`}>
                      <td className="px-6 py-4 text-sm text-[#253541]/80">{item.service}</td>
                      <td className="px-6 py-4 text-sm text-[#253541] font-medium text-right">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>

          {/* Notes */}
          <RevealSection className="max-w-3xl mx-auto mt-12" delay={200}>
            <div className="space-y-3">
              {t.roomsPage.notes.map((note, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] mt-2 flex-shrink-0" />
                  <p className="text-sm text-[#253541]/70">{note}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
