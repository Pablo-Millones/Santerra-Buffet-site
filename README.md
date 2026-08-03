# Santerra Buffet — experiencia web para restaurante

Propuesta de diseño y desarrollo creada como proyecto de portafolio. Combina una experiencia visual responsiva con reservas, contacto por WhatsApp y un asistente gastronómico basado en IA.

> Este proyecto es demostrativo y no corresponde al sitio oficial de Santerra Buffet.

**Demo:** [santerra-demo.vercel.app](https://santerra-demo.vercel.app)

## Funcionalidades

- Formulario de reservas con notificación por correo y continuación por WhatsApp.
- Asistente de pastas con IA mediante NVIDIA NIM.
- Galería multimedia, videos, lightbox y navegación adaptable a móviles.
- Información de contacto, ubicación en Google Maps y datos útiles para el cliente.
- APIs serverless preparadas para despliegue en Vercel.
- Rediseño modular con Next.js, React, TypeScript, Tailwind CSS y Framer Motion.

## Arquitectura

El repositorio conserva dos implementaciones:

- **Prototipo desplegado:** `index.html`, `assets/` y funciones Python en `api/`.
- **Rediseño Next.js:** aplicación modular dentro de `buffet-santerra/`, con componentes reutilizables y datos desacoplados de la interfaz.

## Tecnologías

- Frontend: HTML5, TypeScript, React, Next.js, Tailwind CSS y Framer Motion.
- Backend: funciones serverless en Python y una implementación alternativa en JavaScript.
- Integraciones: NVIDIA NIM, SMTP, WhatsApp y Google Maps.
- Despliegue: Vercel.

## Ejecutar el rediseño Next.js

```powershell
cd buffet-santerra
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` y configura las credenciales únicamente en tu entorno local o en Vercel:

```text
NVIDIA_API_KEY=
EMAIL_USER=
EMAIL_PASS=
```

Nunca publiques claves, contraseñas de aplicación ni datos reales de reservas.

## Endpoints del prototipo

| Endpoint | Método | Propósito |
| --- | --- | --- |
| `/api/pasta` | POST | Generar una sugerencia personalizada mediante IA. |
| `/api/reservas` | POST | Procesar la solicitud y enviar una notificación por correo. |
| `/api/reservas` | GET | Comprobar el estado de la función. |

## Enfoque del proyecto

El objetivo fue resolver un caso de negocio completo: atraer clientes, presentar la oferta, responder consultas y facilitar una reserva desde una sola experiencia web.
