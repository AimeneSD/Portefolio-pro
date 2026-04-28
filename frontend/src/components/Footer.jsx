import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto bg-bg-secondary w-full py-8 max-md:py-3 flex flex-col items-center text-center z-9 gap-2" id="footer">
      <h2 className="text-text-primary font-bold text-lg">SAOUD Aïmène</h2>
      <a
        href="mailto:aimenesaoud@gmail.com"
        className="text-text-secondary grotesk-font hover:text-accent transition-colors duration-300"
      >
        aimenesaoud@gmail.com
      </a>
      <div className="flex gap-4 items-center">
        <p className="text-text-secondary text-sm">© 2026 SAOUD Aïmène. Tous droits réservés.</p>
        <span className="text-text-secondary">•</span>
        <Link to="/mentions-legales" className="text-text-secondary text-sm hover:text-accent underline transition-colors duration-300">
          Mentions Légales
        </Link>
      </div>
    </footer>
  );
}
