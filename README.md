# Santerra Buffet - Sitio Web

Buffet gourmet en Casino Enjoy Viña del Mar. Sitio web con reservas, Chef Virtual de pastas con IA y galería multimedia.

## Funcionalidades

- **Chef Virtual de IA** - Genera sugerencias personalizadas de pastas usando NVIDIA Llama 3.1
- **Sistema de Reservas** - Formulario con confirmación por WhatsApp y email
- **Galería Multimedia** - Fotos y videos de Instagram con lightbox
- **Menú Responsivo** - Hamburger menu animado para móvil
- **Mapa Interactivo** - Ubicación en Google Maps con coordenadas exactas
- **Smooth Scroll** - Navegación suave entre secciones

## Tech Stack

- **Frontend:** HTML5, Tailwind CSS (CDN)
- **Backend:** Python (http.server)
- **IA:** NVIDIA NIM API (Llama 3.1 8B)
- **Email:** SMTP (Gmail)
- **WhatsApp:** API directa con mensajes pre-armados

## Archivos

```
santerra_buffet.html    # Sitio principal
server.py               # Backend (reservas + proxy IA + email)
gas_nvidia_proxy.js     # Proxy Google Apps Script (alternativo)
assets/                 # Fotos y videos
  galeria/              # Imágenes de la galería
reservas.json           # Base de datos de reservas
```

## Ejecutar

```bash
python server.py
```

Abrir http://localhost:8080

## Configuración Email

En `server.py`, completa:

```python
EMAIL_USER = 'tu@gmail.com'
EMAIL_PASS = 'xxxx xxxx xxxx xxxx'  # App password de Google
```

Para obtener la App password:
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. Seguridad > Verificación en 2 pasos
3. Contraseñas de aplicaciones > Generar una

## Contacto

- **WhatsApp:** +56 9 3562 1667
- **Instagram:** [@santerra_buffet](https://www.instagram.com/santerra_buffet/)
- **Ubicación:** Avenida San Martín 199, Casino Enjoy, Viña del Mar

## Licencia

© 2026 Santerra Buffet. Todos los derechos reservados.
