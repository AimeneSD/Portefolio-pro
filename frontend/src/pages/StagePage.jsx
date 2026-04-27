import SkillGrid from '../components/SkillGrid';
import MachaButton from '../components/MachaButton';

export default function StagePage() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-bg-primary pb-20 pt-[15vh]">
      <div className="flex flex-col items-center gap-16 w-full px-5">
        
        {/* HEADER */}
        <div className="flex flex-col items-center max-w-5xl gap-6">
          <h1 className="text-5xl md:text-7xl font-extrabold oswald-font text-text-primary text-center leading-tight">
            RECHERCHE DE <span className="macha-text-green">STAGE</span>
          </h1>
          <div className="inline-flex px-6 py-3 border border-[#abff84] bg-[#abff84]/10 rounded-full">
             <p className="text-lg md:text-xl text-text-primary font-semibold text-center">
               Du 21 Juin au 31 Juillet 2026 <span className="text-[#abff84] mx-2">•</span> 5 à 6 semaines
             </p>
          </div>
        </div>

        {/* MON PROJET */}
        <section className="flex flex-col max-w-5xl w-full gap-6 mt-10">
          <h2 className="text-4xl md:text-5xl font-extrabold oswald-font text-text-primary">
            <span className="macha-text-green">MON PROJET</span>
          </h2>
          <div className="p-8 border border-border bg-black/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#abff84]"></div>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
              Étudiant polyvalent et curieux, je recherche une immersion me permettant de découvrir les réalités du métier de technicien informatique. Je suis particulièrement intéressé par les environnements mélangeant <strong className="text-white">développement (SLAM)</strong> et <strong className="text-white">infrastructure (SISR)</strong>.
            </p>
          </div>
          <div className="self-start mt-4">
            {/* Le lien pointe vers l'accueil car le formulaire de contact y est intégré */}
            <MachaButton label="Me Contacter" to="/" /> 
          </div>
        </section>

        {/* SKILLS */}
        <section className="flex flex-col items-center w-full gap-10 mt-20 overflow-hidden">
          <h2 className="text-5xl md:text-6xl font-extrabold oswald-font text-text-primary">
            <span className="macha-text-green">COMPÉTENCES</span>
          </h2>
          <div className="w-full flex mt-10">
            <SkillGrid showLevel className="flex flex-col items-center"/>
          </div>
        </section>

      </div>
    </main>
  );
}
