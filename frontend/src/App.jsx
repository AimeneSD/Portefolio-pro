import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import VeillePage from './pages/VeillePage';
import StagePage from './pages/StagePage';
import AdminPage from './pages/AdminPage';
import MentionsLegales from './pages/MentionsLegales';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // 1. Initialisation de Lenis pour le smooth scroll
    const lenis = new Lenis({
      duration: 1.2, // La "douceur" du scroll (1.2 est très bien, tu peux modifier)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Courbe d'animation
      smooth: true,
      wheelMultiplier: 0.7, // Vitesse de la molette
      smoothTouch: false, // En général on désactive sur mobile pour un feeling natif
    });

    // On rend lenis accessible globalement pour le composant ScrollToTop
    window.lenis = lenis;

    // 2. Synchronisation de Lenis avec ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Demander à GSAP de s'occuper de la boucle de rafraîchissement de Lenis
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // Évite les sauts si l'onglet reste inactif un moment
    gsap.ticker.lagSmoothing(0);

    // 4. Gestion des liens d'ancrage (#contacts, #skills, etc.)
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a');
      // On ne gère que les liens internes (même origine et même chemin) avec un hash
      if (
        link &&
        link.hash &&
        link.origin === window.location.origin &&
        link.pathname === window.location.pathname
      ) {
        e.preventDefault();
        lenis.scrollTo(link.hash);
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // 5. Nettoyage quand le composant est démonté (important dans React)
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projets" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/veille" element={<VeillePage />} />
          <Route path="/stage" element={<StagePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
