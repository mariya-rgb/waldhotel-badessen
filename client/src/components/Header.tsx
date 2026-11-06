/*
 * Waldhotel Bad Essen – Header Component
 * Design: "Waldstille" – Sticky header, transparent on hero, solid on scroll
 * Colors: Primary #253541, Accent #28863E, Gold #C8A96E
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/lib/images';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location === '/' || location === '/en';

  const navLinks = lang === 'de'
    ? [
        { href: '/', label: t.nav.home },
        { href: '/zimmer', label: t.nav.rooms },
        { href: '/erlebnisse', label: t.nav.experiences },
        { href: '/bad-essen', label: t.nav.location },
        { href: '/buchen', label: t.nav.book },
      ]
    : [
        { href: '/en', label: t.nav.home },
        { href: '/en/rooms', label: t.nav.rooms },
        { href: '/en/experiences', label: t.nav.experiences },
        { href: '/en/location', label: t.nav.location },
        { href: '/en/book', label: t.nav.book },
      ];

  const switchLang = () => {
    const newLang = lang === 'de' ? 'en' : 'de';
    setLang(newLang);
    // Navigate to equivalent page
    const pathMap: Record<string, string> = lang === 'de'
      ? { '/': '/en', '/zimmer': '/en/rooms', '/erlebnisse': '/en/experiences', '/bad-essen': '/en/location', '/buchen': '/en/book', '/impressum': '/en/imprint', '/datenschutz': '/en/privacy' }
      : { '/en': '/', '/en/rooms': '/zimmer', '/en/experiences': '/erlebnisse', '/en/location': '/bad-essen', '/en/book': '/buchen', '/en/imprint': '/impressum', '/en/privacy': '/datenschutz' };
    const newPath = pathMap[location] || (newLang === 'en' ? '/en' : '/');
    window.location.href = newPath;
  };

  const headerBg = scrolled || !isHome || mobileOpen
    ? 'bg-white/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent';

  const textColor = scrolled || !isHome || mobileOpen
    ? 'text-[#253541]'
    : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href={lang === 'de' ? '/' : '/en'} className="flex items-center gap-3">
          <img
            src={IMAGES.logo}
            alt="Waldhotel Bad Essen"
            className="h-12 w-auto"
            loading="eager"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors duration-300 hover:text-[#C8A96E] ${textColor} ${
                location === link.href ? 'text-[#C8A96E]' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Social + Language + CTA + Phone */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://www.instagram.com/waldhotel_bad_essen_sauna"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center transition-colors duration-300 hover:text-[#C8A96E] ${textColor}`}
            aria-label="Instagram"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a
            href="https://www.facebook.com/share/1GUfiaGY8g/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center transition-colors duration-300 hover:text-[#C8A96E] ${textColor}`}
            aria-label="Facebook"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z"/></svg>
          </a>
          <a
            href="tel:+4917632419623"
            className={`flex items-center gap-1.5 text-sm transition-colors duration-300 hover:text-[#C8A96E] ${textColor}`}
            aria-label={lang === 'de' ? 'Anrufen' : 'Call us'}
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={switchLang}
            className={`text-sm font-medium tracking-wider transition-colors duration-300 hover:text-[#C8A96E] ${textColor}`}
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>
          <Link
            href={lang === 'de' ? '/buchen' : '/en/book'}
            className="bg-[#28863E] text-white px-5 py-2.5 text-sm tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-colors duration-300"
          >
            {lang === 'de' ? 'Jetzt buchen' : 'Book Now'}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 ${textColor}`}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#F7F5F0] animate-in slide-in-from-top duration-300">
          <nav className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[#253541] text-base py-2 border-b border-[#F7F5F0] last:border-0 ${
                  location === link.href ? 'text-[#C8A96E]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4">
              <a href="https://www.instagram.com/waldhotel_bad_essen_sauna" target="_blank" rel="noopener noreferrer" className="text-[#253541] hover:text-[#C8A96E] transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1GUfiaGY8g/" target="_blank" rel="noopener noreferrer" className="text-[#253541] hover:text-[#C8A96E] transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z"/></svg>
              </a>
              <button
                onClick={switchLang}
                className="text-sm font-medium text-[#253541] tracking-wider hover:text-[#C8A96E]"
              >
                {lang === 'de' ? 'English' : 'Deutsch'}
              </button>
              <Link
                href={lang === 'de' ? '/buchen' : '/en/book'}
                className="bg-[#28863E] text-white px-5 py-2.5 text-sm tracking-wide rounded-[3.5px] flex-1 text-center"
              >
                {lang === 'de' ? 'Jetzt buchen' : 'Book Now'}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
