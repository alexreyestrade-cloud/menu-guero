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

export const metadata: Metadata = {
  title: 'Taquería El Güero · Menú',
  description: 'Menú digital de Taquería El Güero — El Arte del Sabor. Tacos, tortas, quesadillas y aguas. Horario: 7:00 PM – 11:00 PM.',
  openGraph: {
    title: 'Taquería El Güero',
    description: 'El Arte del Sabor',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  )
}
