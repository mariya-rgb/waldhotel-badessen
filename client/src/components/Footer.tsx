/*
 * Waldhotel Bad Essen – Footer Component
 * Design: "Waldstille" – Dark background (#253541), gold accents, clean layout
 */
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/contexts/CookieContext';
import { IMAGES } from '@/lib/images';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { lang, t } = useLanguage();
  const { openSettings } = useCookieConsent();

  return (
    <footer className="bg-[#253541] text-white/80">
      {/* Gold line separator */}
      <div className="w-full h-px bg-[#C8A96E]" />
      
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <img
              src={IMAGES.logoWhite}
              alt="Waldhotel Bad Essen"
              className="h-14 w-auto mb-6 opacity-90"
            />
            <p className="text-sm leading-relaxed text-white/60">
              {lang === 'de'
                ? 'Traditionshaus seit 1906 am Wiehengebirge. Ankommen. Aufatmen. Aufleben.'
                : 'Traditional hotel since 1906 at the Wiehengebirge. Arrive. Breathe. Revive.'}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C8A96E] text-xs tracking-[0.15em] uppercase mb-6">
              {lang === 'de' ? 'Kontakt' : 'Contact'}
            </h4>
            <div className="space-y-4">
              <a href="https://maps.google.com/?q=Bergstraße+51,+49152+Bad+Essen" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm hover:text-[#C8A96E] transition-colors duration-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C8A96E]" />
                <span>{t.footer.address}</span>
              </a>
              <a href="tel:+4917632419623" className="flex items-center gap-3 text-sm hover:text-[#C8A96E] transition-colors duration-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#C8A96E]" />
                <span>{t.footer.phone}</span>
              </a>
              <a href="mailto:kontakt@waldhotel-badessen.de" className="flex items-center gap-3 text-sm hover:text-[#C8A96E] transition-colors duration-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#C8A96E]" />
                <span>{t.footer.email}</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#C8A96E] text-xs tracking-[0.15em] uppercase mb-6">
              {lang === 'de' ? 'Navigation' : 'Navigation'}
            </h4>
            <nav className="space-y-3">
              {lang === 'de' ? (
                <>
                  <Link href="/zimmer" className="block text-sm hover:text-[#C8A96E] transition-colors duration-300">{t.nav.rooms}</Link>
                  <Link href="/bad-essen" className="block text-sm hover:text-[#C8A96E] transition-colors duration-300">{t.nav.location}</Link>
                  <Link href="/buchen" className="block text-sm hover:text-[#C8A96E] transition-colors duration-300">{t.nav.book}</Link>
                </>
              ) : (
                <>
                  <Link href="/en/rooms" className="block text-sm hover:text-[#C8A96E] transition-colors duration-300">{t.nav.rooms}</Link>
                  <Link href="/en/location" className="block text-sm hover:text-[#C8A96E] transition-colors duration-300">{t.nav.location}</Link>
                  <Link href="/en/book" className="block text-sm hover:text-[#C8A96E] transition-colors duration-300">{t.nav.book}</Link>
                </>
              )}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#C8A96E] text-xs tracking-[0.15em] uppercase mb-6">
              {t.footer.legal}
            </h4>
            <nav className="space-y-3">
              <Link href={lang === 'de' ? '/impressum' : '/en/imprint'} className="block text-sm hover:text-[#C8A96E] transition-colors duration-300">
                {t.footer.imprint}
              </Link>
              <Link href={lang === 'de' ? '/datenschutz' : '/en/privacy'} className="block text-sm hover:text-[#C8A96E] transition-colors duration-300">
                {t.footer.privacy}
              </Link>
              <button
                onClick={openSettings}
                className="block text-sm hover:text-[#C8A96E] transition-colors duration-300 text-left"
              >
                {t.footer.cookieSettings}
              </button>
            </nav>
            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/waldhotel_bad_essen_sauna" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C8A96E] hover:text-[#C8A96E] transition-all duration-300" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1GUfiaGY8g/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C8A96E] hover:text-[#C8A96E] transition-all duration-300" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">{t.footer.copyright}</p>
          <button
            onClick={() => {
              const newLang = lang === 'de' ? 'en' : 'de';
              window.location.href = newLang === 'en' ? '/en' : '/';
            }}
            className="text-xs text-white/40 hover:text-[#C8A96E] transition-colors duration-300"
          >
            {lang === 'de' ? 'English Version' : 'Deutsche Version'}
          </button>
        </div>
      </div>
    </footer>
  );
}
