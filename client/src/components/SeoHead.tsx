/*
 * Waldhotel Bad Essen – SEO & Social Media Meta Tags
 * Setzt Open Graph (Facebook), Twitter Cards und Pinterest-Tags
 * für optimale Darstellung beim Teilen auf Social Media
 */
import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  siteName?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

function setMetaTag(property: string, content: string, isName = false) {
  const attr = isName ? 'name' : 'property';
  let element = document.querySelector(`meta[${attr}="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function SeoHead({
  title,
  description,
  image,
  url,
  type = 'website',
  siteName = 'Waldhotel Bad Essen',
  locale = 'de_DE',
  twitterCard = 'summary_large_image',
}: SeoHeadProps) {
  useEffect(() => {
    // Page title
    document.title = title;

    // Standard meta description
    setMetaTag('description', description, true);

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:type', type);
    setMetaTag('og:site_name', siteName);
    setMetaTag('og:locale', locale);
    if (url) setMetaTag('og:url', url);
    if (image) setMetaTag('og:image', image);
    if (image) setMetaTag('og:image:width', '1200');
    if (image) setMetaTag('og:image:height', '630');

    // Twitter Cards
    setMetaTag('twitter:card', twitterCard, true);
    setMetaTag('twitter:title', title, true);
    setMetaTag('twitter:description', description, true);
    if (image) setMetaTag('twitter:image', image, true);

    // Pinterest
    if (image) setMetaTag('pinterest:image', image, true);
    setMetaTag('pinterest:description', description, true);

    return () => {
      // Cleanup is optional – tags persist for crawlers
    };
  }, [title, description, image, url, type, siteName, locale, twitterCard]);

  return null;
}
