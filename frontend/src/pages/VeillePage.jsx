export default function VeillePage() {
  return (
    <main className="  flex flex-col gap-[100px] self-center mt-[90px] mb-[80px] max-lg:w-[90vw] max-lg:mt-[90px]">
      <section id="veille-techno" className=" flex flex-col items-center">
        <h1 className="text-4xl font-semibold text-text-primary mb-10">
          <span className="green-text">/</span>tableau de veille technologique
        </h1>

        <div className="max-w-7xl">
          <table className="w-full border-collapse border border-border text-sm text-text-secondary">
            <tbody>
              {/* Objectif */}
              <tr>
                <th className="border border-border bg-bg-secondary text-text-primary p-3 text-left font-bold w-[200px]">
                  Objectif de la veille technologique
                </th>
                <td className="border border-border p-3" colSpan={6}>
                  Analyser l'évolution des cyberattaques ciblant les dépendances logicielles et évaluer l'efficacité
                  des nouveaux standards de sécurisation (SBOM, SCA) pour renforcer l'intégrité des développements en
                  2026.
                </td>
              </tr>

              {/* En-têtes */}
              <tr className="bg-bg-secondary text-text-primary">
                <th className="border border-border p-3">Sources d'information</th>
                <th className="border border-border p-3">Crédibilité de l'auteur</th>
                <th className="border border-border p-3">Fiabilité de la source</th>
                <th className="border border-border p-3">Objectivité de l'information</th>
                <th className="border border-border p-3">Exactitude de l'information</th>
                <th className="border border-border p-3">Actualité de l'information</th>
                <th className="border border-border p-3">Pertinence de l'information</th>
              </tr>

              {/* Données */}
              <tr>
                <td className="border border-border p-3">
                  <a
                    href="https://www.youtube.com/watch?v=MEJ-ae_D8X4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Conférence Devoxx France Youtube
                  </a>
                </td>
                <td className="border border-border p-3">
                  Abdel SGHIOUAR
                  <br />
                  Senior Cloud Developer Advocate chez Google Cloud
                </td>
                <td className="border border-border p-3">
                  Conférence Devoxx France :
                  <br />
                  événement de référence pour les développeurs depuis 2012
                </td>
                <td className="border border-border p-3">Présentation technique neutre</td>
                <td className="border border-border p-3">
                  Informations validées par les comités techniques de Devoxx.
                </td>
                <td className="border border-border p-3">
                  17-19 avril 2024 (très récent et toujours valide)
                </td>
                <td className="border border-border p-3">
                  Répond exactement à l'usage des SBOM et SLSA.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
