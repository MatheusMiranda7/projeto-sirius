export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a
          href="/"
          className="text-sm font-medium uppercase tracking-[0.32em] text-white"
        >
          Sirius
        </a>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a
            href="/experience"
            className="transition-colors duration-300 hover:text-white"
          >
            Experiência
          </a>

          <a
            href="#catalog"
            className="transition-colors duration-300 hover:text-white"
          >
            Catálogo
          </a>

          <a
            href="#contact"
            className="transition-colors duration-300 hover:text-white"
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}