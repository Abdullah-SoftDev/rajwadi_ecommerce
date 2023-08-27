import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import Footer from '@/components/Footer'
import TopLoaderBar from '@/components/TopLoaderBar'
import Searchbar from '@/components/Searchbar'

const manRope = Manrope({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Navkar Selection',
  description: 'An ecommerce service for you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={manRope.className}>
        <TopLoaderBar />
        <Navbar />
        <Searchbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
