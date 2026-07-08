import React from 'react'
import { getCategories } from '@/actions/categories'
import { getProducts } from '@/actions/products'
import { MenuGrid } from '@/components/public/MenuGrid'
import { FadeIn } from '@/components/public/MotionWrapper'

export const revalidate = 0

export default async function MenuPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ])

  return (
    <div className="min-h-screen py-16 bg-[#211a21] text-[#f5f2f5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <FadeIn duration={0.8}>
          <div className="relative text-center max-w-2xl mx-auto mb-16">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/5 blur-[50px] pointer-events-none" />

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              قائمة المأكولات والمشروبات
            </h1>
            <p className="text-sm text-[#d8ced8] mt-3 max-w-md mx-auto leading-relaxed">
              يتم تحضير القهوة من حبوب بن محمصة محلياً يومياً بكل شغف، وجميع مخبوزاتنا طازجة ولذيذة. اكتشف مجموعتنا المميزة.
            </p>
          </div>
        </FadeIn>

        {/* Categories & Search Grid */}
        <MenuGrid categories={categories} products={products} />
      </div>
    </div>
  )
}
