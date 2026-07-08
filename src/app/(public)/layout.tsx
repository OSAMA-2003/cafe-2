import React from 'react'
import Link from 'next/link'
import { Coffee } from 'lucide-react'
import { getCafeInfo } from '@/actions/cafe'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cafeInfo = await getCafeInfo()
  const cafeName = cafeInfo?.name || 'VO'
  const logoUrl = cafeInfo?.logo_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIpiT8iG8DsMvTlHg0LNhn3cZ8JzA5LUmDbhgXlZgZNIJ4Dybo1HhG_Uh8jqjdi7dRh_qdRF5l8FKqxEA5s3R4faX2awFu2nRaqJMz48z9cdanpzBVZaWDWNnIwrgi8V7HxbLnpKzGaguNLrBvGafs-tDuQRIbHBG4yhrX3iE8d43u7vOSxQvFFBxMoab_t5MjIHIoPl4ZiXq0GBo-VeoZY7oXi5hxdwKEbrGMWsS9hzzbmYHwISEYW8pfw6Cv7MOAe_A'

  return (
    <div className="flex min-h-screen flex-col bg-[#211a21] text-[#f5f2f5] selection:bg-white selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#5a4d5a]/20 bg-[#211a21]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group transition-transform duration-500 hover:scale-105 active:scale-95">
            <img
              src={logoUrl}
              alt={cafeName}
              className="h-34 w-auto object-contain   group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest uppercase">
            <Link href="/" className="text-white border-b border-white pb-1 transition-all duration-300">
              الرئيسية
            </Link>

          </nav>

          {/* Trailing Action */}
          <div>
            <Link
              href="/menu"
              className="px-6 py-2.5 bg-white rounded-lg text-black border border-white hover:bg-transparent hover:text-white transition-all duration-500 text-xs font-bold flex items-center gap-1.5"
            >
              <Coffee className="h-3.5 w-3.5" />
              المنيو
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#5a4d5a]/20 bg-[#1a151a] text-[#d8ced8] font-sans py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-12 md:gap-0">
            <ul className="flex flex-wrap items-center justify-center gap-10 font-semibold tracking-widest uppercase text-xs">
              <li><Link className="hover:text-white transition-colors" href="#">Privacy</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Terms</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Connect</Link></li>
            </ul>

            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="opacity-40 font-light tracking-widest text-xs uppercase">
                © {new Date().getFullYear()} {cafeName} CAFE. ALL RIGHTS RESERVED.
              </p>
            </div>

            {/* Brand Logo in Footer */}
            <div className="font-serif text-3xl md:text-4xl text-white opacity-10 tracking-[0.3em] uppercase select-none">
              {cafeName} CAFE
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
