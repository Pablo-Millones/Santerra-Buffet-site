'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRestaurantData } from '@/hooks/useRestaurantData';

const Header = dynamic(() => import('@/components/layout/Header'), { loading: () => null });
const Footer = dynamic(() => import('@/components/layout/Footer'), { loading: () => null });
const Hero = dynamic(() => import('@/components/Hero'), { loading: () => <div className="h-screen bg-bg" /> });
const About = dynamic(() => import('@/components/About'), { loading: () => <div className="h-96 bg-bg" /> });
const Pricing = dynamic(() => import('@/components/Pricing'), { loading: () => <div className="h-96 bg-surface" /> });
const Gallery = dynamic(() => import('@/components/Gallery'), { loading: () => <div className="h-96 bg-bg" /> });
const Videos = dynamic(() => import('@/components/Videos'), { loading: () => <div className="h-96 bg-surface" /> });
const Location = dynamic(() => import('@/components/Location'), { loading: () => <div className="h-64 bg-bg" /> });
const Contact = dynamic(() => import('@/components/Contact'), { loading: () => <div className="h-96 bg-surface" /> });

export default function Home() {
  const { data, loading, error } = useRestaurantData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-12 h-12 border border-gold/30 rounded-sm mx-auto mb-4" />
          <p className="text-text-muted text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center max-w-md px-6">
          <p className="text-text-muted mb-6">Error al cargar el contenido</p>
          <button onClick={() => window.location.reload()} className="btn-primary text-xs">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const restaurantData = data || {
    name: 'Buffet Santerra Viña del Mar',
    tagline: 'Experiencia gastronómica incomparable',
    description: 'Disfruta de nuestro buffet libre con la mejor selección de platos internacionales y locales.',
    experience: 'Cada visita es una celebración de sabores. Nuestra selección abarca desde clásicos chilenos hasta preparaciones internacionales.',
    style: 'Elegante y contemporáneo. Espacios amplios, iluminación cálida y sofisticada.',
    prices: [
      { type: 'Almuerzo', price: '$15.990', description: 'Lunes a viernes, buffet libre con bebida' },
      { type: 'Cena', price: '$18.990', description: 'Selección especial de platos calientes y fríos' },
      { type: 'Fin de Semana', price: '$20.990', description: 'Buffet premium con mariscos y cortes selectos' },
    ],
    menuCategories: [
      {
        name: 'Entradas',
        description: 'Selección fresca de ensaladas y ceviches',
        items: [
          { name: 'Ensalada Mediterránea', description: 'Mix de hojas verdes, tomate cherry, aceitunas y queso feta' },
          { name: 'Ceviche Clásico', description: 'Corvina fresca marinada en limón y cilantro' },
        ],
      },
      {
        name: 'Platos de fondo',
        description: 'Preparaciones calientes al momento',
        items: [
          { name: 'Lomo a la Pallarda', description: 'Tierno lomo en salsa de champiñones' },
          { name: 'Salmón Miel Mostaza', description: 'Filete glaseado con miel artesanal' },
        ],
      },
    ],
    hours: [
      { day: 'Lunes a Viernes', open: '12:30', close: '16:00' },
      { day: 'Sábado y Domingo', open: '12:30', close: '16:00' },
      { day: 'Cena (Lun-Dom)', open: '19:30', close: '23:00' },
    ],
    address: 'Avenida Libertad 1234, Viña del Mar, Valparaíso, Chile',
    whatsapp: '+56912345678',
  };

  const sampleImages = [
    '/assets/img/santerra logo.jpg',
    '/assets/img/SaveClip.App_724133790_17886932073571460_3242714873766376402_n.jpg',
    '/assets/img/SaveClip.App_725237275_17886932082571460_7706802138612610907_n.jpg',
    '/assets/img/SaveClip.App_726891718_17887744200571460_2668872576654567644_n.jpg',
    '/assets/img/SaveClip.App_727287290_17887419225571460_3033377415232283990_n.jpg',
    '/assets/img/SaveClip.App_729466950_17888374284571460_4549271228257180644_n.jpg',
    '/assets/img/SaveClip.App_730083595_17888374293571460_6280723181072094460_n.jpg',
    '/assets/img/SaveClip.App_730320893_17888374281571460_9127575300453143801_n.jpg',
    '/assets/img/Ven a descubrir por qué nuestras pastas son una de las estaciones favoritas de Santerra. ❤️🍝.jpg',
  ];

  const instagramUrl = 'https://www.instagram.com/p/DZi-g0PN9UD/?hl=es-la';

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>
        <Suspense fallback={<div className="h-screen bg-bg" />}>
          <Hero
            title={restaurantData.name}
            tagline={restaurantData.tagline}
            backgroundImage="/assets/img/santerra logo.jpg"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-bg" />}>
          <About
            description={restaurantData.description}
            experience={restaurantData.experience}
            style={restaurantData.style}
            imageUrl="/assets/img/santerra logo.jpg"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-surface" />}>
          <Pricing plans={restaurantData.prices} />
        </Suspense>

        <section className="section-padding">
          <div className="container-lux">
            <div className="text-center mb-16">
              <div className="divider-gold mx-auto mb-6" />
              <h2 className="section-title mb-4">Nuestro Buffet</h2>
              <p className="section-subtitle mx-auto">
                Categorías cuidadosamente seleccionadas para una experiencia completa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {restaurantData.menuCategories.map((category, index) => (
                <div key={index} className="card-lux p-10">
                  <span className="text-gold text-[10px] uppercase tracking-[0.2em]">{category.name}</span>
                  <div className="divider-gold my-4" />
                  <p className="text-text-secondary text-sm mb-8">{category.description}</p>
                  <div className="space-y-6">
                    {category.items.map((item, i) => (
                      <div key={i}>
                        <h4 className="font-serif text-lg text-text-primary">{item.name}</h4>
                        <p className="text-text-muted text-sm mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-96 bg-bg" />}>
          <Gallery images={sampleImages} />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-surface" />}>
          <Videos instagramUrl={instagramUrl} />
        </Suspense>

        <Suspense fallback={<div className="h-64 bg-bg" />}>
          <Location address={restaurantData.address} />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-surface" />}>
          <Contact
            address={restaurantData.address}
            whatsapp={restaurantData.whatsapp}
            hours={restaurantData.hours}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
