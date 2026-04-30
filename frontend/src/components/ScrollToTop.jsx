import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Retour en haut immédiat pour le navigateur
    window.scrollTo(0, 0);
    
    // 2. Retour en haut pour Lenis (le smooth scroll) s'il est initialisé
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }

    // 3. Rafraîchir les calculs de GSAP ScrollTrigger
    // On attend un peu plus pour laisser le temps au rendu de se stabiliser
    const timer = setTimeout(() => {
      if (window.lenis) {
        window.lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
