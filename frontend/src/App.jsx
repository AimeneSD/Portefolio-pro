import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
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

    // 2. Synchronisation de Lenis avec ScrollTrigger
    // Ça permet de s'assurer que tes animations GSAP restent synchronisées avec le scroll fluide
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Demander à GSAP de s'occuper de la boucle de rafraîchissement de Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Évite les sauts si l'onglet reste inactif un moment
    gsap.ticker.lagSmoothing(0);

    // 4. Nettoyage quand le composant est démonté (important dans React)
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
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
