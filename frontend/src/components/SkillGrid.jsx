import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Données statiques des compétences (identique à index.php)
 */
const skillCategories = [
  {
    title: 'FRONT-END',
    skills: [
      { name: 'JavaScript', logo: 'js' },
      { name: 'React', logo: 'react' },
      { name: 'Tailwind', logo: 'tailwind' },
      { name: 'Vite', logo: 'vite'}
    ],
  },
  {
    title: 'BACK-END',
    skills: [
      { name: 'PHP', logo: 'php'},
      { name: 'Node.js', logo: 'nodejs' },
      { name: 'Express.js', logo: 'express' }
    ],
  },
  {
    title: 'DATABASE',
    skills: [
      { name: 'MySQL', logo: 'mysql' },
      { name: 'MariaDB', logo: 'mariadb' }
    ],
  },
  {
    title: 'INFRASTRUCTURE',
    skills: [
      { name: 'Linux', logo: 'linux' },
      { name: 'Windows Server', logo: 'windows' },
    ],
  },
  {
    title: 'DEVOPS',
    skills: [
      {name: 'Docker',logo: 'docker'},
      { name: 'Bash', logo: 'bash' },
      { name: 'PowerShell', logo: 'powershell' }
    ]
  },
  {
    title: 'CONFORMITÉ & MÉTHODES',
    skills: [
      { name: 'Conformité RGPD', logo: 'lock' },
      { name: 'Méthodes Agiles', logo: 'agile', ext: 'webp' },
      { name: 'Documentation Technique', logo: 'microsoft-word' },
      { name: 'Git', logo: 'git' }
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function SkillGrid({ showLevel = false, extraClassName = '' }) {
  const containerRef = useRef(null);
  const categoryRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      categoryRefs.current.forEach((catEl) => {
        if (!catEl) return;
        
        const title = catEl.querySelector('h3');
        const skills = catEl.querySelectorAll('.skill-item');

        gsap.fromTo(
          [title, ...skills],
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: catEl,
              start: 'top 85%', // Se déclenche quand le haut de la catégorie atteint 85% de l'écran
              toggleActions: 'play none none reverse', // S'anime à l'aller et se cache au retour
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-col gap-y-16 lg:gap-y-[10vh] w-full items-center justify-center ${extraClassName}`}>
      {skillCategories.map((cat, index) => (
        <div 
          key={cat.title} 
          ref={(el) => (categoryRefs.current[index] = el)}
          className="flex flex-col lg:flex-row gap-8 lg:gap-x-12 items-center lg:items-start w-full max-w-6xl "
        >
          <h3 className="text-4xl lg:text-5xl text-neutral-300 oswald-font text-center lg:text-left lg:w-[350px] flex-shrink-0 font-bold mb-2">
            {cat.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-8 lg:gap-x-16 justify-items-center lg:justify-items-start content-start w-full">
            {cat.skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-item flex flex-col md:flex-row items-center gap-4 justify-center"
              >
                <img
                  className="h-12 w-10 md:h-15 md:w-10 object-contain"
                  src={`${import.meta.env.BASE_URL}logo/${skill.logo}.${skill.ext || 'svg'}`}
                  alt={`${skill.name} Logo`}
                />
                <h4 className="text-text-primary text-center md:text-left max-w-20 grotesk-font text-sm md:text-lg">{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
