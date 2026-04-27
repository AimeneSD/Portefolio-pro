import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Données statiques des compétences (identique à index.php)
 */
const skillCategories = [
  {
    title: 'Front-end',
    skills: [
      { name: 'JavaScript', logo: 'js' },
      { name: 'React', logo: 'react' },
      { name: 'Tailwind', logo: 'tailwind' },
      { name: 'Vite', logo: 'vite'}
    ],
  },
  {
    title: 'Back-end',
    skills: [
      { name: 'PHP', logo: 'php'},
      { name: 'Node.js', logo: 'nodejs' },
      { name: 'Express.js', logo: 'express' }
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MySQL', logo: 'mysql' },
      { name: 'MariaDB', logo: 'mariadb' }
    ],
  },
  {
    title: 'Infrastructure',
    skills: [
      { name: 'Linux', logo: 'linux' },
      { name: 'Windows Server', logo: 'windows' },
    ],
  },
  {
    title: 'Devops',
    skills: [
      {name: 'Docker',logo: 'docker'},
      { name: 'Bash', logo: 'bash' },
      { name: 'PowerShell', logo: 'powershell' }
    ]
  },
  {
    title: 'Conformité & Méthodes',
    skills: [
      { name: 'Conformité RGPD', logo: 'lock' },
      { name: 'Méthodes Agiles', logo: 'agile', ext: 'webp' },
      { name: 'Documentation Technique', logo: 'microsoft-word' },
      { name: 'Git', logo: 'git' }
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function SkillGrid({ showLevel = false }) {
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
            duration: 0.8,
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
    <div ref={containerRef} className="flex flex-col gap-y-[5vh] w-full justify-center">
      {skillCategories.map((cat, index) => (
        <div 
          key={cat.title} 
          ref={(el) => (categoryRefs.current[index] = el)}
          className="flex gap-x-[5vw]"
        >
          <h3 className="text-5xl text-text-primary oswald-font text-center max-w-[20vw] w-[20vw] font-bold mb-2">
            {cat.title}
          </h3>
          <div className="grid grid-cols-4 gap-x-20 justify-items-center content-start">
            {cat.skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-item flex items-center gap-x-4 justify-center mt-[5px]"
              >
                <img
                  className="h-15 w-10 object-contain"
                  src={`/logo/${skill.logo}.${skill.ext || 'svg'}`}
                  alt={`${skill.name} Logo`}
                />
                <h4 className="text-text-primary max-w-16 grotesk-font text-lg ">{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
