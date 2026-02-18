/*
 * Waldhotel Bad Essen – Cookie Consent Banner
 * DSGVO-konform: Opt-in für nicht-essenzielle Cookies
 * Design: Bottom bar, matching color scheme
 */
import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/contexts/CookieContext';

export default function CookieBanner() {
  const { lang, t } = useLanguage();
  const { showBanner, showSettings, setShowSettings, acceptAll, acceptEssential, saveConsent } = useCookieConsent();
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] animate-in slide-in-from-bottom duration-500">
      <div className="bg-[#253541] text-white border-t border-[#C8A96E]/30">
        <div className="container py-5">
          {!showSettings ? (
            /* Simple banner */
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-heading text-base mb-1">{t.cookie.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {t.cookie.text}{' '}
                  <Link href={lang === 'de' ? '/datenschutz' : '/en/privacy'} className="text-[#C8A96E] underline underline-offset-2">
                    {t.cookie.privacyLink}
                  </Link>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={acceptAll}
                  className="bg-[#28863E] text-white px-5 py-2.5 text-sm rounded-[3.5px] hover:bg-[#1f6d32] transition-colors duration-300"
                >
                  {t.cookie.acceptAll}
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="bg-white/10 text-white px-5 py-2.5 text-sm rounded-[3.5px] hover:bg-white/20 transition-colors duration-300"
                >
                  {t.cookie.settings}
                </button>
                <button
                  onClick={acceptEssential}
                  className="bg-[#E6E6E6] text-[#444444] px-5 py-2.5 text-sm rounded-[3.5px] hover:bg-[#d4d4d4] transition-colors duration-300"
                >
                  {t.cookie.essentialOnly}
                </button>
              </div>
            </div>
          ) : (
            /* Settings panel */
            <div>
              <h3 className="font-heading text-base mb-4">{t.cookie.title}</h3>
              <div className="space-y-4 mb-6">
                {/* Essential - always on */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-10 h-5 bg-[#28863E] rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.cookie.essential}</p>
                    <p className="text-xs text-white/50">{t.cookie.essentialDesc}</p>
                  </div>
                </div>
                {/* Functional */}
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => setFunctional(!functional)}
                    className="mt-1"
                  >
                    <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${functional ? 'bg-[#28863E]' : 'bg-white/20'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${functional ? 'right-0.5' : 'left-0.5'}`} />
                    </div>
                  </button>
                  <div>
                    <p className="text-sm font-medium">{t.cookie.functional}</p>
                    <p className="text-xs text-white/50">{t.cookie.functionalDesc}</p>
                  </div>
                </div>
                {/* Analytics */}
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => setAnalytics(!analytics)}
                    className="mt-1"
                  >
                    <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${analytics ? 'bg-[#28863E]' : 'bg-white/20'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${analytics ? 'right-0.5' : 'left-0.5'}`} />
                    </div>
                  </button>
                  <div>
                    <p className="text-sm font-medium">{t.cookie.analytics}</p>
                    <p className="text-xs text-white/50">{t.cookie.analyticsDesc}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={acceptAll}
                  className="bg-[#28863E] text-white px-5 py-2.5 text-sm rounded-[3.5px] hover:bg-[#1f6d32] transition-colors duration-300"
                >
                  {t.cookie.acceptAll}
                </button>
                <button
                  onClick={() => saveConsent({ essential: true, functional, analytics })}
                  className="bg-white/10 text-white px-5 py-2.5 text-sm rounded-[3.5px] hover:bg-white/20 transition-colors duration-300"
                >
                  {t.cookie.save}
                </button>
                <button
                  onClick={acceptEssential}
                  className="bg-[#E6E6E6] text-[#444444] px-5 py-2.5 text-sm rounded-[3.5px] hover:bg-[#d4d4d4] transition-colors duration-300"
                >
                  {t.cookie.essentialOnly}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
