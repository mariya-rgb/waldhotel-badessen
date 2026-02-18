/*
 * Waldhotel Bad Essen – Buchungsseite
 * Design: "Waldstille" – Clean, focused on booking widget
 * Beds24 iframe integration
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { Phone, Mail } from 'lucide-react';

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

export default function Booking() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Booking Header */}
      <section className="section-padding bg-white">
        <div className="container">
          <RevealSection className="max-w-3xl mx-auto text-center">
            <p className="subtitle-caps mb-4">{lang === 'de' ? 'Online-Buchung' : 'Online Booking'}</p>
            <h1 className="font-heading text-[34px] md:text-[42px] text-[#253541] font-light leading-tight mb-6">
              {t.bookingPage.title}
            </h1>
            <div className="gold-line mx-auto mb-8" />
            <p className="text-base leading-[1.75] text-[#253541]/80">
              {t.bookingPage.intro}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Beds24 Widget */}
      <section className="pb-16 bg-white">
        <div className="container">
          <div className="max-w-[960px] mx-auto">
            <iframe
              src="https://beds24.com/booking.php?propid=297222&type=0&referer=BookingButton"
              width="100%"
              height="800"
              frameBorder="0"
              style={{ border: 'none', maxWidth: '960px', margin: '0 auto', display: 'block' }}
              title={lang === 'de' ? 'Online-Buchung Waldhotel Bad Essen' : 'Online Booking Waldhotel Bad Essen'}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Contact alternatives */}
      <section className="section-padding bg-[#F7F5F0]">
        <div className="container">
          <RevealSection className="max-w-2xl mx-auto text-center">
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-3">
                <Phone className="w-5 h-5 text-[#C8A96E]" />
                <p className="text-base text-[#253541]/80">
                  {t.bookingPage.phone}
                </p>
                <a href="tel:+4954729584303" className="text-lg font-heading text-[#253541] hover:text-[#28863E] transition-colors duration-300">
                  05472 – 95 84 303
                </a>
              </div>
              <div className="gold-line mx-auto" />
              <div className="flex flex-col items-center gap-3">
                <Mail className="w-5 h-5 text-[#C8A96E]" />
                <p className="text-base text-[#253541]/80">
                  {t.bookingPage.emailText}
                </p>
                <a href="mailto:kontakt@waldhotel-badessen.de" className="text-lg font-heading text-[#253541] hover:text-[#28863E] transition-colors duration-300">
                  kontakt@waldhotel-badessen.de
                </a>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Also bookable via */}
      <section className="py-12 bg-white">
        <div className="container text-center">
          <p className="text-sm text-[#253541]/50 mb-6">{t.bookingPage.also}</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <a href="https://www.booking.com/hotel/de/mullers-im-waldquartier.de.html" target="_blank" rel="noopener noreferrer" className="text-[#253541]/40 hover:text-[#253541]/70 transition-colors duration-300 text-sm font-medium tracking-wide">
              Booking.com
            </a>
            <span className="text-[#C8A96E]">|</span>
            <a href="https://www.tripadvisor.com/HotelHighlight-g644182-d24009515" target="_blank" rel="noopener noreferrer" className="text-[#253541]/40 hover:text-[#253541]/70 transition-colors duration-300 text-sm font-medium tracking-wide">
              Tripadvisor
            </a>
            <span className="text-[#C8A96E]">|</span>
            <a href="https://www.agoda.com/de-de/hotel-mullers-im-waldquartier/hotel/all/bad-essen-de.html" target="_blank" rel="noopener noreferrer" className="text-[#253541]/40 hover:text-[#253541]/70 transition-colors duration-300 text-sm font-medium tracking-wide">
              Agoda
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
