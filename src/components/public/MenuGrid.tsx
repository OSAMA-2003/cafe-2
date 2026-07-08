'use client'

import React, { useState, useMemo } from 'react'
import { Category, Product } from '@/types'
import { Search, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { StaggerContainer, StaggerItem } from '@/components/public/MotionWrapper'
import { motion } from 'framer-motion'

interface MenuGridProps {
  categories: Category[]
  products: Product[]
}

export function MenuGrid({ categories, products }: MenuGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Filter products based on search query and selected category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category_id === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchQuery])

  return (
    <div className="space-y-10">
      {/* Search and Categories bar */}
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between border-b border-[#5a4d5a]/20 pb-8">
        {/* Categories Tab Selector */}
        <div className="flex w-full overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`relative rounded-lg px-5 py-2 text-xs font-bold whitespace-nowrap transition-all duration-300 z-10 ${selectedCategory === 'all'
              ? 'text-[#211a21]'
              : 'text-[#d8ced8] hover:text-white'
              }`}
          >
            {selectedCategory === 'all' && (
              <motion.span
                layoutId="activeCategory"
                className="absolute inset-0 bg-white rounded-lg -z-10 shadow-md shadow-[#1a151a]/15"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            الكل
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative rounded-lg px-5 py-2 text-xs font-bold whitespace-nowrap transition-all duration-300 z-10 ${selectedCategory === category.id
                ? 'text-[#211a21]'
                : 'text-[#d8ced8] hover:text-white'
                }`}
            >
              {selectedCategory === category.id && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white rounded-lg -z-10 shadow-md shadow-[#1a151a]/15"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {category.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="text"
            placeholder="ابحث في قائمتنا..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border-[#5a4d5a]/30 bg-[#1a151a] text-white placeholder-zinc-500 focus-visible:ring-white focus-visible:border-white rounded-none text-right font-sans"
          />
        </div>
      </div>

      {/* Products Display Grid (High Density: 4 columns on desktop, 2 on mobile) */}
      {filteredProducts.length > 0 ? (
        <StaggerContainer key={selectedCategory} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <StaggerItem
              key={product.id}
              className={`group relative ${!product.available ? 'opacity-65' : ''}`}
            >
              {/* Card Container for shadow and border background */}
              <div className="bg-[#2e242e] rounded-lg overflow-hidden shadow-sm border border-[#5a4d5a]/20 hover:border-[#5a4d5a]/40 hover:shadow-lg transition-all duration-500 pb-3 flex flex-col h-full justify-between">
                <div className="relative">
                  {/* Image wrapper */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-900 border-b border-[#5a4d5a]/10">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center text-zinc-600 bg-zinc-900">
                        <ShoppingBag className="h-8 w-8 stroke-[1.5] mb-2" />
                        <span className="text-[9px] uppercase tracking-wider font-semibold">لا توجد صورة</span>
                      </div>
                    )}

                    {/* Sold out overlay */}
                    {!product.available && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-10">
                        <span className="rounded-none border border-red-500/20 bg-red-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400">
                          نفد
                        </span>
                      </div>
                    )}

                    {/* Hover Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211a21]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  </div>

                  {/* Body Wrapper */}
                  <div className="p-4 text-right bg-[#2e242e] relative z-20 -mt-5 mx-3 rounded-none shadow-[0_-8px_16px_rgba(0,0,0,0.02)] border border-[#5a4d5a]/20 flex flex-col justify-between min-h-[110px]">
                    <div className="space-y-1">
                      <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-[#d8ced8] transition-colors leading-tight line-clamp-1">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-[10px] sm:text-xs text-[#d8ced8] leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer details inside the card */}
                <div className="px-4 pt-3 mt-3 border-t border-[#5a4d5a]/20 flex items-center justify-between flex-row-reverse text-[9px] sm:text-[10px]">
                  <span className="font-bold uppercase tracking-widest text-white">
                    {categories.find((c) => c.id === product.category_id)?.name || 'مشروب'}
                  </span>

                  {product.available ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                      <Sparkles className="h-3 w-3" />
                      متوفر
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      غير متوفر
                    </span>
                  )}
                </div>
              </div>

              {/* Floating rectangular Price Tag */}
              <div className="absolute top-4 left-4 bg-white text-[#211a21] px-3 py-1 font-bold text-xs tracking-tighter shadow-md z-30 flex items-center gap-1">
                <span>{Number(product.price).toFixed(0)}</span>
                <img src="/Saudi_Riyal_Symbol.webp" alt="ر.س" className="h-3.5 w-auto object-contain select-none" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="text-center py-20 bg-[#1a151a] border border-dashed border-[#5a4d5a]/20">
          <ShoppingBag className="mx-auto h-12 w-12 text-zinc-600 mb-4 stroke-[1.5]" />
          <h3 className="text-zinc-400 font-medium mb-1">لم يتم العثور على أي عناصر</h3>
          <p className="text-xs text-[#d8ced8] max-w-xs mx-auto">
            لم نجد أي منتجات تطابق معايير بحثك في هذه الفئة حالياً.
          </p>
        </div>
      )}
    </div>
  )
}
