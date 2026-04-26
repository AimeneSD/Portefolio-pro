import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'accueil', id: 'home' },
  { path: '/projets', label: 'projets', id: 'projects' },
  { path: '/contact', label: 'contact', id: 'contact' },
  { path: '/veille', label: 'veille', id: 'veille' },
  { path: '/stage', label: 'stage', id: 'stage' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full h-[70px]  z-1000 flex items-center">
      <nav className="relative flex justify-center items-center  w-full lg:gap-x-[10vw]  lg:px-[225px] z-1001">
        {/* ─── Logo + Titre ───────────────── */}
        <Link to="/" className="flex items-center gap-2.5 ml-[2vw]" id="header-logo">
          <img
            className="w-10 h-auto object-contain invert"
            src="/images/portfolio_icon.webp"
            alt="Logo portfolio"
          />
          <h1 className="text-lg text-text-primary font-bold ">Aïmène</h1>
        </Link>

        {/* ─── Hamburger (mobile) ─────────── */}
        <button
          className="flex lg:hidden flex-col gap-[5px] mr-[4vw]  ml-auto cursor-pointer z-1200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu de navigation"
          id="hamburger"
        >
          <span className={`w-[30px] h-[3.5px] bg-accent transition-transform duration-300 ${menuOpen ? 'translate-y-[8.5px] rotate-45' : ''}`} />
          <span className={`w-[30px] h-[3.5px] bg-accent transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-[30px] h-[3.5px] bg-accent transition-transform duration-300 ${menuOpen ? '-translate-y-[8.5px] -rotate-45' : ''}`} />
        </button>

        {/* ─── Navigation links ──────────── */}
        <ul
          className={`
            lg:flex lg:ml-auto lg:flex-row lg:gap-[30px] lg:static lg:h-auto lg:w-auto lg:bg-transparent
            fixed max-lg:gap-y-15 max-lg:text-2xl   top-0 right-0 h-screen w-full bg-bg-primary
            flex flex-col items-center justify-center gap-8
            transition-transform duration-400 ease-in-out z-[1050]
            ${menuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            list-none text-lg font-semibold
          `}
          id="nav-links"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={`flex items-center transition-transform duration-300 hover:scale-110 ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setMenuOpen(false)}
                  id={`nav-${link.id}`}
                >
                  <span className="green-text">#</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
