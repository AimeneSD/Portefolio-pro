export default function Footer() {
  return (
    <footer className="mt-auto bg-bg-secondary w-full py-8 flex flex-col items-center text-center gap-2" id="footer">
      <h2 className="text-text-primary font-bold text-lg">SAOUD Aïmène</h2>
      <a
        href="mailto:aimenesaoud@gmail.com"
        className="text-text-secondary hover:text-accent transition-colors duration-300"
      >
        aimenesaoud@gmail.com
      </a>
      <p className="text-text-secondary text-sm">© 2025 SAOUD Aïmène. Tous droits réservés.</p>
    </footer>
  );
}
