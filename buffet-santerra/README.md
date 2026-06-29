# Buffet Santerra Viña del Mar - Landing Page

Una landing page elegante y moderna para el restaurante Buffet Santerra en Viña del Mar, construida con Next.js 14, React, Tailwind CSS y TypeScript.

## Características

- ✅ Diseño responsive y mobile-first
- ✅ Optimizado para SEO local
- ✅ Integración con WhatsApp para reservas
- ✅ Integración con Google Maps para ubicación
- ✅ Animaciones suaves con Framer Motion
- ✅ Carga dinámica de datos desde `data.txt`
- ✅ Componentes reutilizables y bien estructurados
- ✅ Optimizado para rendimiento

## Estructura del Proyecto

```
buffet-santerra/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Layout global con metadata SEO
│   │   └── page.tsx        # Página principal
│   ├── components/         # Componentes reutilizables
│   │   ├── layout/         # Header y Footer
│   │   ├── Hero.tsx        # Sección principal
│   │   ├── About.tsx       # Sobre el restaurante
│   │   ├── Menu.tsx        # Menú y estaciones
│   │   ├── Pricing.tsx     # Precios y paquetes
│   │   ├── Gallery.tsx     # Galería de imágenes
│   │   ├── Videos.tsx      # Videos promocionales
│   │   ├── Location.tsx    # Ubicación y mapa
│   │   └── Contact.tsx     # Información de contacto
│   ├── hooks/              # Hooks personalizados
│   │   └── useRestaurantData.ts  # Hook para cargar datos
│   └── lib/                # Librerías y utilidades
│       └── parser.ts       # Parser para data.txt
├── public/
│   └── assets/             # Imágenes y videos del restaurante
│       ├── img/            # Imágenes del local y platos
│       └── video/          # Videos promocionales
└── package.json            # Dependencias y scripts
```

## Requisitos

- Node.js 18.0 o superior
- npm 9.0 o superior

## Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
cd buffet-santerra
```

2. Instala las dependencias:
```bash
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Producción

Para construir la aplicación para producción:

```bash
npm run build
```

Para iniciar el servidor de producción:

```bash
npm start
```

## Personalización

### Actualizar Contenido

Todo el contenido del sitio se gestiona mediante el archivo `public/assets/data.txt`. Este archivo debe contener un objeto JSON con la siguiente estructura:

```json
{
  "name": "Buffet Santerra Viña del Mar",
  "tagline": "Experiencia gastronómica incomparable",
  "description": "Descripción del restaurante...",
  "experience": "Detalles de la experiencia...",
  "style": "Descripción del estilo...",
  "prices": [
    {
      "type": "Almuerzo (Lunes-Viernes)",
      "price": "$15.990",
      "description": "Qué incluye este servicio..."
    }
  ],
  "menuCategories": [
    {
      "name": "Estación Fría",
      "description": "Descripción de la estación",
      "items": [
        {
          "name": "Nombre del plato",
          "description": "Descripción del plato"
        }
      ]
    }
  ],
  "hours": [
    {
      "day": "Lunes-Jueves",
      "open": "12:30",
      "close": "16:00"
    }
  ],
  "address": "Dirección completa del restaurante",
  "whatsapp": "+56912345678",
  "googleMapsUrl": "https://maps.google.com/?q=Dirección+Codificada"
}
```

Si el archivo `data.txt` está vacío o contiene datos no válidos, el sitio mostrará contenido predeterminado basado en la información típica de un buffet premium.

### Agregar Más Imágenes y Videos

Simplemente agrega más archivos a las carpetas:
- `public/assets/img/` para imágenes
- `public/assets/video/` para videos

El componente de galería cargará automáticamente todas las imágenes de la carpeta de imágenes.

## Tecnologías Utilizadas

- **Next.js 14** - Framework de React con App Router
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utility-first
- **Framer Motion** - Biblioteca de animaciones
- **Next/Image** - Optimización de imágenes

## Optimizaciones de Rendimiento

- Carga diferida de imágenes y videos
- División de código con importaciones dinámicas
- Optimización de imágenes integrada de Next.js
- CSS crítico en línea con Tailwind
- Prefetching inteligente de enlaces

## SEO

- Metaetiquetas optimizadas para buscadores
- Open Graph tags para compartir en redes sociales
- Twitter Cards para tweets enriquecidos
- Estructura semántica de HTML
- URLs canónicas
- Carga rápida optimizada para Core Web Vitals

## Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Para consultas sobre el sitio web o el restaurante:
- WhatsApp: +56912345678
- Email: info@buffetsanterra.cl
- Dirección: Avenida Libertad 1234, Viña del Mar, Valparaíso, Chile