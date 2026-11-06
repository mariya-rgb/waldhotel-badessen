/*
 * Waldhotel Bad Essen – JSON-LD Structured Data
 * Schema.org/Hotel for SEO
 */
import { useEffect } from 'react';

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Waldhotel Bad Essen",
  "description": "Traditionshotel seit 1906 am Wiehengebirge mit 19 Zimmern – vor allem für Monteure, Handwerker und Geschäftsreisende sowie für Feriengäste und Gruppen.",
  "url": "https://www.waldhotel-badessen.de",
  "telephone": "+4917632419623",
  "email": "kontakt@waldhotel-badessen.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bergstraße 51",
    "addressLocality": "Bad Essen",
    "postalCode": "49152",
    "addressRegion": "Niedersachsen",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.3203",
    "longitude": "8.3390"
  },
  "starRating": {
    "@type": "Rating",
    "ratingValue": "3"
  },
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Kostenloses WLAN"},
    {"@type": "LocationFeatureSpecification", "name": "Kostenlose Parkplätze"},
    {"@type": "LocationFeatureSpecification", "name": "Barrierefreie Zimmer"},
    {"@type": "LocationFeatureSpecification", "name": "Gruppen auf Anfrage"}
  ],
  "petsAllowed": true,
  "checkinTime": "15:00",
  "checkoutTime": "11:00",
  "image": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663365901872/yztjRVAHRhoAjIJE.jpg",
  "priceRange": "€69 - €119"
};

export default function JsonLd() {
  useEffect(() => {
    const existing = document.querySelector('script[data-schema="hotel"]');
    if (existing) return;
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'hotel');
    script.textContent = JSON.stringify(hotelSchema);
    document.head.appendChild(script);
    
    return () => {
      script.remove();
    };
  }, []);

  return null;
}
