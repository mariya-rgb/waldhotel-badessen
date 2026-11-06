// Waldhotel Bad Essen – Internationalization (DE/EN)
// Design: "Waldstille" – Japandi Minimalism

export type Lang = 'de' | 'en';

export const translations = {
  de: {
    nav: {
      home: 'Startseite',
      rooms: 'Zimmer & Suiten',
      location: 'Lage & Umgebung',
      book: 'Buchen',
      experiences: 'Erlebnisse',
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
      text1: 'Seit 1906 empfängt das Waldhotel Bad Essen seine Gäste am Fuße des Wiehengebirges. Heute ist unser Haus vor allem eine verlässliche Unterkunft für Monteure, Handwerker und Geschäftsreisende – mit ruhigen Zimmern, unkomplizierter Anreise und persönlicher Betreuung.',
      text2: 'Auch Feriengäste und Gruppen sind willkommen, um Bad Essen zu Fuß, mit dem Fahrrad und auf den Wegen durch den Wald zu entdecken. 19 Zimmer, kostenfreies WLAN und Parkplätze direkt am Haus machen den Aufenthalt angenehm. Ein reguläres Frühstück bieten wir nicht an; für Gruppen ist Frühstück nach vorheriger Anfrage möglich.',
      cta: 'Unsere Zimmer entdecken',
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
      phone: '+49 176 3241 9623',
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
      intro: 'Alle 19 Zimmer bieten Boxspringbetten, Blick ins Wiehengebirge und den Charme eines Fachwerkhauses – kombiniert mit modernem Komfort. Unser Haus ist besonders auf Monteure, Handwerker und Geschäftsreisende eingestellt und heißt auch Feriengäste sowie Gruppen willkommen.',
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
      extras: 'Weitere Hinweise',
      extrasData: [
        { service: 'Hund', price: '10,00 € / Nacht' },
        { service: 'Zustellbett', price: '30,00 € / Nacht' },
      ],
      stayNote: 'Unser Haus wird hauptsächlich von Monteuren, Handwerkern und Geschäftsreisenden genutzt. Feriengäste, Wanderer, Radfahrer und Gruppen sind ebenfalls willkommen. Ein reguläres Frühstück bieten wir nicht an; für Gruppen kann Frühstück nach vorheriger Anfrage organisiert werden.',
      notes: [
        'Erdgeschosszimmer rollstuhlgerecht, Platz für 4-köpfige Familie',
        'Hunde willkommen nach vorheriger Absprache',
        'Kostenlose Parkplätze und WLAN',
      ],
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
      audienceNote: 'Unser Haus beherbergt hauptsächlich Monteure, Handwerker und Geschäftsreisende. Feriengäste und Gruppen sind für Wanderungen, Wald- und Radtouren ebenfalls herzlich willkommen.',
      breakfastNote: 'Ein reguläres Frühstück bieten wir nicht an. Für Gruppen kann Frühstück nach vorheriger Anfrage organisiert werden.',
      phone: 'Sie möchten lieber telefonisch buchen? Rufen Sie uns an:',
      emailText: 'Oder schreiben Sie uns:',
      also: 'Auch buchbar über:',
    },
    // Contact form
    contactForm: {
      title: 'Kontaktformular',
      subtitle: 'Schreiben Sie uns – wir melden uns schnellstmöglich.',
      name: 'Ihr Name',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer (optional)',
      subject: 'Betreff',
      subjectPlaceholder: 'z.B. Zimmeranfrage, Gruppenreservierung...',
      message: 'Ihre Nachricht',
      messagePlaceholder: 'Wie können wir Ihnen helfen?',
      send: 'Nachricht senden',
      sending: 'Wird gesendet...',
      success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.',
      error: 'Leider konnte Ihre Nachricht nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.',
      nameRequired: 'Bitte geben Sie Ihren Namen ein.',
      emailRequired: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      messageRequired: 'Bitte geben Sie eine Nachricht ein (mind. 10 Zeichen).',
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
      location: 'Location & Surroundings',
      book: 'Book Now',
      experiences: 'Experiences',
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
      text1: 'Since 1906, Waldhotel Bad Essen has welcomed guests at the foot of the Wiehengebirge. Today, our house is first and foremost a reliable place to stay for tradespeople, craftsmen and business travellers – with quiet rooms, easy arrival and personal service.',
      text2: 'Holiday guests and groups are also welcome to explore Bad Essen on foot, by bicycle and along the forest trails. 19 rooms, complimentary WiFi and parking right at the hotel make every stay comfortable. We do not offer regular breakfast; breakfast can be arranged for groups by prior request.',
      cta: 'Discover Our Rooms',
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
      phone: '+49 176 3241 9623',
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
      intro: 'All 19 rooms feature box-spring beds, views of the Wiehengebirge and the charm of a half-timbered house – combined with modern comfort. Our house is particularly suited to tradespeople, craftsmen and business travellers, while holiday guests and groups are also welcome.',
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
      extras: 'Practical details',
      extrasData: [
        { service: 'Dog', price: '€10.00 / night' },
        { service: 'Extra bed', price: '€30.00 / night' },
      ],
      stayNote: 'Our house is primarily used by tradespeople, craftsmen and business travellers. Holiday guests, hikers, cyclists and groups are also welcome. We do not offer regular breakfast; breakfast can be arranged for groups by prior request.',
      notes: [
        'Ground floor rooms wheelchair accessible, space for family of 4',
        'Dogs welcome by prior arrangement',
        'Free parking and WiFi',
      ],
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
      audienceNote: 'Our house primarily accommodates tradespeople, craftsmen and business travellers. Holiday guests and groups are also very welcome for hiking, forest walks and cycling tours.',
      breakfastNote: 'We do not offer regular breakfast. Breakfast can be arranged for groups by prior request.',
      phone: 'Prefer to book by phone? Call us:',
      emailText: 'Or write to us:',
      also: 'Also bookable via:',
    },
    contactForm: {
      title: 'Contact Form',
      subtitle: 'Write to us – we will get back to you as soon as possible.',
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone Number (optional)',
      subject: 'Subject',
      subjectPlaceholder: 'e.g. Room inquiry, group reservation...',
      message: 'Your Message',
      messagePlaceholder: 'How can we help you?',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you! Your message has been sent successfully. We will get back to you shortly.',
      error: 'Unfortunately, your message could not be sent. Please try again or contact us by phone.',
      nameRequired: 'Please enter your name.',
      emailRequired: 'Please enter a valid email address.',
      messageRequired: 'Please enter a message (at least 10 characters).',
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
      '/bad-essen': '/en/location',
      '/buchen': '/en/book',
      '/erlebnisse': '/en/experiences',
      '/impressum': '/en/imprint',
      '/datenschutz': '/en/privacy',
    };
    return map[path] || `/en${path}`;
  }
  return path;
}
