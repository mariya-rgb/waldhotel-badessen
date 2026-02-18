import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CookieProvider } from '@/contexts/CookieContext';

function NotFoundContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="h-20" />
      <main className="flex-1 flex items-center justify-center section-padding">
        <div className="text-center">
          <p className="subtitle-caps mb-4">404</p>
          <h1 className="font-heading text-[42px] text-[#253541] font-light mb-4">
            Seite nicht gefunden
          </h1>
          <div className="gold-line mx-auto mb-8" />
          <p className="text-base text-[#253541]/60 mb-8 max-w-md mx-auto">
            Die gewünschte Seite konnte leider nicht gefunden werden.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#28863E] text-white px-7 py-3.5 text-sm tracking-wide rounded-[3.5px] hover:bg-[#1f6d32] transition-all duration-300"
          >
            Zur Startseite
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function NotFound() {
  return (
    <LanguageProvider initialLang="de">
      <CookieProvider>
        <NotFoundContent />
      </CookieProvider>
    </LanguageProvider>
  );
}
