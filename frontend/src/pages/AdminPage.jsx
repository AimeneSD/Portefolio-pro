import { useState, useEffect } from 'react';
import MachaButton from '../components/MachaButton';


const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '');

export default function AdminPage() {
  const [formData, setFormData] = useState({
    titre: '', description: '', categorie: '', technos: '', lien: '', image: '', pdf: ''
  });
  const [message, setMessage] = useState('');
  const [projets, setProjets] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const loadProjets = () => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjets(data))
      .catch(console.error);
  };

  useEffect(() => { 
    if (isAuthenticated) loadProjets(); 
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h1 className="text-3xl oswald-font font-extrabold text-text-primary">Accès Restreint</h1>
        <div className="flex flex-col gap-4 w-full max-w-sm px-6">
          <input 
            type="password" 
            className="w-full bg-transparent text-lg px-4 py-3 border-b border-fuchsia-300 outline-none" 
            placeholder="Mot de passe admin"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && passwordInput === ADMIN_PASSWORD && setIsAuthenticated(true)}
          />
          <MachaButton 
            label="Se connecter" 
            onClick={() => {
              if (passwordInput === ADMIN_PASSWORD) setIsAuthenticated(true);
              else alert('Mot de passe incorrect');
            }} 
          />
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        dataToSend.append(key, formData[key]);
      });

      const res = await fetch(`${API_URL}/api/admin/projects`, {
        method: 'POST',
        // IMPORTANT: Ne pas mettre de Content-Type avec FormData, le navigateur le gère seul
        body: dataToSend,
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Projet ajouté avec succès !');
        setFormData({ titre: '', description: '', categorie: '', technos: '', lien: '', image: '', pdf: '' });
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

  const inputClass = "w-full bg-transparent text-lg px-4 py-3 border-b border-fuchsia-300 outline-none  ";

  return (
    <main className=" flex flex-col gap-12 self-center mt-[90px] mb-[80px] max-lg:w-[90vw]">
      <section className='w-[70vw] max-w-3xl flex flex-col gap-y-[5vh] self-center'>
      <h1 className="text-4xl oswald-font font-extrabold text-text-primary">
        <span className="macha-text-green">Ajouter un projet </span>
      </h1>

      {message && <p className="text-success font-bold">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input className={inputClass} type="text" name="titre" placeholder="Titre du projet *" required value={formData.titre} onChange={handleChange} />

        <textarea className={`${inputClass} resize-y min-h-[80px]`} name="description" placeholder="Description du projet" value={formData.description} onChange={handleChange} />

        <select name="categorie" className={`${inputClass} cursor-pointer`} required value={formData.categorie} onChange={handleChange}>
          <option value="" disabled>Choisir une catégorie</option>
          <option value="web" className="text-black">Projets Web</option>
          <option value="reseau" className="text-black">Réseau &amp; Support</option>
        </select>

        <div className="flex max-lg:flex-col gap-4 w-full">
          <input className={`${inputClass} flex-1`} type="text" name="lien" placeholder="Lien (URL ou chemin)" value={formData.lien} onChange={handleChange} />
          <span className="self-center text-text-secondary font-bold">OU</span>
          <div className="flex flex-col flex-1">
            <span className="text-text-secondary text-sm ml-4 mb-1">Téléverser un fichier</span>
            <input key={formData.pdf ? formData.pdf.name : 'empty-pdf'} className={inputClass} type="file" name="pdf" onChange={handleChange} />
          </div>
        </div>

        <input className={inputClass} type="text" name="technos" placeholder="Technos (ex: html,php,js)" value={formData.technos} onChange={handleChange} />
        <span className="text-text-secondary text-sm ml-4 mb-1">Image du projet *</span>
        <input key={formData.image ? formData.image.name : 'empty'} className={inputClass} type="file" accept="image/*" name="image" required onChange={handleChange} />
        
        <MachaButton label="Ajouter" type="submit" extraClassName="self-start mt-2" />
      </form>
      </section>

      {/* Liste des projets existants */}
      <section className='w-[70vw] max-w-3xl flex flex-col gap-y-[5vh] self-center'>
        <h2 className="text-4xl oswald-font font-extrabold text-text-primary mb-4">
          <span className="macha-text-green">Projets existants</span> ({projets.length})
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
