import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

async function seed() {
  console.log('🌱 Seeding database...');

  // ============================================================
  // 1. Hotel Info (DE + EN)
  // ============================================================
  console.log('  → hotel_info...');
  await connection.execute(`DELETE FROM hotel_info`);
  
  const hotelInfoDE = {
    lang: 'de',
    hotelName: 'Waldhotel Bad Essen',
    tagline: 'Seit 1906. Ankommen. Aufatmen. Aufleben.',
    heroTitle: 'Waldhotel Bad Essen',
    heroSubtitle: 'Seit 1906. Ankommen. Aufatmen. Aufleben.',
    heroCta: 'Zimmer buchen',
    aboutLabel: 'Das Hotel',
    aboutTitle: 'Tradition trifft Natur',
    aboutText1: 'Seit 1906 empfängt das Waldhotel Bad Essen seine Gäste am Fuße des Wiehengebirges. Heute ist unser Haus vor allem eine verlässliche SB-Unterkunft für Monteure, Handwerker und Geschäftsreisende – mit ruhigen Zimmern, klaren Abläufen und unkomplizierter Organisation per E-Mail oder Telefon.',
    aboutText2: 'Auch Feriengäste und Gruppen sind willkommen, um Bad Essen zu Fuß, mit dem Fahrrad und auf den Wegen durch den Wald zu entdecken. 19 Zimmer, kostenfreies WLAN und Parkplätze direkt am Haus machen den Aufenthalt angenehm. Ein reguläres Frühstück bieten wir nicht an; für Gruppen ist Frühstück nach vorheriger Anfrage möglich.',
    aboutCta: 'Unsere Zimmer entdecken',
    address: 'Bergstraße 51, 49152 Bad Essen',
    phone: '+49 176 3241 9623',
    email: 'kontakt@waldhotel-badessen.de',
    latitude: '52.3258',
    longitude: '8.3386',
    instagramUrl: 'https://www.instagram.com/waldhotel_badessen/',
    facebookUrl: 'https://www.facebook.com/waldhotelbadessen/',
    bookingComUrl: 'https://www.booking.com/hotel/de/mullers-im-waldquartier.de.html',
    tripadvisorUrl: 'https://www.tripadvisor.com/HotelHighlight-g644182-d24009515',
    agodaUrl: 'https://www.agoda.com/de-de/hotel-mullers-im-waldquartier/hotel/all/bad-essen-de.html',
  };

  const hotelInfoEN = {
    lang: 'en',
    hotelName: 'Waldhotel Bad Essen',
    tagline: 'Since 1906. Arrive. Breathe. Revive.',
    heroTitle: 'Waldhotel Bad Essen',
    heroSubtitle: 'Since 1906. Arrive. Breathe. Revive.',
    heroCta: 'Book a Room',
    aboutLabel: 'The Hotel',
    aboutTitle: 'Tradition Meets Nature',
    aboutText1: 'Since 1906, Waldhotel Bad Essen has welcomed guests at the foot of the Wiehengebirge. Today, our house is first and foremost a reliable place to stay for tradespeople, craftsmen and business travellers – with quiet rooms, clear processes and uncomplicated organisation by email or phone.',
    aboutText2: 'Holiday guests and groups are also welcome to explore Bad Essen on foot, by bicycle and along the forest trails. 19 rooms, complimentary WiFi and parking right at the hotel make every stay comfortable. We do not offer regular breakfast; breakfast can be arranged for groups by prior request.',
    aboutCta: 'Discover Our Rooms',
    address: 'Bergstraße 51, 49152 Bad Essen',
    phone: '+49 176 3241 9623',
    email: 'kontakt@waldhotel-badessen.de',
    latitude: '52.3258',
    longitude: '8.3386',
    instagramUrl: 'https://www.instagram.com/waldhotel_badessen/',
    facebookUrl: 'https://www.facebook.com/waldhotelbadessen/',
    bookingComUrl: 'https://www.booking.com/hotel/de/mullers-im-waldquartier.de.html',
    tripadvisorUrl: 'https://www.tripadvisor.com/HotelHighlight-g644182-d24009515',
    agodaUrl: 'https://www.agoda.com/de-de/hotel-mullers-im-waldquartier/hotel/all/bad-essen-de.html',
  };

  for (const info of [hotelInfoDE, hotelInfoEN]) {
    const cols = Object.keys(info);
    const placeholders = cols.map(() => '?').join(', ');
    await connection.execute(
      `INSERT INTO hotel_info (${cols.join(', ')}) VALUES (${placeholders})`,
      Object.values(info)
    );
  }

  // ============================================================
  // 2. Rooms (DE + EN)
  // ============================================================
  console.log('  → rooms...');
  await connection.execute(`DELETE FROM rooms`);

  const roomsData = [
    // DE
    { lang: 'de', slug: 'double', title: 'Doppelzimmer', description: 'Doppel-Boxspringbett, Flachbild-TV, Bad mit Dusche & Fön, Telefon, Teestation, WLAN. Nichtraucherzimmer.', priceFrom: '89.00', priceLabel: 'Ab 89 € / Nacht', imageUrl: '', amenities: JSON.stringify(['Boxspringbett', 'Flachbild-TV', 'Dusche', 'Fön', 'Telefon', 'Teestation', 'WLAN']), sortOrder: 1 },
    { lang: 'de', slug: 'single', title: 'Einzelzimmer', description: 'Gleiche hochwertige Ausstattung für eine Person. Boxspringbett, Flachbild-TV, Bad mit Dusche & Fön, WLAN.', priceFrom: '69.00', priceLabel: 'Ab 69 € / Nacht', imageUrl: '', amenities: JSON.stringify(['Boxspringbett', 'Flachbild-TV', 'Dusche', 'Fön', 'WLAN']), sortOrder: 2 },
    { lang: 'de', slug: 'suite', title: 'Waldsuite', description: 'Geräumige Premium-Kategorie mit besonderem Blick ins Wiehengebirge. Großzügiger Wohnbereich und gehobene Ausstattung.', priceFrom: '119.00', priceLabel: 'Ab 119 € / Nacht', imageUrl: '', amenities: JSON.stringify(['Boxspringbett', 'Wohnbereich', 'Flachbild-TV', 'Dusche', 'Fön', 'Telefon', 'Teestation', 'WLAN', 'Bergblick']), sortOrder: 3 },
    // EN
    { lang: 'en', slug: 'double', title: 'Double Room', description: 'Double box-spring bed, flat-screen TV, bathroom with shower & hairdryer, telephone, tea station, WiFi. Non-smoking room.', priceFrom: '89.00', priceLabel: 'From €89 / night', imageUrl: '', amenities: JSON.stringify(['Box-spring bed', 'Flat-screen TV', 'Shower', 'Hairdryer', 'Telephone', 'Tea station', 'WiFi']), sortOrder: 1 },
    { lang: 'en', slug: 'single', title: 'Single Room', description: 'Same high-quality amenities for one person. Box-spring bed, flat-screen TV, bathroom with shower & hairdryer, WiFi.', priceFrom: '69.00', priceLabel: 'From €69 / night', imageUrl: '', amenities: JSON.stringify(['Box-spring bed', 'Flat-screen TV', 'Shower', 'Hairdryer', 'WiFi']), sortOrder: 2 },
    { lang: 'en', slug: 'suite', title: 'Forest Suite', description: 'Spacious premium category with a special view of the Wiehengebirge. Generous living area and upscale amenities.', priceFrom: '119.00', priceLabel: 'From €119 / night', imageUrl: '', amenities: JSON.stringify(['Box-spring bed', 'Living area', 'Flat-screen TV', 'Shower', 'Hairdryer', 'Telephone', 'Tea station', 'WiFi', 'Mountain view']), sortOrder: 3 },
  ];

  for (const room of roomsData) {
    const cols = Object.keys(room);
    const placeholders = cols.map(() => '?').join(', ');
    await connection.execute(
      `INSERT INTO rooms (${cols.join(', ')}) VALUES (${placeholders})`,
      Object.values(room)
    );
  }

  // ============================================================
  // 3. Extras (DE + EN)
  // ============================================================
  console.log('  → extras...');
  await connection.execute(`DELETE FROM extras`);

  const extrasData = [
    { lang: 'de', serviceName: 'Hund', price: '10,00 € / Nacht', sortOrder: 1 },
    { lang: 'de', serviceName: 'Zustellbett', price: '30,00 € / Nacht', sortOrder: 2 },
    { lang: 'en', serviceName: 'Dog', price: '€10.00 / night', sortOrder: 1 },
    { lang: 'en', serviceName: 'Extra bed', price: '€30.00 / night', sortOrder: 2 },
  ];

  for (const extra of extrasData) {
    const cols = Object.keys(extra);
    const placeholders = cols.map(() => '?').join(', ');
    await connection.execute(
      `INSERT INTO extras (${cols.join(', ')}) VALUES (${placeholders})`,
      Object.values(extra)
    );
  }

  // ============================================================
  // 4. Room Notes (DE + EN)
  // ============================================================
  console.log('  → room_notes...');
  await connection.execute(`DELETE FROM room_notes`);

  const roomNotesData = [
    { lang: 'de', noteText: 'Erdgeschosszimmer rollstuhlgerecht, Platz für 4-köpfige Familie', iconName: 'accessibility', sortOrder: 1 },
    { lang: 'de', noteText: 'Hunde willkommen nach vorheriger Absprache', iconName: 'dog', sortOrder: 2 },
    { lang: 'de', noteText: 'Kostenlose Parkplätze und WLAN', iconName: 'wifi', sortOrder: 3 },
    { lang: 'en', noteText: 'Ground floor rooms wheelchair accessible, space for family of 4', iconName: 'accessibility', sortOrder: 1 },
    { lang: 'en', noteText: 'Dogs welcome by prior arrangement', iconName: 'dog', sortOrder: 2 },
    { lang: 'en', noteText: 'Free parking and WiFi', iconName: 'wifi', sortOrder: 3 },
  ];

  for (const note of roomNotesData) {
    const cols = Object.keys(note);
    const placeholders = cols.map(() => '?').join(', ');
    await connection.execute(
      `INSERT INTO room_notes (${cols.join(', ')}) VALUES (${placeholders})`,
      Object.values(note)
    );
  }

  // ============================================================
  // 5. Location Sections (DE + EN)
  // ============================================================
  console.log('  → location_sections...');
  await connection.execute(`DELETE FROM location_sections`);

  const locationSectionsData = [
    { lang: 'de', slug: 'nature', title: 'Natur & Wandern', items: JSON.stringify(['Wittekindsweg (direkt vor der Tür)', 'Wiehengebirge-Wanderrouten', 'TERRA.vita Natur- und Geopark']), sortOrder: 1 },
    { lang: 'de', slug: 'culture', title: 'Kultur & Sehenswertes', items: JSON.stringify(['Schloss Ippenburg (Gartenfestival)', 'Historische Fachwerk-Altstadt', 'St.-Nikolai-Kirche', 'Varusschlacht-Museum Kalkriese (Nähe)']), sortOrder: 2 },
    { lang: 'de', slug: 'health', title: 'Gesundheit & Erholung', items: JSON.stringify(['SolePark mit Gradierwerk', 'Kneipp-Anlage', 'Cittàslow-Philosophie: Entschleunigung']), sortOrder: 3 },
    { lang: 'en', slug: 'nature', title: 'Nature & Hiking', items: JSON.stringify(['Wittekindsweg trail (right at the doorstep)', 'Wiehengebirge hiking routes', 'TERRA.vita Nature and Geopark']), sortOrder: 1 },
    { lang: 'en', slug: 'culture', title: 'Culture & Sights', items: JSON.stringify(['Ippenburg Castle (Garden Festival)', 'Historic half-timbered old town', 'St. Nikolai Church', 'Varusschlacht Museum Kalkriese (nearby)']), sortOrder: 2 },
    { lang: 'en', slug: 'health', title: 'Health & Relaxation', items: JSON.stringify(['SolePark with graduation tower', 'Kneipp facility', 'Cittàslow philosophy: Deceleration']), sortOrder: 3 },
  ];

  for (const section of locationSectionsData) {
    const cols = Object.keys(section);
    const placeholders = cols.map(() => '?').join(', ');
    await connection.execute(
      `INSERT INTO location_sections (${cols.join(', ')}) VALUES (${placeholders})`,
      Object.values(section)
    );
  }

  // ============================================================
  // 6. Pages Meta (DE + EN)
  // ============================================================
  console.log('  → pages_meta...');
  await connection.execute(`DELETE FROM pages_meta`);

  const pagesMetaData = [
    { lang: 'de', pageSlug: 'home', metaTitle: 'Waldhotel Bad Essen – Ihr Hotel am Wiehengebirge seit 1906', metaDescription: 'Gut organisiertes SB-Hotel am Wiehengebirge für Monteure, Handwerker, Geschäftsreisende, Feriengäste und Gruppen. Buchung und Fragen einfach per E-Mail oder Telefon.', heroTitle: 'Waldhotel Bad Essen', heroSubtitle: 'Seit 1906. Ankommen. Aufatmen. Aufleben.', introText: null },
    { lang: 'de', pageSlug: 'rooms', metaTitle: 'Zimmer & Suiten – Waldhotel Bad Essen', metaDescription: '19 Zimmer für Monteure, Handwerker, Geschäftsreisende, Feriengäste und Gruppen mit Boxspringbetten und Blick ins Wiehengebirge.', heroTitle: 'Zimmer & Suiten', heroSubtitle: null, introText: 'Alle 19 Zimmer bieten Boxspringbetten, Blick ins Wiehengebirge und den Charme eines Fachwerkhauses – kombiniert mit modernem Komfort. Frühstück bieten wir regulär nicht an; Gruppen können Frühstück auf Anfrage erhalten.' },
    { lang: 'de', pageSlug: 'location', metaTitle: 'Lage & Umgebung – Waldhotel Bad Essen', metaDescription: 'Bad Essen – Cittàslow am Wiehengebirge. Wittekindsweg, Schloss Ippenburg, SolePark und historische Altstadt.', heroTitle: 'Lage & Umgebung', heroSubtitle: null, introText: 'Bad Essen – Cittàslow am Wiehengebirge. Wo das Leben entschleunigt und die Natur den Takt vorgibt.' },
    { lang: 'de', pageSlug: 'booking', metaTitle: 'Online buchen – Waldhotel Bad Essen', metaDescription: 'Buchen Sie Ihren Aufenthalt im Waldhotel Bad Essen direkt zum besten Preis. Online-Buchung oder telefonisch.', heroTitle: 'Direkt buchen – bester Preis garantiert', heroSubtitle: null, introText: 'Buchen Sie Ihren Aufenthalt im Waldhotel Bad Essen direkt und ohne Umwege. Wählen Sie Ihren Wunschzeitraum und Zimmertyp.' },
    // EN
    { lang: 'en', pageSlug: 'home', metaTitle: 'Waldhotel Bad Essen – Your Hotel at the Wiehengebirge since 1906', metaDescription: 'Well-organised self-service hotel at the Wiehengebirge for tradespeople, craftsmen, business travellers, holiday guests and groups. Bookings and questions by email or phone.', heroTitle: 'Waldhotel Bad Essen', heroSubtitle: 'Since 1906. Arrive. Breathe. Revive.', introText: null },
    { lang: 'en', pageSlug: 'rooms', metaTitle: 'Rooms & Suites – Waldhotel Bad Essen', metaDescription: '19 rooms for tradespeople, craftsmen, business travellers, holiday guests and groups, with box-spring beds and views of the Wiehengebirge.', heroTitle: 'Rooms & Suites', heroSubtitle: null, introText: 'All 19 rooms feature box-spring beds, views of the Wiehengebirge and the charm of a half-timbered house – combined with modern comfort. Regular breakfast is not offered; groups can request breakfast in advance.' },
    { lang: 'en', pageSlug: 'location', metaTitle: 'Location & Surroundings – Waldhotel Bad Essen', metaDescription: 'Bad Essen – a Cittàslow town at the Wiehengebirge. Wittekindsweg trail, Ippenburg Castle, SolePark and historic old town.', heroTitle: 'Location & Surroundings', heroSubtitle: null, introText: 'Bad Essen – a Cittàslow town at the Wiehengebirge. Where life slows down and nature sets the pace.' },
    { lang: 'en', pageSlug: 'booking', metaTitle: 'Book Online – Waldhotel Bad Essen', metaDescription: 'Book your stay at the Waldhotel Bad Essen directly for the best price. Online booking or by phone.', heroTitle: 'Book Directly – Best Price Guaranteed', heroSubtitle: null, introText: 'Book your stay at the Waldhotel Bad Essen directly and without detours. Choose your preferred dates and room type.' },
  ];

  for (const meta of pagesMetaData) {
    const cols = Object.keys(meta);
    const placeholders = cols.map(() => '?').join(', ');
    await connection.execute(
      `INSERT INTO pages_meta (${cols.join(', ')}) VALUES (${placeholders})`,
      Object.values(meta)
    );
  }

  console.log('✅ Seeding complete!');
}

try {
  await seed();
} catch (error) {
  console.error('❌ Seeding failed:', error);
} finally {
  await connection.end();
}
