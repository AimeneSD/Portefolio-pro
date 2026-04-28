const pool = require('./Model/db');

const schema = `
DROP TABLE IF EXISTS projets;

CREATE TABLE projets (
  id int(11) NOT NULL AUTO_INCREMENT,
  titre varchar(255) NOT NULL,
  description text DEFAULT NULL,
  categorie varchar(50) DEFAULT NULL,
  technos varchar(255) DEFAULT NULL,
  lien varchar(500) DEFAULT NULL,
  image varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion de vos données réelles (avec apostrophes corrigées)
INSERT INTO projets (id, titre, description, categorie, technos, lien, image) VALUES
(1, 'Login System', 'Application web permettant de créer des comptes utilisateurs, se connecter, de visualiser ses informations et de réinitialiser son mot de passe ', 'web', 'php,css,mysql', 'https://sioslam.com/27_SAOUD/td5/', '1777306090990-420549433-login_system_preview.png'),
(2, 'Calculator Project', 'Calculatrice web développée en Vanilla JS incluant les fonctions racine carré, les exposants et les parenthèses ', 'web', 'js,css', 'https://sioslam.com/27_SAOUD/CalculatorProject/', '1777309237991-335078047-Calculator_screenshot.webp'),
(3, 'Documentation d''installation GLPI', 'Déploiement d''une solution de ticketing et mise en place d''un inventaire automatisé sous serveur virtuel ', 'reseau', 'linux, virtualbox, bash', '/27_SAOUD/fichiers/Doc_GLPI_Debian.pdf', '1777310511075-992831922-Image_Doc_GLPI_Debian.webp');
`;

async function seed() {
    try {
        console.log("🚀 Mise à jour de la base Aiven avec vos données...");
        const queries = schema.split(';').filter(q => q.trim() !== '');
        for (let q of queries) {
            await pool.query(q);
        }
        console.log("✨ Succès ! Vos projets réels sont maintenant sur Aiven.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Erreur lors de l'insertion :");
        console.error(err);
        process.exit(1);
    }
}

seed();
