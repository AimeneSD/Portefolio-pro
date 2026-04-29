const nodemailer = require('nodemailer');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

class ContactModel {
  /**
   * Envoie un email de contact via SMTP Gmail (équivalent de contact_submit.php)
   * @param {Object} data - { nom, prenom, email, tel, societe, message }
   */
  static async sendEmail(data) {
    const { nom, prenom, email, tel, societe, message } = data;

    // Supporte à la fois EMAIL_USER (local) et SMTP_USER (Render)
    const userEmail = process.env.EMAIL_USER || process.env.SMTP_USER;
    const userPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail,
        pass: userPass,
      },
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
