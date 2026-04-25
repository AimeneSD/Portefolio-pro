const ProjectModel = require('../Model/ProjectModel');

/**
 * GET /api/projects
 * Récupère tous les projets, avec filtre optionnel par catégorie
 */
async function getProjects(req, res) {
  try {
    const { category } = req.query;

    let projets;
    if (category) {
      projets = await ProjectModel.getByCategory(category);
    } else {
      projets = await ProjectModel.getAll();
    }

    res.json(projets);
  } catch (error) {
    console.error('Erreur getProjects:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des projets.' });
  }
}

/**
 * GET /api/projects/recent
 * Récupère les 3 derniers projets (pour la page d'accueil)
 */
async function getRecentProjects(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const projets = await ProjectModel.getRecent(limit);
    res.json(projets);
  } catch (error) {
    console.error('Erreur getRecentProjects:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
}

module.exports = { getProjects, getRecentProjects };
