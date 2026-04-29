const nodemailer = require('nodemailer');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

class ContactModel {
  /**
   * Envoie un email de contact via SMTP Gmail (équivalent de contact_submit.php)
   * @param {Object} data - { nom, prenom, email, tel, societe, message }
   */
  static async sendEmail(data) {
    const { nom, prenom, email, tel, societe, message } = data;

    // Utilise les mêmes noms qu'en production sur Render
    const userEmail = process.env.SMTP_USER;
    const userPass = process.env.SMTP_PASS;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: userEmail,
        pass: userPass,
      },
      family: 4, // Force IPv4 pour éviter l'erreur ENETUNREACH sur Render
      connectionTimeout: 20000, // Réduit le temps d'attente avant timeout
      debug: true, // Affiche les détails dans les logs
      logger: true // Log les échanges SMTP
    });

    const htmlBody = `
      <h2>Nouveau message reçu depuis le formulaire</h2>
      <p><b>Nom :</b> ${nom}</p>
      <p><b>Prénom :</b> ${prenom || 'Non renseigné'}</p>
      <p><b>Email :</b> ${email}</p>
      <p><b>Téléphone :</b> ${tel || 'Non renseigné'}</p>
      <p><b>Société :</b> ${societe}</p>
      <hr>
      <p><b>Message :</b><br>${message.replace(/\n/g, '<br>')}</p>
    `;

    const mailOptions = {
      from: `"Formulaire de Contact" <${userEmail}>`,
      replyTo: `${nom} ${prenom || ''} <${email}>`,
      to: userEmail,
      subject: 'Contact via Portefolio',
      html: htmlBody,
      text: `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nTéléphone: ${tel}\nSociété: ${societe}\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  }
}

module.exports = ContactModel;
