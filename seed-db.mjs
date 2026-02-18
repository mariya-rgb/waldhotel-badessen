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
    aboutText1: 'Seit 1906 empfängt das Waldhotel Bad Essen seine Gäste am Fuße des Wiehengebirges. Das historische Fachwerkhaus verbindet den Charme vergangener Zeiten mit modernem Komfort – ein Ort, an dem man ankommt und zur Ruhe findet.',
    aboutText2: '19 individuell eingerichtete Zimmer bieten Ihnen alles, was Sie für einen erholsamen Aufenthalt brauchen: Boxspringbetten, Blick ins Grüne, kostenfreies WLAN und Parkplätze direkt am Haus.',
    aboutCta: 'Unsere Zimmer entdecken',
    address: 'Bergstraße 51, 49152 Bad Essen',
    phone: '05472 – 95 84 303',
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
    aboutText1: 'Since 1906, the Waldhotel Bad Essen has welcomed guests at the foot of the Wiehengebirge mountains. This historic half-timbered house combines the charm of bygone times with modern comfort – a place where you arrive and find peace.',
    aboutText2: '19 individually designed rooms offer everything you need for a relaxing stay: box-spring beds, views of the green landscape, complimentary WiFi and parking right at the hotel.',
    aboutCta: 'Discover Our Rooms',
    address: 'Bergstraße 51, 49152 Bad Essen',
    phone: '+49 5472 – 95 84 303',
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
    // DE
    { lang: 'de', serviceName: 'Frühstück (Hotelgäste)', price: '14,50 € / Person', sortOrder: 1 },
    { lang: 'de', serviceName: 'Frühstück (externe Gäste)', price: '20,50 € / Person', sortOrder: 2 },
    { lang: 'de', serviceName: 'Hund', price: '10,00 € / Nacht', sortOrder: 3 },
    { lang: 'de', serviceName: 'Zustellbett', price: '30,00 € / Nacht', sortOrder: 4 },
    { lang: 'de', serviceName: 'Waldsauna-Tageskarte (Hotelgäste)', price: '18,50 € / Tag', sortOrder: 5 },
    { lang: 'de', serviceName: 'Waldsauna-Tageskarte (extern)', price: '22,50 € / Tag', sortOrder: 6 },
    // EN
    { lang: 'en', serviceName: 'Breakfast (hotel guests)', price: '€14.50 / person', sortOrder: 1 },
    { lang: 'en', serviceName: 'Breakfast (external guests)', price: '€20.50 / person', sortOrder: 2 },
    { lang: 'en', serviceName: 'Dog', price: '€10.00 / night', sortOrder: 3 },
    { lang: 'en', serviceName: 'Extra bed', price: '€30.00 / night', sortOrder: 4 },
    { lang: 'en', serviceName: 'Forest sauna day pass (hotel guests)', price: '€18.50 / day', sortOrder: 5 },
    { lang: 'en', serviceName: 'Forest sauna day pass (external)', price: '€22.50 / day', sortOrder: 6 },
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
  // 5. Wellness Offerings (DE + EN)
  // ============================================================
  console.log('  → wellness_offerings...');
  await connection.execute(`DELETE FROM wellness_offerings`);

  const wellnessOfferingsData = [
    { lang: 'de', title: 'Bio-Sauna', description: 'Sanfte Wärme bei ca. 60°C', iconName: 'thermometer', sortOrder: 1 },
    { lang: 'de', title: 'Finnische Sauna', description: 'Klassisch bei ca. 90°C', iconName: 'flame', sortOrder: 2 },
    { lang: 'de', title: 'Dampfbad', description: 'Wohltuend feucht', iconName: 'cloud', sortOrder: 3 },
    { lang: 'de', title: 'Tauchbecken', description: 'Erfrischung nach dem Saunagang', iconName: 'droplets', sortOrder: 4 },
    { lang: 'de', title: 'Außen-Sauna', description: 'Saunieren unter freiem Himmel im Saunagarten', iconName: 'trees', sortOrder: 5 },
    { lang: 'en', title: 'Bio Sauna', description: 'Gentle warmth at approx. 60°C', iconName: 'thermometer', sortOrder: 1 },
    { lang: 'en', title: 'Finnish Sauna', description: 'Classic at approx. 90°C', iconName: 'flame', sortOrder: 2 },
    { lang: 'en', title: 'Steam Bath', description: 'Soothing humidity', iconName: 'cloud', sortOrder: 3 },
    { lang: 'en', title: 'Plunge Pool', description: 'Refreshment after the sauna session', iconName: 'droplets', sortOrder: 4 },
    { lang: 'en', title: 'Outdoor Sauna', description: 'Sauna under the open sky in the sauna garden', iconName: 'trees', sortOrder: 5 },
  ];

  for (const offering of wellnessOfferingsData) {
    const cols = Object.keys(offering);
    const placeholders = cols.map(() => '?').join(', ');
    await connection.execute(
      `INSERT INTO wellness_offerings (${cols.join(', ')}) VALUES (${placeholders})`,
      Object.values(offering)
    );
  }

  // ============================================================
  // 6. Wellness Hours (DE + EN)
  // ============================================================
  console.log('  → wellness_hours...');
  await connection.execute(`DELETE FROM wellness_hours`);

  const wellnessHoursData = [
    { lang: 'de', dayName: 'Montag', timeRange: 'Geschlossen', note: '–', dayIndex: 0 },
    { lang: 'de', dayName: 'Dienstag', timeRange: '16:00 – 22:00', note: 'Damensauna', dayIndex: 1 },
    { lang: 'de', dayName: 'Mittwoch', timeRange: 'Geschlossen', note: '–', dayIndex: 2 },
    { lang: 'de', dayName: 'Donnerstag', timeRange: 'Geschlossen', note: '–', dayIndex: 3 },
    { lang: 'de', dayName: 'Freitag', timeRange: '16:00 – 22:00', note: '–', dayIndex: 4 },
    { lang: 'de', dayName: 'Samstag', timeRange: '14:00 – 20:00', note: '–', dayIndex: 5 },
    { lang: 'de', dayName: 'Sonntag', timeRange: '12:00 – 20:00', note: '–', dayIndex: 6 },
    { lang: 'en', dayName: 'Monday', timeRange: 'Closed', note: '–', dayIndex: 0 },
    { lang: 'en', dayName: 'Tuesday', timeRange: '4:00 PM – 10:00 PM', note: "Ladies' sauna", dayIndex: 1 },
    { lang: 'en', dayName: 'Wednesday', timeRange: 'Closed', note: '–', dayIndex: 2 },
    { lang: 'en', dayName: 'Thursday', timeRange: 'Closed', note: '–', dayIndex: 3 },
    { lang: 'en', dayName: 'Friday', timeRange: '4:00 PM – 10:00 PM', note: '–', dayIndex: 4 },
    { lang: 'en', dayName: 'Saturday', timeRange: '2:00 PM – 8:00 PM', note: '–', dayIndex: 5 },
    { lang: 'en', dayName: 'Sunday', timeRange: '12:00 PM – 8:00 PM', note: '–', dayIndex: 6 },
  ];

  for (const hour of wellnessHoursData) {
    const cols = Object.keys(hour);
    const placeholders = cols.map(() => '?').join(', ');
    await connection.execute(
      `INSERT INTO wellness_hours (${cols.join(', ')}) VALUES (${placeholders})`,
      Object.values(hour)
    );
  }

  // ============================================================
  // 7. Wellness Prices (DE + EN)
  // ============================================================
  console.log('  → wellness_prices...');
  await connection.execute(`DELETE FROM wellness_prices`);

  const wellnessPricesData = [
    { lang: 'de', label: 'Hotelgäste', price: '18,50 € / Tag', sortOrder: 1 },
    { lang: 'de', label: 'Externe Gäste', price: '22,50 € / Tag', sortOrder: 2 },
    { lang: 'en', label: 'Hotel guests', price: '€18.50 / day', sortOrder: 1 },
    { lang: 'en', label: 'External guests', price: '€22.50 / day', sortOrder: 2 },
  ];

  for (const price of wellnessPricesData) {
    const cols = Object.keys(price);
    const placeholders = cols.map(() => '?').join(', ');
    await connection.execute(
      `INSERT INTO wellness_prices (${cols.join(', ')}) VALUES (${placeholders})`,
      Object.values(price)
    );
  }

  // ============================================================
  // 8. Location Sections (DE + EN)
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
  // 9. Pages Meta (DE + EN)
  // ============================================================
  console.log('  → pages_meta...');
  await connection.execute(`DELETE FROM pages_meta`);

  const pagesMetaData = [
    { lang: 'de', pageSlug: 'home', metaTitle: 'Waldhotel Bad Essen – Ihr Hotel am Wiehengebirge seit 1906', metaDescription: 'Willkommen im Waldhotel Bad Essen – historisches Fachwerkhotel am Wiehengebirge. 19 Zimmer, Waldsauna, Natur pur. Direkt buchen zum besten Preis.', heroTitle: 'Waldhotel Bad Essen', heroSubtitle: 'Seit 1906. Ankommen. Aufatmen. Aufleben.', introText: null },
    { lang: 'de', pageSlug: 'rooms', metaTitle: 'Zimmer & Suiten – Waldhotel Bad Essen', metaDescription: '19 individuell eingerichtete Zimmer mit Boxspringbetten und Blick ins Wiehengebirge. Doppelzimmer, Einzelzimmer und Waldsuiten.', heroTitle: 'Zimmer & Suiten', heroSubtitle: null, introText: 'Alle 19 Zimmer bieten Boxspringbetten, Blick ins Wiehengebirge und den Charme eines Fachwerkhauses – kombiniert mit modernem Komfort.' },
    { lang: 'de', pageSlug: 'wellness', metaTitle: 'Waldsauna & Wellness – Waldhotel Bad Essen', metaDescription: 'Die Waldsauna Bad Essen: 500 m² Saunalandschaft mit Bio-Sauna, finnischer Sauna, Dampfbad und Außen-Sauna am Wiehengebirge.', heroTitle: 'Waldsauna & Wellness', heroSubtitle: null, introText: 'Direkt am Hotel – die Waldsauna Bad Essen. Auf über 500 m² erwartet Sie eine Saunalandschaft, die alle Sinne anspricht. Eingebettet in die Natur des Wiehengebirges.' },
    { lang: 'de', pageSlug: 'location', metaTitle: 'Lage & Umgebung – Waldhotel Bad Essen', metaDescription: 'Bad Essen – Cittàslow am Wiehengebirge. Wittekindsweg, Schloss Ippenburg, SolePark und historische Altstadt.', heroTitle: 'Lage & Umgebung', heroSubtitle: null, introText: 'Bad Essen – Cittàslow am Wiehengebirge. Wo das Leben entschleunigt und die Natur den Takt vorgibt.' },
    { lang: 'de', pageSlug: 'booking', metaTitle: 'Online buchen – Waldhotel Bad Essen', metaDescription: 'Buchen Sie Ihren Aufenthalt im Waldhotel Bad Essen direkt zum besten Preis. Online-Buchung oder telefonisch.', heroTitle: 'Direkt buchen – bester Preis garantiert', heroSubtitle: null, introText: 'Buchen Sie Ihren Aufenthalt im Waldhotel Bad Essen direkt und ohne Umwege. Wählen Sie Ihren Wunschzeitraum und Zimmertyp.' },
    // EN
    { lang: 'en', pageSlug: 'home', metaTitle: 'Waldhotel Bad Essen – Your Hotel at the Wiehengebirge since 1906', metaDescription: 'Welcome to Waldhotel Bad Essen – historic half-timbered hotel at the Wiehengebirge. 19 rooms, forest sauna, pure nature. Book directly for the best price.', heroTitle: 'Waldhotel Bad Essen', heroSubtitle: 'Since 1906. Arrive. Breathe. Revive.', introText: null },
    { lang: 'en', pageSlug: 'rooms', metaTitle: 'Rooms & Suites – Waldhotel Bad Essen', metaDescription: '19 individually designed rooms with box-spring beds and views of the Wiehengebirge. Double rooms, single rooms and forest suites.', heroTitle: 'Rooms & Suites', heroSubtitle: null, introText: 'All 19 rooms feature box-spring beds, views of the Wiehengebirge and the charm of a half-timbered house – combined with modern comfort.' },
    { lang: 'en', pageSlug: 'wellness', metaTitle: 'Forest Sauna & Wellness – Waldhotel Bad Essen', metaDescription: 'The Forest Sauna Bad Essen: 500 m² sauna landscape with bio sauna, Finnish sauna, steam bath and outdoor sauna at the Wiehengebirge.', heroTitle: 'Forest Sauna & Wellness', heroSubtitle: null, introText: 'Right at the hotel – the Forest Sauna Bad Essen. On over 500 m², a sauna landscape that appeals to all senses awaits you. Nestled in the nature of the Wiehengebirge.' },
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
