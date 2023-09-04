import { ToasterProvider } from '@/providers/toast-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ModalProvider } from '@/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CPB DATAWAREHOURSE',
  description: 'CPBank Data warehouse',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider/>
        <ToasterProvider/>
        {children}
        </body>
    </html>
  )
}
