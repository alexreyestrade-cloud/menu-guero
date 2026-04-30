import type { Metadata } from 'next'
import { Playfair_Display, Oswald } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

const BASE_URL = 'https://menu-guero.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Taquería El Güero — Menú Digital',
  description: 'Tacos, tortas, quesadillas y aguas frescas. Palenque, Chiapas · Lun–Dom 6:00 PM – 12:00 AM · Servicio a domicilio con costo extra.',
  keywords: ['taquería', 'tacos', 'Palenque', 'Chiapas', 'El Güero', 'menú', 'tortas', 'quesadillas'],
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Taquería El Güero',
    title: 'Taquería El Güero — El Arte del Sabor',
    description: 'Tacos, tortas, quesadillas y aguas frescas en Palenque, Chiapas. Abierto Lun–Dom 6 PM – 12 AM.',
    images: [
      {
        url: '/cartel.jpeg',
        width: 1200,
        height: 600,
        alt: 'Taquería El Güero — El Arte del Sabor',
      },
    ],
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taquería El Güero — El Arte del Sabor',
    description: 'Tacos, tortas, quesadillas y aguas frescas en Palenque, Chiapas.',
    images: ['/cartel.jpeg'],
  },
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  )
}
