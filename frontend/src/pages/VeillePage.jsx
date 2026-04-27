export default function VeillePage() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-bg-primary pb-20 pt-[15vh]">
      <div className="flex flex-col items-center gap-10 w-full max-w-7xl px-5">
        
        {/* HEADER */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold oswald-font text-text-primary leading-tight">
            VEILLE <span className="macha-text-green">TECHNOLOGIQUE</span>
          </h1>
          <p className="text-text-secondary max-w-2xl text-base md:text-lg">
            Suivi et analyse des évolutions technologiques pour anticiper les tendances et intégrer les meilleures pratiques.
          </p>
        </div>

        {/* TABLE WRAPPER - RESPONSIVE SCROLL */}
        <div className="w-full overflow-x-auto bg-black/40 border border-border p-4 md:p-6 rounded-lg shadow-lg">
          <table className="w-full min-w-[900px] border-collapse text-sm md:text-base text-text-secondary">
            <tbody>
              {/* Objectif */}
              <tr>
                <th className="border border-border/50 bg-[#abff84]/10 text-[#abff84] p-5 text-left font-bold w-[250px] uppercase tracking-wider">
                  Objectif de la veille technologique
                </th>
                <td className="border border-border/50 p-5 text-text-primary" colSpan={6}>
                  Analyser l'évolution des cyberattaques ciblant les dépendances logicielles et évaluer l'efficacité
                  des nouveaux standards de sécurisation (SBOM, SCA) pour renforcer l'intégrité des développements en
                  2026.
                </td>
              </tr>

              {/* En-têtes */}
              <tr className="bg-white/5 text-text-primary">
                <th className="border border-border/50 p-4 text-left font-semibold text-[#abff84]">Sources d'information</th>
                <th className="border border-border/50 p-4 text-left font-semibold text-[#abff84]">Crédibilité de l'auteur</th>
                <th className="border border-border/50 p-4 text-left font-semibold text-[#abff84]">Fiabilité de la source</th>
                <th className="border border-border/50 p-4 text-left font-semibold text-[#abff84]">Objectivité</th>
                <th className="border border-border/50 p-4 text-left font-semibold text-[#abff84]">Exactitude</th>
                <th className="border border-border/50 p-4 text-left font-semibold text-[#abff84]">Actualité</th>
                <th className="border border-border/50 p-4 text-left font-semibold text-[#abff84]">Pertinence</th>
              </tr>

              {/* Données */}
              <tr className="hover:bg-white/10 transition-colors">
                <td className="border border-border/50 p-4">
                  <a
                    href="https://www.youtube.com/watch?v=MEJ-ae_D8X4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#abff84] hover:underline font-bold"
                  >
                    Conférence Devoxx France Youtube
                  </a>
                </td>
                <td className="border border-border/50 p-4 leading-relaxed">
                  <strong className="text-white">Abdel SGHIOUAR</strong>
                  <br />
                  Senior Cloud Developer Advocate chez Google Cloud
                </td>
                <td className="border border-border/50 p-4 leading-relaxed">
                  <strong className="text-white">Conférence Devoxx France :</strong>
                  <br />
                  événement de référence pour les développeurs depuis 2012
                </td>
                <td className="border border-border/50 p-4">Présentation technique neutre</td>
                <td className="border border-border/50 p-4">
                  Informations validées par les comités techniques de Devoxx.
                </td>
                <td className="border border-border/50 p-4 text-white">
                  17-19 avril 2024 (très récent et toujours valide)
                </td>
                <td className="border border-border/50 p-4 text-white font-medium">
                  Répond exactement à l'usage des SBOM et SLSA.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* MOBILE HINT */}
        <p className="text-text-secondary text-sm md:hidden mt-2 text-center flex items-center gap-2">
          <span className="text-lg">↔️</span> Faites glisser le tableau pour voir plus de colonnes
        </p>

      </div>
    </main>
  );
}
