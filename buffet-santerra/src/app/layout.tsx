import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Buffet Santerra Viña del Mar | Buffet Libre Premium',
  description: 'Disfruta del mejor buffet libre en Viña del Mar. Amplia variedad de platos internacionales, estaciones en vivo y ambiente elegante.',
  openGraph: {
    title: 'Buffet Santerra Viña del Mar | Buffet Libre Premium',
    description: 'Disfruta del mejor buffet libre en Viña del Mar. Amplia variedad de platos internacionales, estaciones en vivo y ambiente elegante.',
    url: 'https://buffetsanterra.cl',
    siteName: 'Buffet Santerra Viña del Mar',
    images: [{ url: '/assets/img/santerra logo.jpg', width: 1200, height: 630, alt: 'Buffet Santerra' }],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buffet Santerra Viña del Mar | Buffet Libre Premium',
    description: 'Disfruta del mejor buffet libre en Viña del Mar.',
    images: ['/assets/img/santerra logo.jpg'],
  },
  manifest: '/site.webmanifest',
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
