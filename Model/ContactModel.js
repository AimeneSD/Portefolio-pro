const { Resend } = require('resend');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

// Initialisation de Resend avec la clé API
const resend = new Resend(process.env.RESEND_API_KEY);

class ContactModel {
  /**
   * Envoie un email via l'API Resend (contourne les blocages SMTP de Render)
   * @param {Object} data - { nom, prenom, email, tel, societe, message }
   */
  static async sendEmail(data) {
    const { nom, prenom, email, tel, societe, message } = data;
    
    // Sur le plan gratuit de Resend, tu ne peux envoyer des mails qu'à toi-même
    // via l'adresse "onboarding@resend.dev"
    const recipient = process.env.SMTP_USER || 'aimenesaoud@gmail.com';

    const { data: resData, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: recipient,
      subject: `Nouveau message de ${nom} ${prenom || ''}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>Nouveau message reçu depuis le portfolio</h2>
          <p><b>Nom :</b> ${nom} ${prenom || ''}</p>
          <p><b>Email de l'expéditeur :</b> ${email}</p>
          <p><b>Téléphone :</b> ${tel || 'Non renseigné'}</p>
          <p><b>Société :</b> ${societe}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><b>Message :</b></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Erreur Resend Details:', error);
      throw new Error(error.message);
    }

    return resData;
  }
}

module.exports = ContactModel;
