import Image from 'next/image';

interface AboutProps {
  description: string;
  experience: string;
  style: string;
  imageUrl: string;
}

export default function About({ description, experience, style, imageUrl }: AboutProps) {
  return (
    <section id="experiencia" className="section-padding">
      <div className="container-lux">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={imageUrl}
                alt="Buffet Santerra"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/20 rounded-sm hidden md:block" />
          </div>

          <div className="space-y-12">
            <div>
              <div className="divider-gold mb-6" />
              <h2 className="section-title mb-6">La Experiencia Santerra</h2>
              <p className="text-text-secondary leading-relaxed text-lg">{description}</p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl text-gold-light mb-3">Filosofía</h3>
                <p className="text-text-secondary leading-relaxed">{experience}</p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-gold-light mb-3">Estilo</h3>
                <p className="text-text-secondary leading-relaxed">{style}</p>
              </div>
            </div>

            <a
              href="https://wa.me/56912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex text-xs"
            >
              Reservar experiencia
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
