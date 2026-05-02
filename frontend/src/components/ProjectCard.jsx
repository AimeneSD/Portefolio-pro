/**
 * Carte de projet réutilisable
 * @param {{ projet: { titre, description, lien, image, technos } }} props
 */
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '');
const BASE_URL = import.meta.env.BASE_URL || '/';

export default function ProjectCard({ projet }) {
  // Construit les logos des technos à partir de la chaîne "html,css,js"
  const techLogos = projet.technos
    ? projet.technos.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
    : [];

  // Déterminer le href : si lien commence par http, le garder tel quel, sinon préfixer
  const href = projet.lien?.startsWith('http') ? projet.lien : `${BASE_URL}${projet.lien || '#'}`;

  return (
    <div
      className="flex flex-col border border-border transition-transform duration-500 hover:scale-[1.03] h-auto"
      id={`project-card-${projet.id}`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
        {/* Image */}
        <img
          className="w-full object-contain"
          src={`${BASE_URL}${projet.image?.startsWith('images/') ? projet.image : `images/${projet.image}`}`}
          alt={`Image du projet ${projet.titre}`}
          onError={(e) => {
            // Si l'image n'est pas sur Hostinger, on tente de la charger depuis le Backend (Render)
            const backendUrl = `${API_URL}/${projet.image?.startsWith('images/') ? projet.image : `images/${projet.image}`}`;
            if (e.target.src !== backendUrl) {
              e.target.src = backendUrl;
            }
          }}
        />

        {/* Contenu texte */}
        <div className="flex flex-col flex-1 min-h-[150px] border-border">
          <div className="text-[140%] text-text-primary mx-5 mt-2.5">{projet.titre}</div>
          <p className="text-text-secondary mx-5 mt-2.5">{projet.description}</p>
        </div>

        {/* Logos technos */}
        <div className="flex ml-5 mb-2.5 ">
          <div className="flex   gap-x-5">
            {techLogos.map((tech) => (
              <img
                key={tech}
                src={`${BASE_URL}logo/${tech}.svg`}
                onError={(e) => {
                  if (e.target.src.endsWith('.svg')) {
                    e.target.src = `${BASE_URL}logo/${tech}.webp`;
                  } else {
                    e.target.style.display = 'none';
                  }
                }}
                className="h-10 w-10 object-contain"
                alt={tech}
                title={tech}
              />
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}
