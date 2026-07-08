import React from 'react'
import { getProducts } from '@/actions/products'
import { getCategories } from '@/actions/categories'
import { getCafeInfo } from '@/actions/cafe'
import { CafeInfoForm } from '@/components/admin/CafeInfoForm'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Coffee, FolderTree, Sparkles, Building } from 'lucide-react'

export const revalidate = 0

export default async function AdminDashboardPage() {
  const [products, categories, cafeInfo] = await Promise.all([
    getProducts(),
    getCategories(),
    getCafeInfo(),
  ])

  const totalProducts = products.length
  const totalCategories = categories.length
  const activeProducts = products.filter((p) => p.available).length

  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: totalProducts,
      description: 'العناصر المسجلة في قائمة المنيو',
      icon: Coffee,
      colorClass: 'text-[#211a21] bg-[#211a21]/5 border-[#211a21]/15',
    },
    {
      title: 'المنتجات المتوفرة',
      value: activeProducts,
      description: 'العناصر المعروضة حالياً للزبائن',
      icon: Sparkles,
      colorClass: 'text-emerald-700 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'إجمالي الأقسام',
      value: totalCategories,
      description: 'التصنيفات المتاحة لتنظيم المنيو',
      icon: FolderTree,
      colorClass: 'text-[#5a4d5a] bg-[#5a4d5a]/5 border-[#5a4d5a]/15',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col gap-1.5 text-right">
        <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#211a21]">
          لوحة التحكم
        </h1>
        <p className="text-xs text-[#5a4d5a]">
          نظرة سريعة على إحصائيات المنيو وتعديل الملف التعريفي للمقهى.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="bg-white border-[#5a4d5a]/10 relative overflow-hidden shadow-sm">
              <CardContent className="p-6 flex items-center justify-between gap-4 text-right">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#5a4d5a]">{stat.title}</p>
                  <p className="text-3xl font-bold tracking-tight text-[#211a21]">{stat.value}</p>
                  <p className="text-[10px] text-zinc-400">{stat.description}</p>
                </div>
                <div className={`h-11 w-11 rounded-lg flex items-center justify-center shrink-0 border ${stat.colorClass}`}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Profile Management Section */}
      <Card className="bg-white border-[#5a4d5a]/15 overflow-hidden relative shadow-md">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#211a21] via-[#5a4d5a] to-[#211a21]" />
        <CardHeader className="p-6 border-b border-[#5a4d5a]/10 flex flex-row items-center gap-3 text-right">
          <div className="h-9 w-9 rounded-lg bg-[#211a21]/5 border border-[#211a21]/15 text-[#211a21] flex items-center justify-center shrink-0">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-[#211a21] font-serif">بيانات ومظهر المقهى</CardTitle>
            <CardDescription className="text-xs text-zinc-400 mt-0.5">
              إدارة الاسم، والوصف، وصورة الغلاف، وشعار المقهى، والعنوان وبيانات الاتصال.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CafeInfoForm cafeInfo={cafeInfo} />
        </CardContent>
      </Card>
    </div>
  )
}
