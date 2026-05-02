import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Radio Satelital',
  description: 'Escucha emisoras de radio en vivo.',
  manifest: '/manifest.json'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#05070a" />
      </head>
      <body>
        <div className="ambient-bg" aria-hidden />
        {children}
      </body>
    </html>
  )
}
