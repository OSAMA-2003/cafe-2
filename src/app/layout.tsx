import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic, Amiri } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-sans',
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const amiri = Amiri({
  variable: '--font-serif',
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: "VO CAFE",
  description: 'تجربة استثنائية في عالم القهوة المختصة، حيث نعتني بأدق التفاصيل لنقدم لك كوباً يعكس شغفنا بالكمال في أجواء تمنحك السكينة المطلقة.',
  icons: {
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIpiT8iG8DsMvTlHg0LNhn3cZ8JzA5LUmDbhgXlZgZNIJ4Dybo1HhG_Uh8jqjdi7dRh_qdRF5l8FKqxEA5s3R4faX2awFu2nRaqJMz48z9cdanpzBVZaWDWNnIwrgi8V7HxbLnpKzGaguNLrBvGafs-tDuQRIbHBG4yhrX3iE8d43u7vOSxQvFFBxMoab_t5MjIHIoPl4ZiXq0GBo-VeoZY7oXi5hxdwKEbrGMWsS9hzzbmYHwISEYW8pfw6Cv7MOAe_A',
    shortcut: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIpiT8iG8DsMvTlHg0LNhn3cZ8JzA5LUmDbhgXlZgZNIJ4Dybo1HhG_Uh8jqjdi7dRh_qdRF5l8FKqxEA5s3R4faX2awFu2nRaqJMz48z9cdanpzBVZaWDWNnIwrgi8V7HxbLnpKzGaguNLrBvGafs-tDuQRIbHBG4yhrX3iE8d43u7vOSxQvFFBxMoab_t5MjIHIoPl4ZiXq0GBo-VeoZY7oXi5hxdwKEbrGMWsS9hzzbmYHwISEYW8pfw6Cv7MOAe_A',
    apple: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIpiT8iG8DsMvTlHg0LNhn3cZ8JzA5LUmDbhgXlZgZNIJ4Dybo1HhG_Uh8jqjdi7dRh_qdRF5l8FKqxEA5s3R4faX2awFu2nRaqJMz48z9cdanpzBVZaWDWNnIwrgi8V7HxbLnpKzGaguNLrBvGafs-tDuQRIbHBG4yhrX3iE8d43u7vOSxQvFFBxMoab_t5MjIHIoPl4ZiXq0GBo-VeoZY7oXi5hxdwKEbrGMWsS9hzzbmYHwISEYW8pfw6Cv7MOAe_A',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth">
      <body
        className={`${ibmPlexSansArabic.variable} ${amiri.variable} font-sans bg-[#211a21] text-[#f5f2f5] antialiased selection:bg-white selection:text-black`}
      >
        {children}
        <Toaster theme="dark" position="bottom-left" richColors />
      </body>
    </html>
  )
}
