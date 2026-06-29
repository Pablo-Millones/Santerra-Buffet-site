import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-lux py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-serif text-2xl text-text-primary">Santerra</span>
            <p className="text-text-muted text-sm mt-4 leading-relaxed max-w-xs">
              Buffet libre premium en Viña del Mar. Donde cada visita es una experiencia gastronómica inolvidable.
            </p>
          </div>

          <div>
            <h4 className="text-text-muted text-xs uppercase tracking-widest mb-6">Enlaces</h4>
            <nav className="flex flex-col gap-3">
              <Link href="#buffet" className="text-text-secondary hover:text-gold-light text-sm transition-colors">Buffet</Link>
              <Link href="#experiencia" className="text-text-secondary hover:text-gold-light text-sm transition-colors">Experiencia</Link>
              <Link href="#galeria" className="text-text-secondary hover:text-gold-light text-sm transition-colors">Galería</Link>
              <Link href="#contacto" className="text-text-secondary hover:text-gold-light text-sm transition-colors">Reservas</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-text-muted text-xs uppercase tracking-widest mb-6">Contacto</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:+56912345678" className="text-text-secondary hover:text-gold-light transition-colors">+56 9 1234 5678</a>
              <a href="mailto:info@buffetsanterra.cl" className="text-text-secondary hover:text-gold-light transition-colors">info@buffetsanterra.cl</a>
              <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="text-gold-light hover:text-gold transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="divider-gold mx-auto mt-12 mb-6" />
        <p className="text-text-muted text-xs text-center">
          &copy; {new Date().getFullYear()} Buffet Santerra Viña del Mar. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
