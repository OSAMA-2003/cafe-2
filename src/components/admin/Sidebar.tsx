'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Coffee, FolderTree, LogOut, ExternalLink, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/actions/auth'

export function Sidebar({ email }: { email?: string }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
    { href: '/admin/categories', label: 'الأقسام', icon: FolderTree },
    { href: '/admin/products', label: 'المنتجات', icon: Coffee },
  ]

  return (
    <>
      {/* Mobile Header Banner */}
      <header className="flex h-16 w-full items-center justify-between border-b border-[#775a19]/10 bg-[#031636] px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffdea5]/10 border border-[#ffdea5]/25 text-[#ffdea5] font-bold">
            س
          </div>
          <span className="font-serif font-semibold tracking-wide text-white">إدارة سويه</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-400 hover:bg-[#1a2b4c] hover:text-white"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container (Desktop & Mobile Drawer - aligned to Right) */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 flex w-64 flex-col border-l border-[#775a19]/10 bg-[#031636] p-5 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:static'
        }`}
      >
        {/* Brand / Logo */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffdea5] to-[#fed488] text-[#031636] font-extrabold text-lg shadow-lg shadow-[#ffdea5]/10">
              ☕
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold leading-tight text-white">سويه</h1>
              <p className="text-[10px] uppercase tracking-wider text-[#ffdea5] font-semibold">لوحة الإشراف</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:bg-[#1a2b4c] lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#ffdea5]/10 text-[#ffdea5] border border-[#ffdea5]/10'
                    : 'text-zinc-400 hover:bg-[#1a2b4c]/40 hover:text-white border border-transparent'
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#ffdea5]' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto border-t border-[#775a19]/10 pt-4 space-y-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-lg bg-[#1a2b4c]/30 border border-[#775a19]/10 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-[#1a2b4c]/50 hover:text-white transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              عرض الموقع العام
            </span>
          </Link>

          {email && (
            <div className="px-3 py-1">
              <p className="text-[10px] text-zinc-500">الجلسة النشطة باسم</p>
              <p className="truncate text-xs font-medium text-zinc-300">{email}</p>
            </div>
          )}

          <form action={signOut} className="w-full">
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:bg-red-950/20 hover:text-red-400 gap-3 border border-transparent"
            >
              <LogOut className="h-4.5 w-4.5" />
              تسجيل الخروج
            </Button>
          </form>
        </div>
      </aside>
    </>
  )
}
