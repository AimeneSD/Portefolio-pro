import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import SkillGrid from '../components/SkillGrid';
import Socials from '../components/Socials';
import { useLottie } from 'lottie-react';
import AnimatedWaves from '../assets/wave_animation.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function HomePage() {
  const [projets, setProjets] = useState([]);

  const lottieOptions = {
    animationData: AnimatedWaves,
    loop: true,
  };
  const { View: WaveAnimation, setSpeed } = useLottie(lottieOptions, { style: { height: '100%', width: '100%', transform: 'scale(2)' } });

  useEffect(() => {
    setSpeed(0.015);
  }, [setSpeed]);

  useEffect(() => {
    fetch(`${API_URL}/api/projects/recent`)
      .then((res) => res.json())
      .then((data) => setProjets(data))
      .catch((err) => console.error('Erreur chargement projets:', err));
  }, []);

  return (
    <>
      <main className="flex flex-col gap-[100px]  w-full mb-[80px] ">
      {/* ─── SECTION PRÉSENTATION ──────────────────── */}
      <section className="relative flex flex-col gap-10 min-lg:pb-[40vh] bg-mist-950 justify-center max-lg:flex-col overflow-hidden" id="presentation">
        {/* ─── Wave Animation Background ──── */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-15 z-[0] pointer-events-none">
          {WaveAnimation}
        </div>
        <div className="flex flex-col z-0 justify-center items-start mr-auto mt-[300px] gap-5 ml-[250px] max-lg:mr-0">
          <div className="flex-1 flex flex-col  gap-y-5">
            <h1 className="text-[250%] text-text-primary font-bold leading-tight">
            <span className="green-text text-7xl">Aïmène SAOUD</span>
            </h1>
            <h2 className="text-xl text-text-primary">
              Étudiant en BTS SIO<br /> dans les <span className="green-text">services informatiques</span> et le{' '}
              <span className="green-text">développement d'applications</span>.
            </h2>
            <p className="text-text-secondary max-w-[700px]">
              Étudiant en BTS SIO,<br /> je souhaite apporter des solutions de developpement, d'infrastructure, de sécurité et de conformité aux organisations.
            </p>
          </div>
          <a
            href="#contacts"
            className="self-start px-4 py-2 mt-15 border border-accent rounded-full text-text-primary transition-colors duration-500 hover:bg-accent-hover"
            id="cta-contact"
          >
            Contacter =&gt;
          </a>
        </div>
        
      </section>

      {/* ─── SECTION COMPÉTENCES ───────────────────── */}
      <section className="relative flex flex-col items-center gap-10 w-full max-w-[1100px] self-center" id="skills">
        <h2 className="self-start text-4xl font-semibold text-text-primary">
          <span className="green-text">#</span>compétences
        </h2>
        <SkillGrid />
      </section>

      {/* ─── SECTION PROJETS ───────────────────────── */}
      <section className="relative flex flex-col items-center gap-10 w-full max-w-[1100px] self-center" id="projects">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-4xl font-semibold text-text-primary">
            <span className="green-text">#</span>projets
          </h2>
          <Link to="/projets" className="text-lg text-text-primary underline decoration-accent">
            Voir tout =&gt;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-center">
          {projets.length === 0 ? (
            <p className="text-text-secondary">Aucun projet à afficher pour le moment.</p>
          ) : (
            projets.map((p) => <ProjectCard key={p.id} projet={p} />)
          )}
        </div>
      </section>

      {/* ─── SECTION CONTACT ───────────────────────── */}
      <section className="relative flex flex-col gap-5 self-center w-full max-w-[1100px]" id="contacts">
        <h2 className="text-4xl font-semibold text-text-primary">
          <span className="green-text">#</span>contact
        </h2>
        <div className="flex w-full mt-5 max-lg:flex-col max-lg:gap-5">
          <p className="text-text-secondary max-w-[600px] text-[17px]">
            Vous pouvez me contacter pour toute question ou opportunité d'alternance ou de stage en service
            informatique.
          </p>
          <div className="flex flex-col ml-auto p-5 border border-border gap-4 max-lg:ml-0 max-lg:w-full">
            <h3 className="text-xl text-text-primary font-bold">Contactez-moi ici</h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <img className="w-[30px] invert" src="/logo/mail_icon.svg" alt="Email" />
                <a href="mailto:aimenesaoud@gmail.com" className="text-text-primary hover:text-accent transition-colors">
                  aimenesaoud@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <img className="w-[30px] invert" src="/logo/form-send.svg" alt="Formulaire" />
                <Link
                  to="/contact"
                  className="px-4 py-2 border border-accent text-text-primary transition-colors duration-500 hover:bg-accent-hover"
                >
                  Formulaire de contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Socials />
    </>
  );
}
