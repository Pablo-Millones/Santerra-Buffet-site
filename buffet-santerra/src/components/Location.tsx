interface LocationProps {
  address: string;
}

export default function Location({ address }: LocationProps) {
  return (
    <section id="ubicacion" className="section-padding">
      <div className="container-lux">
        <div className="text-center mb-16">
          <div className="divider-gold mx-auto mb-6" />
          <h2 className="section-title mb-4">Ubicación</h2>
          <p className="section-subtitle mx-auto">
            En el corazón de Viña del Mar, con fácil acceso y estacionamiento.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-lux p-10">
            <div className="grid sm:grid-cols-2 gap-10">
              <div>
                <h3 className="font-serif text-lg text-gold-light mb-4">Dirección</h3>
                <p className="text-text-secondary leading-relaxed">{address}</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-gold-light mb-4">Cómo llegar</h3>
                <ul className="space-y-4 text-text-secondary text-sm">
                  <li className="flex gap-3">
                    <span className="text-gold flex-shrink-0">—</span>
                    <span>En auto: Por Avenida Libertad, estacionamiento privado disponible.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold flex-shrink-0">—</span>
                    <span>Transporte público: Múltiples líneas de bus a una cuadra.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
