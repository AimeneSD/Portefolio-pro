import { useState, useEffect } from 'react'; // 1. On ajoute useEffect
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'accueil', id: 'home' },
  { path: '/projets', label: 'projets', id: 'projects' },
  { path: '/veille', label: 'veille', id: 'veille' },
  { path: '/stage', label: 'stage', id: 'stage' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // 2. État pour le scroll
  const location = useLocation();

  // 3. Logique pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      // Si on descend de plus de 20 pixels, on active l'état "scrolled"
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 w-full z-1000 flex items-center transition-all duration-500 ease-in-out border-b
        ${scrolled 
          ? 'bg-[#05110E]/80 backdrop-blur-md h-[60px] border-green-500/20' 
          : 'bg-transparent h-[90px] border-transparent'}
      `}
    >
      <nav className="relative flex justify-center items-center w-full lg:gap-x-[10vw] lg:px-[225px] z-1001">
        {/* ─── Logo + Titre ───────────────── */}
        <Link to="/" className="flex items-center gap-2.5 ml-[2vw]" id="header-logo">
          <img
            className={`w-10 h-auto object-contain invert transition-transform duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}
            src={`${import.meta.env.BASE_URL}images/portfolio_icon.webp`}
            alt="Logo portfolio"
          />
          <h1 className={`text-text-primary font-bold transition-all duration-500 ${scrolled ? 'text-base' : 'text-lg'}`}>
            Aïmène
          </h1>
        </Link>

        {/* ─── Hamburger (mobile) ─────────── */}
        <button
          className="flex lg:hidden flex-col gap-[5px] mr-[4vw] ml-auto cursor-pointer z-1200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu de navigation"
        >
          <span className={`w-[30px] h-[3.5px] bg-green-500 transition-all duration-300 ${menuOpen ? 'translate-y-[8.5px] rotate-45' : ''}`} />
          <span className={`w-[30px] h-[3.5px] bg-green-500 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-[30px] h-[3.5px] bg-green-500 transition-all duration-300 ${menuOpen ? 'translate-y-[8.5px] -rotate-45' : ''}`} />
        </button>

        {/* ─── Navigation links ──────────── */}
        <ul
          className={`
            lg:flex lg:ml-auto lg:flex-row lg:gap-[30px] lg:static lg:h-auto lg:w-auto lg:bg-transparent
            fixed max-lg:gap-y-15 max-lg:text-2xl top-0 right-0 h-screen w-full bg-[#05110E]
            flex flex-col items-center justify-center gap-8
            transition-transform duration-400 ease-in-out z-1050
            ${menuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            list-none text-lg font-semibold
          `}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={`flex items-center transition-all duration-300 hover:scale-110 ${
                    isActive ? 'macha-text-green' : 'text-gray-400 hover:text-green-500'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-green-500 mr-1">/</span>
                  <span className="grotesk-font">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}