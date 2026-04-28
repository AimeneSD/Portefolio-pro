import { useEffect } from 'react';

export default function MentionsLegales() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex flex-col items-center mt-[120px] mb-[100px] px-6">
      <div className="w-full max-w-4xl flex flex-col gap-12">
        <h1 className="text-5xl md:text-7xl oswald-font font-extrabold text-text-primary">
          MENTIONS <span className="macha-text-green">LÉGALES</span>
        </h1>

        <section className="flex flex-col gap-8 text-text-secondary leading-relaxed">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl oswald-font font-bold text-text-primary uppercase tracking-wider">1. Édition du site</h2>
            <p className="grotesk-font">
              Le présent site, accessible à l'URL <span className="text-text-primary">sioslam.com/27_SAOUD</span>, est édité par :<br />
              <strong className="text-text-primary font-semibold">Aïmène Saoud</strong>, agissant en qualité d'étudiant en BTS SIO (Services Informatiques aux Organisations).<br />
              Contact : <a href="mailto:aimenesaoud@gmail.com" className="macha-text-green hover:underline">aimenesaoud@gmail.com</a>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl oswald-font font-bold text-text-primary uppercase tracking-wider">2. Hébergement de l'infrastructure</h2>
            <p>Le site repose sur une architecture distribuée pour garantir performance et sécurité :</p>
            <ul className="list-disc ml-5 grotesk-font flex flex-col gap-2">
              <li>
                <strong className="text-text-primary">Hébergement Frontend (Interface) :</strong> Hostinger International Ltd, situé à Kaunas, Lituanie.
              </li>
              <li>
                <strong className="text-text-primary">Hébergement Backend (Serveur d'API) :</strong> Render.com, exploité par Render Services, Inc., situé à San Francisco, USA.
              </li>
              <li>
                <strong className="text-text-primary">Gestion de la Base de Données :</strong> Aiven.io, exploité par Aiven Oy, situé à Helsinki, Finlande.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl oswald-font font-bold text-text-primary uppercase tracking-wider">3. Protection des données personnelles (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), les informations suivantes sont portées à votre connaissance :</p>
            <ul className="list-disc ml-5 grotesk-font flex flex-col gap-4">
              <li>
                <strong className="text-text-primary">Finalité du traitement :</strong> Les données collectées via le formulaire de contact (nom, email, message) sont utilisées exclusivement pour répondre aux demandes de contact professionnel.
              </li>
              <li>
                <strong className="text-text-primary">Base légale :</strong> Le traitement est fondé sur le consentement de l'utilisateur, manifesté lors de l'envoi du formulaire.
              </li>
              <li>
                <strong className="text-text-primary">Destinataire des données :</strong> Seul l'éditeur du site (Aïmène Saoud) est destinataire des données.
              </li>
              <li>
                <strong className="text-text-primary">Durée de conservation :</strong> Les données sont conservées pendant une durée maximale de 12 mois après le dernier échange.
              </li>
              <li>
                <strong className="text-text-primary">Vos droits :</strong> Vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données. Pour exercer ces droits, vous pouvez me contacter à l'adresse suivante : <a href="mailto:aimenesaoud@gmail.com" className="macha-text-green hover:underline">aimenesaoud@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-8">
            <h2 className="text-2xl oswald-font font-bold text-text-primary uppercase tracking-wider">4. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu (textes, images, codes sources) est la propriété de l'éditeur, sauf mention contraire. Toute reproduction est interdite sans autorisation préalable.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
