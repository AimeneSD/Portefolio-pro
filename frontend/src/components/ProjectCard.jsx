/**
 * Carte de projet réutilisable
 * @param {{ projet: { titre, description, lien, image, technos } }} props
 */
export default function ProjectCard({ projet }) {
  // Construit les logos des technos à partir de la chaîne "html,css,js"
  const techLogos = projet.technos
    ? projet.technos.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
    : [];

  // Déterminer le href : si lien commence par http, le garder tel quel, sinon préfixer
  const href = projet.lien?.startsWith('http') ? projet.lien : `/${projet.lien || '#'}`;

  return (
    <div
      className="flex flex-col border border-border transition-transform duration-500 hover:scale-[1.03] h-[500px]"
      id={`project-card-${projet.id}`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
        {/* Image */}
        <img
          className="w-full object-contain"
          src={`/images/${projet.image}`}
          alt={`Image du projet ${projet.titre}`}
        />

        {/* Contenu texte */}
        <div className="flex flex-col flex-1 min-h-[150px] border-y border-border">
          <div className="text-[140%] text-text-primary mx-5 mt-2.5">{projet.titre}</div>
          <p className="text-text-secondary mx-5 mt-2.5">{projet.description}</p>
        </div>

        {/* Logos technos */}
        <div className="flex mt-auto pb-2.5">
          <div className="flex mt-2.5 ml-2.5 gap-[5px]">
            {techLogos.map((tech) => (
              <img
                key={tech}
                src={`/logo/${tech}_logo.webp`}
                className="h-10 w-10 object-contain"
                alt={tech}
              />
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}
