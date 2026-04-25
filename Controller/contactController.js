const ContactModel = require('../Model/ContactModel');

/**
 * POST /api/contact
 * Reçoit les données du formulaire de contact et envoie l'email
 */
async function sendContact(req, res) {
  try {
    const { nom, prenom, email, tel, societe, message } = req.body;

    // Validation basique
    if (!nom || !email || !societe || !message) {
      return res.status(400).json({ error: 'Les champs nom, email, société et message sont obligatoires.' });
    }

    await ContactModel.sendEmail({ nom, prenom, email, tel, societe, message });
    res.json({ success: true, message: 'Message envoyé avec succès !' });
  } catch (error) {
    console.error('Erreur sendContact:', error);
    res.status(500).json({ error: "Erreur lors de l'envoi du message." });
  }
}

module.exports = { sendContact };
