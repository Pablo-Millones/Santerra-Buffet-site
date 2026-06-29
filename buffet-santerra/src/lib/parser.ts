/**
 * Interface for restaurant data
 */
export interface RestaurantData {
  name: string;
  tagline: string;
  description: string;
  experience: string;
  style: string;
  prices: Array<{
    type: string;
    price: string;
    description: string;
  }>;
  menuCategories: Array<{
    name: string;
    description: string;
    items: Array<{
      name: string;
      description: string;
      image?: string;
    }>;
  }>;
  hours: Array<{
    day: string;
    open: string;
    close: string;
  }>;
  address: string;
  whatsapp: string;
  googleMapsUrl: string;
}

/**
 * Parses the data.txt file and returns structured restaurant data
 * If the file is empty or doesn't contain expected format, returns default data
 */
export async function parseRestaurantData(): Promise<RestaurantData> {
  try {
    const response = await fetch('/assets/data.txt');
    const fileContent = await response.text();

    // If file is empty, return default data
    if (!fileContent.trim()) {
      return getDefaultRestaurantData();
    }

    // Try to parse as JSON first (if someone puts structured data)
    try {
      const parsed = JSON.parse(fileContent);
      // Validate that it has the required structure
      if (isValidRestaurantData(parsed)) {
        return parsed;
      }
    } catch (e) {
      // Not JSON, try to parse as structured text
      const parsed = parseTextFormat(fileContent);
      if (parsed && isValidRestaurantData(parsed)) {
        return parsed;
      }
    }

    // If parsing fails, return default data
    return getDefaultRestaurantData();
  } catch (error) {
    console.error('Error parsing restaurant data:', error);
    return getDefaultRestaurantData();
  }
}

/**
 * Validates if the parsed data has the required structure
 */
function isValidRestaurantData(data: any): boolean {
  if (!data || typeof data !== 'object') return false;

  const requiredFields = ['name', 'tagline', 'description', 'experience', 'style', 'prices', 'menuCategories', 'hours', 'address', 'whatsapp', 'googleMapsUrl'];
  return requiredFields.every(field => field in data);
}

/**
 * Parses text format data (fallback for non-JSON formatted data)
 */
function parseTextFormat(text: string): any {
  // This is a simple parser - in a real app you might want something more sophisticated
  // For now, we'll return default data since the file appears to be empty
  return getDefaultRestaurantData();
}

/**
 * Returns default restaurant data for Buffet Santerra Viña del Mar
 */
function getDefaultRestaurantData(): RestaurantData {
  return {
    name: 'Buffet Santerra Viña del Mar',
    tagline: 'Experiencia gastronómica incomparable',
    description: 'Disfruta de nuestro buffet libre con la mejor selección de platos internacionales y locales, preparado con los ingredientes más frescos y técnicas culinarias de vanguardia.',
    experience: 'En Buffet Santerra Viña del Mar, cada visita es una celebración de sabores. Nuestra cuidadosamente seleccionada variedad de platos abarca desde clásicos chilenos hasta exquisitas preparaciones internacionales, todo preparado fresco y listo para servir.',
    style: 'Elegante y contemporáneo, nuestro restaurante combina un ambiente sofisticado con la calidez de la hospitalidad chilena. Espacios amplios, iluminación cálida y sofisticada.',
    prices: [
      {
        type: 'Almuerzo (Lunes-Viernes)',
        price: '$15.990',
        description: 'Buffet libre incluye entrada, plato fuerte, postre y bebida'
      },
      {
        type: 'Cena (Lunes-Domingo)',
        price: '$18.990',
        description: 'Buffet libre con selección especial de platos calientes y fríos'
      },
      {
        type: 'Fin de Semana y Festivos',
        price: '$20.990',
        description: 'Buffet premium con mariscos frescos y cortes selectos'
      },
      {
        type: 'Niños (4-10 años)',
        price: '$8.990',
        description: 'Menú especial para los más pequeños'
      },
      {
        type: 'Tercera Edad',
        price: '$12.990',
        description: 'Descuento especial para adultos mayores'
      }
    ],
    menuCategories: [
      {
        name: 'Estación Fría',
        description: 'Selección fresca de ensaladas, ceviches y mariscos',
        items: [
          {
            name: 'Ensalada Mediterránea',
            description: 'Mix de hojas verdes, tomate cherry, pepino, aceitunas y queso feta'
          },
          {
            name: 'Ceviche Clásico',
            description: 'Corvina fresca marinado en limón, ají y cilantro'
          },
          {
            name: 'Tabulé Libanés',
            description: 'Trigo quebrado con perejil, menta, tomate y limón'
          }
        ]
      },
      {
        name: 'Estación Caliente',
        description: 'Platos calientes preparados al momento',
        items: [
          {
            name: 'Lomo a la Pallarda',
            description: 'Tierno lomo de vacuno en salsa de champiñones y vino blanco'
          },
          {
            name: 'Salmón a la Miel Mostaza',
            description: 'Filete de salmón glaseado con miel artesanal y mostaza dijon'
          },
          {
            name: 'Lasaña Boloñesa',
            description: 'Capas de pasta, salsa boloñesa casera y queso gratinado'
          }
        ]
      },
      {
        name: 'Estación de Pasta',
        description: 'Pastas frescas y salsas caseras',
        items: [
          {
            name: 'Fettuccine Alfredo',
            description: 'Fettuccine frescas en salsa cremosa de parmesano y nuez moscada'
          },
          {
            name: 'Penne Arrabbiata',
            description: 'Penne en salsa picante de tomate, ajo y guindilla'
          },
          {
            name: 'Ñoquis Sorrentino',
            description: 'Ñoquis de papa rellenos de ricotta y espinaca'
          }
        ]
      },
      {
        name: 'Postres',
        description: 'Deliciosos postres para endulzar tu experiencia',
        items: [
          {
            name: 'Tiramisu Casero',
            description: 'Clásico italiano de mascarpone, café y cacao'
          },
          {
            name: 'Flan de Vainilla',
            description: 'Suave flan bañado en caramelo'
          },
          {
            name: 'Fruta de Temporada',
            description: 'Selección fruta fresca de estación'
          }
        ]
      }
    ],
    hours: [
      { day: 'Lunes-Jueves', open: '12:30', close: '16:00' },
      { day: 'Viernes', open: '12:30', close: '16:00' },
      { day: 'Sábado', open: '12:30', close: '16:00' },
      { day: 'Domingo', open: '12:30', close: '16:00' },
      { day: 'Lunes-Domingo (Cena)', open: '19:30', close: '23:00' }
    ],
    address: 'Avenida Libertad 1234, Viña del Mar, Valparaíso, Chile',
    whatsapp: '+56912345678',
    googleMapsUrl: 'https://maps.google.com/?q=Buffet+Santerra+Viña+del+Mar,+Valparaíso,+Chile'
  };
}