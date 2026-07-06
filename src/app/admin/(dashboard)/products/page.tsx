import React from 'react'
import { getProducts } from '@/actions/products'
import { getCategories } from '@/actions/categories'
import { ProductsManager } from '@/components/admin/ProductsManager'

export const revalidate = 0

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-1 text-right">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#031636]">
          إدارة المنتجات
        </h1>
        <p className="text-xs text-[#44474e]">
          إضافة وتعديل وحذف المنتجات في قائمة المنيو وتحديث الأسعار والصور.
        </p>
      </div>

      {/* Main Products Manager UI */}
      <ProductsManager initialProducts={products} categories={categories} />
    </div>
  )
}
