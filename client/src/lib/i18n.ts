// Waldhotel Bad Essen – Internationalization (DE/EN)
// Design: "Waldstille" – Japandi Minimalism

export type Lang = 'de' | 'en';

export const translations = {
  de: {
    nav: {
      home: 'Startseite',
      rooms: 'Zimmer & Suiten',
      wellness: 'Waldsauna & Wellness',
      location: 'Lage & Umgebung',
      book: 'Buchen',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
    },
    hero: {
      title: 'Waldhotel Bad Essen',
      subtitle: 'Seit 1906. Ankommen. Aufatmen. Aufleben.',
      cta: 'Zimmer buchen',
    },
    hotel: {
      label: 'Das Hotel',
      title: 'Tradition trifft Natur',
      text1: 'Seit 1906 empfängt das Waldhotel Bad Essen seine Gäste am Fuße des Wiehengebirges. Das historische Fachwerkhaus verbindet den Charme vergangener Zeiten mit modernem Komfort – ein Ort, an dem man ankommt und zur Ruhe findet.',
      text2: '19 individuell eingerichtete Zimmer bieten Ihnen alles, was Sie für einen erholsamen Aufenthalt brauchen: Boxspringbetten, Blick ins Grüne, kostenfreies WLAN und Parkplätze direkt am Haus.',
      cta: 'Unsere Zimmer entdecken',
    },
    wellness: {
      label: 'Wellness',
      title: 'Die Waldsauna',
      text: 'Auf über 500 m² erwartet Sie direkt am Hotel eine Saunalandschaft, die alle Sinne anspricht. Bio-Sauna, finnische Sauna, Dampfbad und Außen-Sauna – eingebettet in die Natur des Wiehengebirges.',
      cta: 'Wellness erleben',
    },
    location: {
      label: 'Lage & Umgebung',
      title: 'Bad Essen entdecken',
      text: 'Bad Essen – Cittàslow am Wiehengebirge. Wo das Leben entschleunigt und die Natur den Takt vorgibt. Wittekindsweg, Schloss Ippenburg, Sole-Arena und historische Fachwerk-Altstadt.',
      cta: 'Bad Essen entdecken',
    },
    booking: {
      label: 'Direkt buchen',
      title: 'Buchen Sie direkt – zum besten Preis',
      text: 'Buchen Sie direkt – zum besten Preis, ohne Umwege.',
      also: 'Auch buchbar über:',
    },
    footer: {
      address: 'Bergstraße 51, 49152 Bad Essen',
      phone: '05472 – 95 84 303',
      email: 'kontakt@waldhotel-badessen.de',
      legal: 'Rechtliches',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
      agb: 'AGB',
      cookieSettings: 'Cookie-Einstellungen',
      copyright: '© 2025 Waldhotel Bad Essen',
    },
    // Rooms page
    roomsPage: {
      heroTitle: 'Zimmer & Suiten',
      intro: 'Alle 19 Zimmer bieten Boxspringbetten, Blick ins Wiehengebirge und den Charme eines Fachwerkhauses – kombiniert mit modernem Komfort.',
      double: {
        title: 'Doppelzimmer',
        desc: 'Doppel-Boxspringbett, Flachbild-TV, Bad mit Dusche & Fön, Telefon, Teestation, WLAN. Nichtraucherzimmer.',
        price: 'Ab 89 € / Nacht',
        cta: 'Doppelzimmer buchen',
      },
      single: {
        title: 'Einzelzimmer',
        desc: 'Gleiche hochwertige Ausstattung für eine Person. Boxspringbett, Flachbild-TV, Bad mit Dusche & Fön, WLAN.',
        price: 'Ab 69 € / Nacht',
        cta: 'Einzelzimmer buchen',
      },
      suite: {
        title: 'Waldsuite',
        desc: 'Geräumige Premium-Kategorie mit besonderem Blick ins Wiehengebirge. Großzügiger Wohnbereich und gehobene Ausstattung.',
        price: 'Ab 119 € / Nacht',
        cta: 'Waldsuite buchen',
      },
      extras: 'Zusatzleistungen',
      extrasData: [
        { service: 'Frühstück (Hotelgäste)', price: '14,50 € / Person' },
        { service: 'Frühstück (externe Gäste)', price: '20,50 € / Person' },
        { service: 'Hund', price: '10,00 € / Nacht' },
        { service: 'Zustellbett', price: '30,00 € / Nacht' },
        { service: 'Waldsauna-Tageskarte (Hotelgäste)', price: '18,50 € / Tag' },
        { service: 'Waldsauna-Tageskarte (extern)', price: '22,50 € / Tag' },
      ],
      notes: [
        'Erdgeschosszimmer rollstuhlgerecht, Platz für 4-köpfige Familie',
        'Hunde willkommen nach vorheriger Absprache',
        'Kostenlose Parkplätze und WLAN',
      ],
    },
    // Wellness page
    wellnessPage: {
      heroTitle: 'Waldsauna & Wellness',
      intro: 'Direkt am Hotel – die Waldsauna Bad Essen. Auf über 500 m² erwartet Sie eine Saunalandschaft, die alle Sinne anspricht. Eingebettet in die Natur des Wiehengebirges.',
      offerings: [
        { title: 'Bio-Sauna', desc: 'Sanfte Wärme bei ca. 60°C' },
        { title: 'Finnische Sauna', desc: 'Klassisch bei ca. 90°C' },
        { title: 'Dampfbad', desc: 'Wohltuend feucht' },
        { title: 'Tauchbecken', desc: 'Erfrischung nach dem Saunagang' },
        { title: 'Außen-Sauna', desc: 'Saunieren unter freiem Himmel im Saunagarten' },
      ],
      hoursTitle: 'Öffnungszeiten',
      hours: [
        { day: 'Montag', time: 'Geschlossen', note: '–' },
        { day: 'Dienstag', time: '16:00 – 22:00', note: 'Damensauna' },
        { day: 'Mittwoch', time: 'Geschlossen', note: '–' },
        { day: 'Donnerstag', time: 'Geschlossen', note: '–' },
        { day: 'Freitag', time: '16:00 – 22:00', note: '–' },
        { day: 'Samstag', time: '14:00 – 20:00', note: '–' },
        { day: 'Sonntag', time: '12:00 – 20:00', note: '–' },
      ],
      pricesTitle: 'Preise',
      priceGuest: 'Hotelgäste: 18,50 € / Tag',
      priceExternal: 'Externe Gäste: 22,50 € / Tag',
      contactTitle: 'Kontakt Waldsauna',
      contactPhone: '0170-3875388',
      contactEmail: 'info@waldsauna-badessen.de',
      contactWeb: 'waldsauna-badessen.de',
      cta: 'Zimmer mit Wellness buchen',
    },
    // Location page
    locationPage: {
      heroTitle: 'Lage & Umgebung',
      intro: 'Bad Essen – Cittàslow am Wiehengebirge. Wo das Leben entschleunigt und die Natur den Takt vorgibt.',
      nature: {
        title: 'Natur & Wandern',
        items: ['Wittekindsweg (direkt vor der Tür)', 'Wiehengebirge-Wanderrouten', 'TERRA.vita Natur- und Geopark'],
      },
      culture: {
        title: 'Kultur & Sehenswertes',
        items: ['Schloss Ippenburg (Gartenfestival)', 'Historische Fachwerk-Altstadt', 'St.-Nikolai-Kirche', 'Varusschlacht-Museum Kalkriese (Nähe)'],
      },
      health: {
        title: 'Gesundheit & Erholung',
        items: ['SolePark mit Gradierwerk', 'Kneipp-Anlage', 'Cittàslow-Philosophie: Entschleunigung'],
      },
      directions: {
        title: 'Anfahrt',
        text: 'Über die A30, Abfahrt Melle oder Bohmte – in ca. 15 Min. erreichbar. Kostenlose Parkplätze direkt am Hotel. Bushaltestelle „Waldhotel" in 200m Entfernung.',
      },
      mapConsent: 'Karte laden',
      mapConsentText: 'Mit dem Laden der Karte akzeptieren Sie die Datenschutzerklärung von Google.',
    },
    // Booking page
    bookingPage: {
      title: 'Direkt buchen – bester Preis garantiert',
      intro: 'Buchen Sie Ihren Aufenthalt im Waldhotel Bad Essen direkt und ohne Umwege. Wählen Sie Ihren Wunschzeitraum und Zimmertyp.',
      phone: 'Sie möchten lieber telefonisch buchen? Rufen Sie uns an:',
      emailText: 'Oder schreiben Sie uns:',
      also: 'Auch buchbar über:',
    },
    // Cookie banner
    cookie: {
      title: 'Cookie-Einstellungen',
      text: 'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.',
      essential: 'Essenziell',
      essentialDesc: 'Notwendig für die Grundfunktionen der Website.',
      functional: 'Funktional',
      functionalDesc: 'Ermöglichen erweiterte Funktionen wie Google Maps.',
      analytics: 'Analyse / Marketing',
      analyticsDesc: 'Helfen uns, die Website zu verbessern.',
      acceptAll: 'Alle akzeptieren',
      settings: 'Einstellungen',
      essentialOnly: 'Nur essenzielle Cookies',
      save: 'Auswahl speichern',
      privacyLink: 'Datenschutzerklärung',
    },
  },
  en: {
    nav: {
      home: 'Home',
      rooms: 'Rooms & Suites',
      wellness: 'Forest Sauna & Wellness',
      location: 'Location & Surroundings',
      book: 'Book Now',
      imprint: 'Imprint',
      privacy: 'Privacy Policy',
    },
    hero: {
      title: 'Waldhotel Bad Essen',
      subtitle: 'Since 1906. Arrive. Breathe. Revive.',
      cta: 'Book a Room',
    },
    hotel: {
      label: 'The Hotel',
      title: 'Tradition Meets Nature',
      text1: 'Since 1906, the Waldhotel Bad Essen has welcomed guests at the foot of the Wiehengebirge mountains. This historic half-timbered house combines the charm of bygone times with modern comfort – a place where you arrive and find peace.',
      text2: '19 individually designed rooms offer everything you need for a relaxing stay: box-spring beds, views of the green landscape, complimentary WiFi and parking right at the hotel.',
      cta: 'Discover Our Rooms',
    },
    wellness: {
      label: 'Wellness',
      title: 'The Forest Sauna',
      text: 'On over 500 m², a sauna landscape that appeals to all senses awaits you right at the hotel. Bio sauna, Finnish sauna, steam bath and outdoor sauna – nestled in the nature of the Wiehengebirge.',
      cta: 'Experience Wellness',
    },
    location: {
      label: 'Location & Surroundings',
      title: 'Discover Bad Essen',
      text: 'Bad Essen – a Cittàslow town at the Wiehengebirge. Where life slows down and nature sets the pace. Wittekindsweg trail, Ippenburg Castle, Sole Arena and historic half-timbered old town.',
      cta: 'Discover Bad Essen',
    },
    booking: {
      label: 'Book Direct',
      title: 'Book Directly – Best Price Guaranteed',
      text: 'Book directly – best price, no detours.',
      also: 'Also bookable via:',
    },
    footer: {
      address: 'Bergstraße 51, 49152 Bad Essen',
      phone: '+49 5472 – 95 84 303',
      email: 'kontakt@waldhotel-badessen.de',
      legal: 'Legal',
      imprint: 'Imprint',
      privacy: 'Privacy Policy',
      agb: 'Terms',
      cookieSettings: 'Cookie Settings',
      copyright: '© 2025 Waldhotel Bad Essen',
    },
    roomsPage: {
      heroTitle: 'Rooms & Suites',
      intro: 'All 19 rooms feature box-spring beds, views of the Wiehengebirge and the charm of a half-timbered house – combined with modern comfort.',
      double: {
        title: 'Double Room',
        desc: 'Double box-spring bed, flat-screen TV, bathroom with shower & hairdryer, telephone, tea station, WiFi. Non-smoking room.',
        price: 'From €89 / night',
        cta: 'Book Double Room',
      },
      single: {
        title: 'Single Room',
        desc: 'Same high-quality amenities for one person. Box-spring bed, flat-screen TV, bathroom with shower & hairdryer, WiFi.',
        price: 'From €69 / night',
        cta: 'Book Single Room',
      },
      suite: {
        title: 'Forest Suite',
        desc: 'Spacious premium category with a special view of the Wiehengebirge. Generous living area and upscale amenities.',
        price: 'From €119 / night',
        cta: 'Book Forest Suite',
      },
      extras: 'Additional Services',
      extrasData: [
        { service: 'Breakfast (hotel guests)', price: '€14.50 / person' },
        { service: 'Breakfast (external guests)', price: '€20.50 / person' },
        { service: 'Dog', price: '€10.00 / night' },
        { service: 'Extra bed', price: '€30.00 / night' },
        { service: 'Forest sauna day pass (hotel guests)', price: '€18.50 / day' },
        { service: 'Forest sauna day pass (external)', price: '€22.50 / day' },
      ],
      notes: [
        'Ground floor rooms wheelchair accessible, space for family of 4',
        'Dogs welcome by prior arrangement',
        'Free parking and WiFi',
      ],
    },
    wellnessPage: {
      heroTitle: 'Forest Sauna & Wellness',
      intro: 'Right at the hotel – the Forest Sauna Bad Essen. On over 500 m², a sauna landscape that appeals to all senses awaits you. Nestled in the nature of the Wiehengebirge.',
      offerings: [
        { title: 'Bio Sauna', desc: 'Gentle warmth at approx. 60°C' },
        { title: 'Finnish Sauna', desc: 'Classic at approx. 90°C' },
        { title: 'Steam Bath', desc: 'Soothing humidity' },
        { title: 'Plunge Pool', desc: 'Refreshment after the sauna session' },
        { title: 'Outdoor Sauna', desc: 'Sauna under the open sky in the sauna garden' },
      ],
      hoursTitle: 'Opening Hours',
      hours: [
        { day: 'Monday', time: 'Closed', note: '–' },
        { day: 'Tuesday', time: '4:00 PM – 10:00 PM', note: "Ladies' sauna" },
        { day: 'Wednesday', time: 'Closed', note: '–' },
        { day: 'Thursday', time: 'Closed', note: '–' },
        { day: 'Friday', time: '4:00 PM – 10:00 PM', note: '–' },
        { day: 'Saturday', time: '2:00 PM – 8:00 PM', note: '–' },
        { day: 'Sunday', time: '12:00 PM – 8:00 PM', note: '–' },
      ],
      pricesTitle: 'Prices',
      priceGuest: 'Hotel guests: €18.50 / day',
      priceExternal: 'External guests: €22.50 / day',
      contactTitle: 'Forest Sauna Contact',
      contactPhone: '+49 170-3875388',
      contactEmail: 'info@waldsauna-badessen.de',
      contactWeb: 'waldsauna-badessen.de',
      cta: 'Book Room with Wellness',
    },
    locationPage: {
      heroTitle: 'Location & Surroundings',
      intro: 'Bad Essen – a Cittàslow town at the Wiehengebirge. Where life slows down and nature sets the pace.',
      nature: {
        title: 'Nature & Hiking',
        items: ['Wittekindsweg trail (right at the doorstep)', 'Wiehengebirge hiking routes', 'TERRA.vita Nature and Geopark'],
      },
      culture: {
        title: 'Culture & Sights',
        items: ['Ippenburg Castle (Garden Festival)', 'Historic half-timbered old town', 'St. Nikolai Church', 'Varusschlacht Museum Kalkriese (nearby)'],
      },
      health: {
        title: 'Health & Relaxation',
        items: ['SolePark with graduation tower', 'Kneipp facility', 'Cittàslow philosophy: Deceleration'],
      },
      directions: {
        title: 'Getting Here',
        text: 'Via the A30 motorway, exit Melle or Bohmte – reachable in approx. 15 minutes. Free parking right at the hotel. Bus stop "Waldhotel" 200m away.',
      },
      mapConsent: 'Load Map',
      mapConsentText: 'By loading the map, you accept Google\'s privacy policy.',
    },
    bookingPage: {
      title: 'Book Directly – Best Price Guaranteed',
      intro: 'Book your stay at the Waldhotel Bad Essen directly and without detours. Choose your preferred dates and room type.',
      phone: 'Prefer to book by phone? Call us:',
      emailText: 'Or write to us:',
      also: 'Also bookable via:',
    },
    cookie: {
      title: 'Cookie Settings',
      text: 'We use cookies to provide you with the best possible experience on our website.',
      essential: 'Essential',
      essentialDesc: 'Necessary for basic website functions.',
      functional: 'Functional',
      functionalDesc: 'Enable extended features like Google Maps.',
      analytics: 'Analytics / Marketing',
      analyticsDesc: 'Help us improve the website.',
      acceptAll: 'Accept All',
      settings: 'Settings',
      essentialOnly: 'Essential Cookies Only',
      save: 'Save Selection',
      privacyLink: 'Privacy Policy',
    },
  },
} as const;

export function getTranslation(lang: Lang) {
  return translations[lang];
}

export function getBookingUrl(lang: Lang) {
  return lang === 'de' ? '/buchen' : '/en/book';
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === 'en') {
    const map: Record<string, string> = {
      '/': '/en',
      '/zimmer': '/en/rooms',
      '/wellness': '/en/wellness',
      '/bad-essen': '/en/location',
      '/buchen': '/en/book',
      '/impressum': '/en/imprint',
      '/datenschutz': '/en/privacy',
    };
    return map[path] || `/en${path}`;
  }
  return path;
}
