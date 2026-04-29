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

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '');

export default function HomePage() {
  const sectionsRef = useRef([]);
  const [projets, setProjets] = useState([]);

  // --- Contact Form State ---
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', tel: '', societe: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ nom: '', prenom: '', email: '', tel: '', societe: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Options de la wave animation
  const lottieOptions = {animationData: AnimatedWaves,loop: true,};
  const { View: WaveAnimation, setSpeed } = useLottie(lottieOptions, { style: { height: '100%', width: '100%', transform: 'scale(2)' } });

  useEffect(() => {setSpeed(0.015);}, [setSpeed]); // Vitesse du wave animation

  useEffect(() => { // Fetch des projets
    fetch(`${API_URL}/api/projects/recent`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setProjets(data);
      } else {
        console.error('Données reçues non valides:', data);
        setProjets([]);
      }
    })
    .catch((err) => {
      console.error('Erreur chargement projets:', err);
      setProjets([]);
    });}, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let mm = gsap.matchMedia();

    // On applique cet effet sur tous les écrans (mobiles inclus)
    mm.add("(min-width: 320px)", () => {
      const sections = sectionsRef.current.filter(Boolean);
      sections.forEach((section, index) => {
        const isLast = index === sections.length - 1;
        
        // On ne fige pas la dernière section pour éviter le scroll vide inutile avant le footer
        if (isLast) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            // On fige la section dès qu'elle a fini d'être lue
            start: () => section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
            end: () => `+=${window.innerHeight}`, 
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <main className="flex flex-col  w-full ">
      {/* ---- SECTION PRÉSENTATION ------------------- */}
      <section ref={(el) => (sectionsRef.current[0] = el)} className="relative flex flex-col gap-10 min-h-screen lg:min-h-[125vh] bg-mist-950 justify-center max-lg:flex-col  overflow-hidden z-1" id="presentation">
        {/* ---- Wave Animation Background ──── */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-15 z-0 pointer-events-none">
          {WaveAnimation}
        </div>
        <div className="flex flex-col z-0 justify-center items-center md:items-start mr-auto gap-y-10 px-5 md:ml-[10vw] max-lg:mr-0 mt-[10vh] md:mt-0 w-full md:w-auto">
          <div className="flex-1 flex flex-col gap-y-5 items-center md:items-start">
            <h1 className="text-text-primary max-w-full lg:max-w-[400px] font-bold leading-tight text-center md:text-left">
            <span className="macha-text-green  text-6xl sm:text-7xl md:text-9xl">Aïmène SAOUD</span>
            </h1>
            <h2 className="text-xl md:text-2xl grotesk-font text-text-primary text-center md:text-left">
              Technicien spécialisé dans les <span className="macha-text-green">services informatiques</span>
            </h2>
            <p className="text-text-secondary text-base md:text-lg max-w-[700px] text-center md:text-left">
              Je conçois des écosystèmes numériques en assemblant le développement applicatif, l'infrastructure système, la sécurité et la conformité des données.
            </p>
          </div>
          <MachaButton label="Contacter =>" href="#contacts" />
        </div>
        
      </section>

      {/* ---- SECTION COMPÉTENCES ------------------- */}
      <section ref={(el) => (sectionsRef.current[1] = el)} className="relative bg-black flex flex-col items-center justify-start gap-10 w-full min-h-screen lg:min-h-[125vh] pb-100 z-2" id="skills">
        <div className="flex flex-col mt-[15vh] gap-y-[10vh] px-5 w-full max-w-7xl">
          <h2 className="self-center md:self-start text-4xl oswald-font font-extrabold text-text-primary">
            <span className="macha-text-green text-5xl md:text-7xl">COMPÉTENCES</span>
          </h2>
          <SkillGrid />
        </div>
      </section>

      {/* ---- SECTION PROJETS ---------------------- */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="relative flex flex-col items-center  w-full min-h-screen lg:min-h-[125vh] max-md:min-h-[200vh] bg-bg-primary z-3" id="projects">
        <div className="flex flex-col  items-center gap-10 w-full  px-5">
          <div className="flex flex-col md:flex-row justify-between mt-[5vh] items-center w-full max-w-7xl gap-8 px-5">
            <h2 className="text-4xl font-extrabold oswald-font text-text-primary text-center md:text-left">
              <span className="macha-text-green text-5xl md:text-7xl">PROJETS</span>
            </h2>
            <MachaButton label="Voir tout =>" to="/projets" extraClassName="" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-center w-full">
            {Array.isArray(projets) && projets.map((p) => <ProjectCard key={p.id} projet={p} />)}
          </div>
        </div>
      </section>

      {/*---- SECTION CONTACT ------------------------ */}
      <section ref={(el) => (sectionsRef.current[3] = el)} className="relative flex flex-col items-center justify-start gap-10 w-full min-h-screen bg-black z-4 pb-20" id="contacts">
        <div className="flex flex-col items-center gap-10 w-full mt-15 px-5">
          <div className="flex justify-center mt-[5vh] items-center w-full mb-5 text-center">
            <h2 className="text-4xl font-extrabold oswald-font text-text-primary">
              <span className="macha-text-green text-5xl md:text-7xl">COLLABORONS</span>
            </h2>
          </div>

          <div className="flex flex-col w-full max-w-3xl items-center mt-5">
            <p className="text-text-secondary text-center mb-8 text-lg max-w-[600px]">
              N'hésitez pas à me contacter pour toute question ou opportunité d'alternance ou de stage en service informatique.
            </p>

            {status === 'success' && (
              <div className="bg-green-900/30 border border-green-500 text-green-400 text-center px-4 py-3 rounded w-full mb-5">
                Message envoyé avec succès !
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded w-full mb-5">
                Erreur lors de l'envoi du message. Veuillez réessayer.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col grotesk-font gap-0 w-full">
              <div className="flex gap-4 max-sm:flex-col">
                <div className="relative flex-1 mb-5">
                  <input
                    className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus-visible:outline-none focus:border-[#abff84] transition-colors placeholder:text-text-secondary/50"
                    type="text" name="nom" placeholder="Nom*" required maxLength={400}
                    value={formData.nom} onChange={handleChange}
                  />
                </div>
                <div className="relative flex-1 mb-5">
                  <input
                    className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus-visible:outline-none focus:border-[#abff84] transition-colors placeholder:text-text-secondary/50"
                    type="text" name="prenom" placeholder="Prénom" maxLength={400}
                    value={formData.prenom} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="relative mb-5">
                <input
                  className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus-visible:outline-none focus:border-[#abff84] transition-colors placeholder:text-text-secondary/50"
                  type="email" name="email" placeholder="Adresse Email*" required maxLength={400}
                  value={formData.email} onChange={handleChange}
                />
              </div>

              <div className="relative mb-5">
                <input
                  className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus-visible:outline-none focus:border-[#abff84] transition-colors placeholder:text-text-secondary/50"
                  type="tel" name="tel" placeholder="N° de téléphone portable" maxLength={400}
                  value={formData.tel} onChange={handleChange}
                />
              </div>

              <div className="relative mb-5">
                <input
                  className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus-visible:outline-none focus:border-[#abff84] transition-colors placeholder:text-text-secondary/50"
                  type="text" name="societe" placeholder="Votre société*" required maxLength={400}
                  value={formData.societe} onChange={handleChange}
                />
              </div>

              <div className="relative mb-5">
                <textarea
                  className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus-visible:outline-none focus:border-[#abff84] transition-colors resize-y min-h-[120px] placeholder:text-text-secondary/50"
                  name="message" placeholder="Votre message*" required rows={4}
                  value={formData.message} onChange={handleChange}
                />
              </div>

              <small className="text-text-secondary mb-4">* Champ Obligatoire</small>

              <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                <input type="checkbox" required className="mt-1 w-5 h-5 cursor-pointer accent-[#abff84] shrink-0" />
                <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                  En soumettant ce formulaire, j'accepte que mes données personnelles soient utilisées pour me recontacter conformément aux <Link to="/mentions-legales" className="macha-text-green underline hover:text-accent">Mentions Légales</Link>.
                </span>
              </label>

              <MachaButton 
                label={loading ? 'ENVOI...' : 'ENVOYER'} 
                type="submit" 
                extraClassName={`self-center mt-2 ${loading ? 'opacity-50 pointer-events-none' : ''}`} 
              />
            </form>
          </div>
        </div>
      </section>
    </main>
    <Socials />
    </>
  );
}
