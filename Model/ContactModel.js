const nodemailer = require('nodemailer');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

class ContactModel {
  /**
   * Envoie un email de contact via SMTP Gmail (équivalent de contact_submit.php)
   * @param {Object} data - { nom, prenom, email, tel, societe, message }
   */
  static async sendEmail(data) {
    const { nom, prenom, email, tel, societe, message } = data;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
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
      from: `"Formulaire de Contact" <${process.env.SMTP_USER}>`,
      replyTo: `${nom} ${prenom || ''} <${email}>`,
      to: process.env.SMTP_USER,
      subject: 'Contact via Portefolio',
      html: htmlBody,
      text: `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nTéléphone: ${tel}\nSociété: ${societe}\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  }
}

module.exports = ContactModel;
