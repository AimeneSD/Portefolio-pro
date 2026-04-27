const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares ──────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Controllers ──────────────────────────────────
const { getProjects, getRecentProjects } = require('./Controller/projectController');
const { sendContact } = require('./Controller/contactController');
const { createProject, deleteProject } = require('./Controller/adminController');

// ─── Routes API : Projets ─────────────────────────
app.get('/api/projects/recent', getRecentProjects);
app.get('/api/projects', getProjects);

// ─── Routes API : Contact ─────────────────────────
app.post('/api/contact', sendContact);

// ─── Routes API : Admin ───────────────────────────
app.post('/api/admin/projects', createProject);
app.delete('/api/admin/projects/:id', deleteProject);

// ─── Servir le frontend buildé (production) ───────
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Toutes les routes non-API renvoient vers index.html (SPA React Router)
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// ─── Démarrage ────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Serveur Express démarré sur http://localhost:${PORT}`);
});
