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
        { href: '/wellness', label: t.nav.wellness },
        { href: '/bad-essen', label: t.nav.location },
        { href: '/buchen', label: t.nav.book },
      ]
    : [
        { href: '/en', label: t.nav.home },
        { href: '/en/rooms', label: t.nav.rooms },
        { href: '/en/wellness', label: t.nav.wellness },
        { href: '/en/location', label: t.nav.location },
        { href: '/en/book', label: t.nav.book },
      ];

  const switchLang = () => {
    const newLang = lang === 'de' ? 'en' : 'de';
    setLang(newLang);
    // Navigate to equivalent page
    const pathMap: Record<string, string> = lang === 'de'
      ? { '/': '/en', '/zimmer': '/en/rooms', '/wellness': '/en/wellness', '/bad-essen': '/en/location', '/buchen': '/en/book', '/impressum': '/en/imprint', '/datenschutz': '/en/privacy' }
      : { '/en': '/', '/en/rooms': '/zimmer', '/en/wellness': '/wellness', '/en/location': '/bad-essen', '/en/book': '/buchen', '/en/imprint': '/impressum', '/en/privacy': '/datenschutz' };
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

        {/* Right side: Language + CTA + Phone */}
        <div className="hidden lg:flex items-center gap-4">
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
