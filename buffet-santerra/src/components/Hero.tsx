import Image from 'next/image';

interface HeroProps {
  title: string;
  tagline: string;
  backgroundImage: string;
}

export default function Hero({ title, tagline, backgroundImage }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/50 to-[#0a0a0f]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/40 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="divider-gold mx-auto mb-8" />
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-text-primary mb-6 leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
          {tagline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            Reservar mesa
          </a>
          <a
            href="#buffet"
            className="btn-outline text-xs"
          >
            Descubrir buffet
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
