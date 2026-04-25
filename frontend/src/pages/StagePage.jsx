import SkillGrid from '../components/SkillGrid';

export default function StagePage() {
  return (
    <main className="w-[70vw] max-w-7xl flex flex-col gap-[100px] self-center mt-[90px] mb-[80px] max-lg:w-[90vw] max-lg:mt-[90px]">
      <section id="stage-intro">
        <h1 className="text-4xl font-semibold text-text-primary">
          <span className="green-text">/</span>stage
        </h1>
        <p className="text-text-secondary mt-4">
          En recherche active d'un stage de 4 à 5 semaines entre le 21 juin et le 31 août
        </p>
      </section>

      <section id="stage-projet">
        <h2 className="text-3xl font-semibold text-text-primary mb-4">
          <span className="green-text">#</span>mon projet
        </h2>
        <p className="text-text-secondary">
          Étudiant polyvalent et curieux, je recherche une immersion me permettant de découvrir les réalités du métier
          de technicien informatique. Je suis particulièrement intéressé par les environnements mélangeant{' '}
          <strong className="text-text-primary">développement (SLAM)</strong> et{' '}
          <strong className="text-text-primary">infrastructure (SISR)</strong>.
        </p>
      </section>

      <section id="stage-skills">
        <h2 className="text-3xl font-semibold text-text-primary mb-8">
          <span className="green-text">#</span>skills
        </h2>
        <SkillGrid showLevel />
      </section>
    </main>
  );
}
