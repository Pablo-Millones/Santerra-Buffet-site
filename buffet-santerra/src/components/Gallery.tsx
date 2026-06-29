'use client';

import { useState } from 'react';

interface GalleryProps {
  images: string[];
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-surface-2">
        <div className="text-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <p className="text-text-muted text-xs">No disponible</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <section id="galeria" className="section-padding">
      <div className="container-lux">
        <div className="text-center mb-16">
          <div className="divider-gold mx-auto mb-6" />
          <h2 className="section-title mb-4">Galería</h2>
          <p className="section-subtitle mx-auto">
            Un vistazo a nuestra propuesta gastronómica y el ambiente que define a Santerra.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group overflow-hidden rounded-sm bg-surface-2 ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <div className="w-full h-full min-h-[200px] md:min-h-[280px]">
                <GalleryImage src={image} alt={`Galería Santerra ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
