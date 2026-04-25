import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    titre: '', description: '', categorie: '', technos: '', lien: '', image: '',
  });
  const [message, setMessage] = useState('');
  const [projets, setProjets] = useState([]);

  const loadProjets = () => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjets(data))
      .catch(console.error);
  };

  useEffect(() => { loadProjets(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Projet ajouté avec succès !');
        setFormData({ titre: '', description: '', categorie: '', technos: '', lien: '', image: '' });
        loadProjets();
      }
    } catch {
      setMessage("Erreur lors de l'ajout.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet ?')) return;
    try {
      await fetch(`${API_URL}/api/admin/projects/${id}`, { method: 'DELETE' });
      loadProjets();
    } catch {
      setMessage('Erreur lors de la suppression.');
    }
  };

  const inputClass = "w-full bg-transparent text-text-primary text-lg px-4 py-3 border-b border-text-secondary/30 outline-none focus:border-btn-blue transition-colors placeholder:text-text-secondary/50";

  return (
    <main className="w-[70vw] max-w-3xl flex flex-col gap-12 self-center mt-[90px] mb-[80px] max-lg:w-[90vw]">
      <h1 className="text-4xl font-semibold text-text-primary">
        <span className="green-text">#</span>Ajouter un projet
      </h1>

      {message && <p className="text-success font-bold">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input className={inputClass} type="text" name="titre" placeholder="Titre du projet *" required value={formData.titre} onChange={handleChange} />
        <textarea className={`${inputClass} resize-y min-h-[80px]`} name="description" placeholder="Description du projet" value={formData.description} onChange={handleChange} />
        <select name="categorie" className={`${inputClass} cursor-pointer`} required value={formData.categorie} onChange={handleChange}>
          <option value="" disabled>Choisir une catégorie</option>
          <option value="web">Projets Web</option>
          <option value="reseau">Réseau &amp; Support</option>
        </select>
        <input className={inputClass} type="text" name="lien" placeholder="Lien (URL ou chemin)" value={formData.lien} onChange={handleChange} />
        <input className={inputClass} type="text" name="technos" placeholder="Technos (ex: html,php,js)" value={formData.technos} onChange={handleChange} />
        <input className={inputClass} type="text" name="image" placeholder="Nom du fichier image *" required value={formData.image} onChange={handleChange} />
        <button type="submit" className="self-start px-10 py-2.5 rounded bg-btn-blue text-text-primary text-xl font-semibold cursor-pointer shadow-[0px_5px_0px] shadow-btn-blue-shadow border-none transition-all duration-100 hover:translate-y-1 hover:shadow-[0px_1px_0px] active:translate-y-[5px] active:shadow-none">
          Ajouter
        </button>
      </form>

      {/* Liste des projets existants */}
      <section>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          <span className="green-text">#</span>Projets existants ({projets.length})
        </h2>
        <div className="flex flex-col gap-3">
          {projets.map((p) => (
            <div key={p.id} className="flex items-center justify-between border border-border p-3">
              <div>
                <span className="text-text-primary font-bold">{p.titre}</span>
                <span className="text-text-secondary ml-2 text-sm">({p.categorie})</span>
              </div>
              <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-300 cursor-pointer font-bold">[✖] Supprimer</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
