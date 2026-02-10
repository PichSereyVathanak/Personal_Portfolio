import React from "react"
import type { Metadata, Viewport } from 'next'
import { Noto_Sans, Noto_Sans_Khmer } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from './LanguageProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import './globals.css'

const notoSans = Noto_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans'
})

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ['khmer'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-khmer'
})

export const metadata: Metadata = {
  title: 'Pichsereyvathanak | Portfolio',
  description: 'Showcase of data science projects, expertise, and leadership experience',
  keywords: ['Data Science', 'Machine Learning', 'Portfolio'],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)', color: '#10b981' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${notoSans.className} ${notoSansKhmer.className}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <Navbar />
            <main className="pt-16 min-h-screen">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
