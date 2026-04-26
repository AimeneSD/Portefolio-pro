import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', tel: '', societe: '', message: '',
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ nom: '', prenom: '', email: '', tel: '', societe: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-[70vw] max-w-3xl flex flex-col gap-[100px] self-center mt-[90px] mb-[80px] items-center max-lg:w-[90vw]">
      <section className="flex flex-col mt-[60px]  gap-10 w-full" id="contact-form-section">
        <div>
          <h1 className="text-4xl font-semibold text-text-primary">
            <span className="green-text">/</span>collaborons
          </h1>
          <p className="text-text-secondary mt-4">
            N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.
          </p>
        </div>

        {status === 'success' && (
          <div className="bg-green-900/30 border border-green-500 text-green-400 px-4 py-3 rounded" id="contact-success">
            Message envoyé avec succès !
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded" id="contact-error">
            Erreur lors de l'envoi du message. Veuillez réessayer.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-0 max-w-[50vw] max-lg:max-w-full">
          {/* Nom + Prénom */}
          <div className="flex gap-4 max-sm:flex-col">
            <div className="relative flex-1 mb-5">
              <input
                className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus:border-btn-blue transition-colors placeholder:text-text-secondary/50"
                type="text" name="nom" placeholder="Nom*" required maxLength={400}
                value={formData.nom} onChange={handleChange}
              />
            </div>
            <div className="relative flex-1 mb-5">
              <input
                className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus:border-btn-blue transition-colors placeholder:text-text-secondary/50"
                type="text" name="prenom" placeholder="Prénom" maxLength={400}
                value={formData.prenom} onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative mb-5">
            <input
              className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus:border-btn-blue transition-colors placeholder:text-text-secondary/50"
              type="email" name="email" placeholder="Adresse Email*" required maxLength={400}
              value={formData.email} onChange={handleChange}
            />
          </div>

          {/* Téléphone */}
          <div className="relative mb-5">
            <input
              className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus:border-btn-blue transition-colors placeholder:text-text-secondary/50"
              type="tel" name="tel" placeholder="N° de téléphone portable" maxLength={400}
              value={formData.tel} onChange={handleChange}
            />
          </div>

          {/* Société */}
          <div className="relative mb-5">
            <input
              className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus:border-btn-blue transition-colors placeholder:text-text-secondary/50"
              type="text" name="societe" placeholder="Votre société*" required maxLength={400}
              value={formData.societe} onChange={handleChange}
            />
          </div>

          {/* Message */}
          <div className="relative mb-5">
            <textarea
              className="w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus:border-btn-blue transition-colors resize-y min-h-[120px] placeholder:text-text-secondary/50"
              name="message" placeholder="Votre message*" required rows={4}
              value={formData.message} onChange={handleChange}
            />
          </div>

          <small className="text-text-secondary mb-4">* Champ Obligatoire</small>

          <div className="flex items-start gap-2 mb-6">
            <input type="checkbox" required className="mt-1 accent-btn-blue" />
            <p className="text-text-secondary text-sm">
              En soumettant ce formulaire, j'accepte que mes données personnelles soient utilisées pour me recontacter.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="self-start px-10 py-2.5 rounded bg-btn-blue text-text-primary text-xl font-semibold cursor-pointer shadow-[0px_5px_0px] shadow-btn-blue-shadow border-none transition-all duration-100 hover:translate-y-1 hover:shadow-[0px_1px_0px] hover:shadow-btn-blue-shadow active:translate-y-[5px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            id="contact-submit"
          >
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      </section>
    </main>
  );
}
