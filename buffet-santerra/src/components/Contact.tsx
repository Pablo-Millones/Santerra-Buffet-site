interface ContactProps {
  address: string;
  whatsapp: string;
  hours: Array<{ day: string; open: string; close: string }>;
}

export default function Contact({ address, whatsapp, hours }: ContactProps) {
  return (
    <section id="contacto" className="section-padding bg-surface">
      <div className="container-lux">
        <div className="text-center mb-16">
          <div className="divider-gold mx-auto mb-6" />
          <h2 className="section-title mb-4">Reservas</h2>
          <p className="section-subtitle mx-auto">
            Déjanos ser parte de tu próxima celebración. Te esperamos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-lux p-10">
              <h3 className="font-serif text-xl text-gold-light mb-8">Contacto</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Teléfono</p>
                  <a href="tel:+56912345678" className="text-text-primary hover:text-gold-light transition-colors">
                    +56 9 1234 5678
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Email</p>
                  <a href="mailto:info@buffetsanterra.cl" className="text-text-primary hover:text-gold-light transition-colors">
                    info@buffetsanterra.cl
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Dirección</p>
                  <p className="text-text-primary">{address}</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">WhatsApp</p>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-gold-light transition-colors"
                  >
                    {whatsapp}
                  </a>
                </div>
              </div>
            </div>

            <div className="card-lux p-10">
              <h3 className="font-serif text-xl text-gold-light mb-8">Horarios</h3>
              <div className="space-y-4">
                {hours.map((hour, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-border last:border-0 last:pb-0">
                    <span className="text-text-secondary text-sm">{hour.day}</span>
                    <span className="text-text-primary font-medium">
                      {hour.open} — {hour.close}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs"
            >
              Reservar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
