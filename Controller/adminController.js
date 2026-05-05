const ProjectModel = require('../Model/ProjectModel');

/**
 * POST /api/admin/projects
 * Ajoute un nouveau projet
 */
async function createProject(req, res) {
  try {
    const { titre, description, categorie, technos } = req.body;
    let lien = req.body.lien;
    
    if (req.files && req.files['pdf']) {
      lien = 'fichiers/' + req.files['pdf'][0].filename;
    }

    const image = req.files && req.files['image'] ? req.files['image'][0].filename : req.body.image;

    if (!titre) {
      return res.status(400).json({ error: 'Le titre est obligatoire.' });
    }

    const result = await ProjectModel.create({ titre, description, categorie, technos, lien, image });
    res.json({ success: true, message: 'Projet ajouté avec succès !', id: result.insertId });
  } catch (error) {
    console.error('Erreur createProject:', error);
    res.status(500).json({ error: "Erreur lors de l'ajout du projet." });
  }
}

/**
 * DELETE /api/admin/projects/:id
 * Supprime un projet par ID
 */
async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const result = await ProjectModel.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Projet introuvable.' });
    }

    res.json({ success: true, message: 'Projet supprimé.' });
  } catch (error) {
    console.error('Erreur deleteProject:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du projet.' });
  }
}

module.exports = { createProject, deleteProject };
