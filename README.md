# Santerra Buffet - Propuesta de Diseño

> Propuesta de diseño desarrollada con fines demostrativos. No corresponde al sitio oficial.

**Sitio en vivo:** [https://santerra-demo.vercel.app](https://santerra-demo.vercel.app)

## Funcionalidades

- **Chef Virtual de IA** — Genera sugerencias personalizadas de pastas vía NVIDIA NIM API (Llama 3.1)
- **Sistema de Reservas** — Formulario que envía datos por email SMTP y abre WhatsApp con instrucciones de abono del 50%
- **Galería Multimedia** — 8 imágenes con auto-slide cada 5s, navegación 1x1 con dots y flechas, lightbox interactivo
- **Videos** — 4 videos en grilla responsive con reproducción in-page
- **Datos Bancarios** — Cuenta corriente Santander con copiado al portapapeles y toast de confirmación
- **Mapa Interactivo** — Ubicación en Google Maps (Casino Enjoy Viña del Mar)
- **Menú Responsivo** — Hamburger menu animado para móvil con transiciones suaves
- **Scroll Animado** — Navegación suave entre secciones
- **WhatsApp Directo** — Enlaces con mensajes pre-armados para contacto y confirmación

## Tech Stack

- **Frontend:** HTML5, Tailwind CSS (CDN), Font Awesome
- **Backend:** Python (API serverless en Vercel)
- **IA:** NVIDIA NIM API (Llama 3.1 8B)
- **Email:** SMTP Gmail con contraseña de aplicación
- **Deploy:** Vercel (static + serverless functions)

## APIs

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/reservas` | POST | Envía datos de reserva por email y genera link de WhatsApp |
| `/api/reservas` | GET | Health check |
| `/api/pasta` | POST | Genera sugerencia de pasta con IA |

## Ejecutar local

```bash
pip install -r requirements.txt
python server.py
```

Abrir http://localhost:8080

## Aviso

Este proyecto es una propuesta de diseño con fines demostrativos y de portafolio. No está afiliado ni es representativo del sitio oficial de Santerra Buffet.
