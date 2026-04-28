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

const multer = require('multer');
const fs = require('fs');

// ─── Configuration Multer pour les images et documents ─────────
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = '';
    if (file.fieldname === 'image') {
      dir = path.join(__dirname, 'frontend', 'public', 'images');
    } else if (file.fieldname === 'pdf') {
      dir = path.join(__dirname, 'frontend', 'public', 'documents');
    }
    
    // On s'assure que le dossier existe
    if (dir && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // On nettoie le nom d'origine pour éviter les espaces ou caractères bizarres
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, uniqueSuffix + '-' + cleanName);
  }
});
const upload = multer({ storage: storage });

// ─── Routes API : Admin ───────────────────────────
app.post('/api/admin/projects', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createProject);
app.delete('/api/admin/projects/:id', deleteProject);

// ─── Servir le frontend buildé (production) ───────
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// ─── Route de Santé (Keep-Alive) ──────────────────
app.get('/api/health', async (req, res) => {
  try {
    const pool = require('./Model/db');
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ok', message: 'Database is alive' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// toutes les routes non-API renvoient vers index.html (SPA React Router)
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// ─── Démarrage ────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Serveur Express démarré sur http://localhost:${PORT}`);
});
