import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../components/ProjectCard';
import SkillGrid from '../components/SkillGrid';
import Socials from '../components/Socials';
import { useLottie } from 'lottie-react';
import AnimatedWaves from '../assets/wave_animation.json';
import MachaButton from '../components/MachaButton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function HomePage() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [projets, setProjets] = useState([]);

  // Options de la wave animation
  const lottieOptions = {animationData: AnimatedWaves,loop: true,};
  const { View: WaveAnimation, setSpeed } = useLottie(lottieOptions, { style: { height: '100%', width: '100%', transform: 'scale(2)' } });

  useEffect(() => {setSpeed(0.015);}, [setSpeed]); // Vitesse du wave animation

  useEffect(() => { // Fetch des projets
    fetch(`${API_URL}/api/projects/recent`)
    .then((res) => res.json())
    .then((data) => setProjets(data))
    .catch((err) => console.error('Erreur chargement projets:', err));}, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: () => section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main className="flex flex-col  w-full mb-[80px] ">
      {/* ─── SECTION PRÉSENTATION ──────────────────── */}
      <section ref={(el) => (sectionsRef.current[0] = el)} className="relative flex flex-col gap-10 min-h-screen bg-mist-950 justify-center max-lg:flex-col overflow-hidden z-[1]" id="presentation">
        {/* ─── Wave Animation Background ──── */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-15 z-0 pointer-events-none">
          {WaveAnimation}
        </div>
        <div className="flex flex-col z-0 justify-center items-start mr-auto mt-[300px] gap-y-10 ml-[10vw] max-lg:mr-0">
          <div className="flex-1 flex flex-col  gap-y-5">
            <h1 className="text-text-primary font-bold leading-tight">
            <span className="macha-text-green text-9xl">Aïmène SAOUD</span>
            </h1>
            <h2 className="text-2xl text-text-primary">
              Technicien spécialisé dans les <span className="macha-text-green">services informatiques</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-[700px]">
              Je conçois des écosystèmes numériques en assemblant le développement applicatif, l'infrastructure système, la sécurité et la conformité des données.
            </p>
          </div>
          <MachaButton label="Contacter =>" href="#contacts" />
        </div>
        
      </section>

      {/* ─── SECTION COMPÉTENCES ───────────────────── */}
      <section ref={(el) => (sectionsRef.current[1] = el)} className="relative bg-black flex flex-col items-center justify-start pt-[15vh] gap-10 w-full min-h-[125vh] z-2" id="skills">
        <div className="flex flex-col mt-[15vh] gap-y-[10vh]"> 
          <h2 className="self-start text-4xl oswald-font font-extrabold text-text-primary">
            <span className="macha-text-green text-7xl">COMPÉTENCES</span>
          </h2>
          <SkillGrid />
        </div>
      </section>

      {/* ─── SECTION PROJETS ───────────────────────── */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="relative flex flex-col items-center  w-full min-h-[125vh] bg-bg-primary z-3" id="projects">
        <div className="flex flex-col  items-center gap-10 w-full  px-5">
          <div className="flex justify-center mt-[5vh] gap-x-[30vw] items-center  w-full">
            <h2 className="text-4xl  font-extrabold oswald-font text-text-primary">
              <span className="macha-text-green  text-7xl">PROJETS</span>
            </h2>
            <MachaButton label="Voir tout =>" to="/projets" extraClassName="" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-center w-full">
            {projets.map((p) => <ProjectCard key={p.id} projet={p} />)}
          </div>
        </div>
      </section>

      {/* ─── SECTION CONTACT ───────────────────────── */}
      <section ref={(el) => (sectionsRef.current[3] = el)} className="relative flex flex-col items-center justify-center w-full min-h-[125vh] bg-black z-4" id="contacts">
        <div className="flex flex-col gap-5 w-full max-w-[1100px] px-5">
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
                  <MachaButton label="Formulaire de contact" to="/contact" />
                </div>
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
