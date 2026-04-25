/**
 * Données statiques des compétences (identique à index.php)
 */
const skillCategories = [
  {
    title: 'Front-end',
    skills: [
      { name: 'HTML', logo: 'html', level: 'intermédiaire' },
      { name: 'CSS', logo: 'css', level: 'intermédiaire' },
      { name: 'Javascript', logo: 'js', level: 'débutant' },
    ],
  },
  {
    title: 'Back-end',
    skills: [
      { name: 'PHP', logo: 'php', level: 'débutant' },
      { name: 'MySQL', logo: 'mysql', level: 'débutant' },
      { name: 'Python', logo: 'python', level: 'intermédiaire' },
      { name: 'Java', logo: 'java', level: 'débutant' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'Bootstrap', logo: 'bootstrap', level: 'intermédiaire' },
    ],
  },
  {
    title: 'Skills',
    skills: [
      { name: 'GitHub', logo: 'github', level: 'intermédiaire' },
      { name: 'Git', logo: 'git', level: 'intermédiaire' },
      { name: 'VS Code', logo: 'vscode', level: 'intermédiaire' },
    ],
  },
];

/**
 * Grille de compétences réutilisable
 * @param {{ showLevel?: boolean }} props - Affiche le niveau de maîtrise si true
 */
export default function SkillGrid({ showLevel = false }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full justify-center">
      {skillCategories.map((cat) => (
        <div key={cat.title} className="flex flex-col text-center">
          <h3 className="text-2xl text-text-primary font-bold mb-2">{cat.title}</h3>
          <div className="grid grid-cols-2 border border-border justify-items-center content-start aspect-square w-[250px] mx-auto">
            {cat.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center mt-[5px]"
              >
                <img
                  className="h-20 w-20 object-contain"
                  src={`/logo/${skill.logo}_logo.webp`}
                  alt={`${skill.name} Logo`}
                />
                <h4 className="text-text-primary font-semibold text-sm">{skill.name}</h4>
                {showLevel && skill.level && (
                  <span className="text-text-secondary text-xs">{skill.level}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
