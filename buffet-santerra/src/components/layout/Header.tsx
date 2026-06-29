import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container-lux">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-2xl text-text-primary tracking-tight">Santerra</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link href="#buffet" className="text-sm text-text-secondary hover:text-gold-light transition-colors duration-300 tracking-wide">
              Buffet
            </Link>
            <Link href="#experiencia" className="text-sm text-text-secondary hover:text-gold-light transition-colors duration-300 tracking-wide">
              Experiencia
            </Link>
            <Link href="#galeria" className="text-sm text-text-secondary hover:text-gold-light transition-colors duration-300 tracking-wide">
              Galería
            </Link>
            <Link href="#contacto" className="text-sm text-text-secondary hover:text-gold-light transition-colors duration-300 tracking-wide">
              Reservas
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/56912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden md:inline-flex text-[11px]"
            >
              Reservar
            </a>

            <button className="md:hidden p-2 text-text-secondary" aria-label="Menú">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
