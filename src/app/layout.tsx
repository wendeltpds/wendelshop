import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Layout from '../components/layout'
import "slick-carousel/slick/slick.css";
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "wendelshop"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className=" font-bodyFont w-full  text-darkText">
        <Layout>
          <Header />
          {children}
          <Footer />
        </Layout>
      </body>
    </html>
  )
}
