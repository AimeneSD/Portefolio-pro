# Portfolio Professionnel - Fullstack

Bienvenue sur le dépôt de mon portfolio professionnel. Ce projet est une application web moderne, performante et sécurisée, conçue pour mettre en avant mes compétences, mes projets et faciliter la prise de contact.

---

## Stack Technique

### Frontend
- **React** : Bibliothèque UI moderne pour une interface réactive.
- **Vite** : Outil de build ultra-rapide pour une expérience de développement fluide.
- **Tailwind CSS** : Framework CSS utilitaire pour un design sur mesure et responsive.
- **GSAP & Lenis** : Animations fluides et scroll progressif pour une expérience utilisateur premium.
- **React Router** : Gestion optimisée de la navigation SPA.
- **Styled Components** : Pour une gestion modulaire des styles.
- **Lottie** : Intégration d'animations vectorielles légères.

### Backend
- **Node.js & Express** : Serveur robuste et rapide pour gérer l'API.
- **MySQL (via mysql2/promise)** : Base de données relationnelle pour le stockage des projets et des messages.
- **Multer** : Gestion sécurisée des uploads de fichiers (images et PDFs).
- **Nodemailer & Resend** : Envoi de courriels pour le formulaire de contact.
- **Dotenv** : Gestion sécurisée des configurations via variables d'environnement.

---

## 🚀 Mise en place locale

### Prérequis
- Node.js (version 18+)
- MySQL

### Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/AimeneSD/Portefolio-pro
   cd Portefolio-pro
   ```

2. **Configuration des variables d'environnement**
   Créez un fichier `.env` à la racine (voir `.env.example` si disponible) avec :
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=votre_user
   DB_PASSWORD=votre_password
   DB_NAME=portefolio
   RESEND_API_KEY=votre_cle
   ```

3. **Installer les dépendances et lancer le projet**
   ```bash
   # Installation globale et frontend + lancement backend dev
   npm install
   cd frontend && npm install
   cd ..
   npm run dev
   ```

---

## Sécurité & Bonnes Pratiques

Le projet intègre plusieurs couches de sécurité pour garantir l'intégrité des données :

- **Variables d'Environnement** : Aucune donnée sensible (clés API, accès BDD) n'est stockée en clair dans le code.
- **CORS (Cross-Origin Resource Sharing)** : Configuration stricte pour limiter les appels API aux domaines autorisés.
- **Sanitisation des Uploads** : Utilisation de `multer` avec nettoyage des noms de fichiers pour éviter les injections de chemins ou de scripts.
- **Connexions BDD Sécurisées** : Support du SSL pour les connexions MySQL distantes et utilisation d'un pool de connexions pour prévenir les surcharges.
- **Séparation des préoccupations (MVC)** : Structure claire en Contrôleurs et Modèles pour une maintenance facilitée et une réduction des failles logiques.

---

##  Scalabilité

L'architecture a été pensée pour évoluer sereinement :

- **Architecture Découplée** : Le frontend (Vite/React) et le backend (Express) sont indépendants. Ils peuvent être hébergés sur des serveurs différents (ex: Vercel pour le front, Render pour le back) ou servis ensemble.
- **Pool de Connexion** : Utilisation de `mysql2.createPool` pour gérer efficacement plusieurs requêtes simultanées sans saturer la base de données.
- **Optimisation des Assets** : Utilisation de Vite pour minifier le code et Multer pour organiser le stockage des images, facilitant la transition vers un stockage cloud (S3/Cloudinary) si besoin.
- **SPA (Single Page Application)** : Réduit la charge serveur en ne téléchargeant que les données nécessaires via l'API.

---

## Structure du Projet

```text
├── Controller/        # Logique métier (Projets, Contact, Admin)
├── Model/             # Interactions avec la base de données (SQL)
├── frontend/          # Application React (Vite, Tailwind, GSAP)
│   ├── src/           # Composants et Pages
│   └── dist/          # Build de production
├── index.js           # Point d'entrée du serveur Express
└── package.json       # Dépendances et scripts
```

---

## Contact
Pour toute question ou collaboration, n'hésitez pas à me contacter via l'adresse email suivante : aimenesaoud@gmail.com .
