import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '');

export default function ProjectsPage() {
  const [projetsWeb, setProjetsWeb] = useState([]);
  const [projetsReseau, setProjetsReseau] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/projects?category=web`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjetsWeb(data);
        else setProjetsWeb([]);
      })
      .catch((err) => {
        console.error('Erreur projets web:', err);
        setProjetsWeb([]);
      });

    fetch(`${API_URL}/api/projects?category=reseau`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjetsReseau(data);
        else setProjetsReseau([]);
      })
      .catch((err) => {
        console.error('Erreur projets réseau:', err);
        setProjetsReseau([]);
      });
  }, []);

  return (
    <main className="flex flex-col items-center mt-[90px] mb-[80px] gap-[100px]">
      {/* ─── Projets Web ───────────────────────────── */}
      <section className="relative flex flex-col items-center gap-10 w-[70vw] max-lg:w-[90vw]" id="projets-web">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl font-semibold text-text-primary">
            <span className="green-text">/</span>projets web
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center">
          {Array.isArray(projetsWeb) && projetsWeb.map((p) => (
            <ProjectCard key={p.id} projet={p} />
          ))}
        </div>
      </section>

      {/* ─── Projets Réseau & Support ──────────────── */}
      <section className="relative flex flex-col items-center gap-10 w-[70vw] max-lg:w-[90vw]" id="projets-reseau">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl font-semibold text-text-primary">
            <span className="green-text">/</span>projets réseau &amp; support
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center">
          {Array.isArray(projetsReseau) && projetsReseau.map((p) => (
            <ProjectCard key={p.id} projet={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
