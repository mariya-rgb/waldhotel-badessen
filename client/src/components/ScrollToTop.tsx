import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Scrolls to top whenever the route changes.
 * Place this component inside the Router so it reacts to navigation.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
