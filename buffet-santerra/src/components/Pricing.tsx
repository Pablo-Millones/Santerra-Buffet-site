interface PricePlan {
  type: string;
  price: string;
  description: string;
  featured?: boolean;
}

interface PricingProps {
  plans: PricePlan[];
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function Pricing({ plans }: PricingProps) {
  return (
    <section id="buffet" className="section-padding bg-surface">
      <div className="container-lux">
        <div className="text-center mb-16">
          <div className="divider-gold mx-auto mb-6" />
          <h2 className="section-title mb-4">Precios y Servicios</h2>
          <p className="section-subtitle mx-auto">
            Opciones de buffet libre diseñadas para cada ocasión, con la máxima calidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card-lux p-8 flex flex-col ${plan.featured ? 'border-gold/30 bg-surface-2' : ''}`}
            >
              {plan.featured && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold mb-4">Más popular</span>
              )}
              <h3 className="font-serif text-xl text-text-primary mb-2">{plan.type}</h3>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-serif text-4xl text-gold-light">{plan.price}</span>
                <span className="text-text-muted text-xs">/ persona</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex gap-3 text-sm text-text-secondary">
                  <CheckIcon />
                  <span>Estaciones en vivo</span>
                </li>
                <li className="flex gap-3 text-sm text-text-secondary">
                  <CheckIcon />
                  <span>Postres artesanales</span>
                </li>
                <li className="flex gap-3 text-sm text-text-secondary">
                  <CheckIcon />
                  <span>Atención personalizada</span>
                </li>
              </ul>

              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center text-xs"
              >
                Reservar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
