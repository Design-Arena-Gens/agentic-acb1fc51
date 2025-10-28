import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clothing Store - Fashion for Everyone',
  description: 'Shop the latest trends in fashion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
