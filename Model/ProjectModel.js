const pool = require('./db');

class ProjectModel {
  /**
   * Récupère tous les projets, triés du plus récent au plus ancien
   */
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM projets ORDER BY id DESC');
    return rows;
  }

  /**
   * Récupère les N projets les plus récents
   * @param {number} limit - Nombre de projets à récupérer
   */
  static async getRecent(limit = 3) {
    const [rows] = await pool.query('SELECT * FROM projets ORDER BY id DESC LIMIT ?', [limit]);
    return rows;
  }

  /**
   * Récupère les projets par catégorie (web, reseau)
   * @param {string} category - Catégorie à filtrer
   */
  static async getByCategory(category) {
    const [rows] = await pool.query('SELECT * FROM projets WHERE categorie = ? ORDER BY id DESC', [category]);
    return rows;
  }

  /**
   * Crée un nouveau projet
   * @param {Object} data - { titre, description, categorie, technos, lien, image }
   */
  static async create(data) {
    const { titre, description, categorie, technos, lien, image } = data;
    const [result] = await pool.query(
      'INSERT INTO projets (titre, description, categorie, technos, lien, image) VALUES (?, ?, ?, ?, ?, ?)',
      [titre, description || '', categorie || '', technos || '', lien || '', image || '']
    );
    return result;
  }

  /**
   * Supprime un projet par ID
   * @param {number} id
   */
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM projets WHERE id = ?', [id]);
    return result;
  }
}

module.exports = ProjectModel;
