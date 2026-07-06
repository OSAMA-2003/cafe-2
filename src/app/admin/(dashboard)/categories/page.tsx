import React from 'react'
import { getCategories } from '@/actions/categories'
import { CategoriesManager } from '@/components/admin/CategoriesManager'

export const revalidate = 0

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-1 text-right">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#031636]">
          إدارة الأقسام
        </h1>
        <p className="text-xs text-[#44474e]">
          إضافة وتعديل وحذف أقسام المنيو لتنظيم المأكولات والمشروبات.
        </p>
      </div>

      {/* Main Categories Manager UI */}
      <CategoriesManager initialCategories={categories} />
    </div>
  )
}
