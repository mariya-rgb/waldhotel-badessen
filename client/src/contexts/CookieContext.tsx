import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface CookieConsent {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
}

interface CookieContextType {
  consent: CookieConsent | null;
  showBanner: boolean;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  acceptAll: () => void;
  acceptEssential: () => void;
  saveConsent: (consent: CookieConsent) => void;
  openSettings: () => void;
}

const COOKIE_KEY = 'waldhotel_cookie_consent';

const CookieContext = createContext<CookieContextType | null>(null);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
        setShowBanner(false);
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    setConsent(newConsent);
    localStorage.setItem(COOKIE_KEY, JSON.stringify(newConsent));
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ essential: true, functional: true, analytics: true });
  }, [saveConsent]);

  const acceptEssential = useCallback(() => {
    saveConsent({ essential: true, functional: false, analytics: false });
  }, [saveConsent]);

  const openSettings = useCallback(() => {
    setShowBanner(true);
    setShowSettings(true);
  }, []);

  return (
    <CookieContext.Provider value={{
      consent,
      showBanner,
      showSettings,
      setShowSettings,
      acceptAll,
      acceptEssential,
      saveConsent,
      openSettings,
    }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (!context) throw new Error('useCookieConsent must be used within CookieProvider');
  return context;
}
