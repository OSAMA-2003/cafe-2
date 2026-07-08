'use client'

import React, { useState, useTransition } from 'react'
import { CafeInfo } from '@/types'
import { updateCafeInfo } from '@/actions/cafe'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, Save, ImageIcon, Phone, MapPin, Building } from 'lucide-react'

interface CafeInfoFormProps {
  cafeInfo: CafeInfo | null
}

export function CafeInfoForm({ cafeInfo }: CafeInfoFormProps) {
  const [isPending, startTransition] = useTransition()
  const [logoPreview, setLogoPreview] = useState<string | null>(cafeInfo?.logo_url || null)
  const [coverPreview, setCoverPreview] = useState<string | null>(cafeInfo?.cover_url || null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!cafeInfo?.id) return

    const formData = new FormData(e.currentTarget)
    formData.append('existing_logo_url', cafeInfo.logo_url || '')
    formData.append('existing_cover_url', cafeInfo.cover_url || '')

    startTransition(async () => {
      const result = await updateCafeInfo(cafeInfo.id, formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('تم تحديث الملف التعريفي للمقهى بنجاح!')
      }
    })
  }

  if (!cafeInfo) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-500">
        لم يتم العثور على سجل للمقهى في قاعدة البيانات. يرجى تشغيل ملف التهيأة Seeding.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Right Col: Info (RTL priority) */}
        <div className="space-y-4 text-right">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-600 font-semibold">اسم المقهى</Label>
            <div className="relative">
              <Building className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                id="name"
                name="name"
                defaultValue={cafeInfo.name}
                className="pr-10 pl-4 border-[#211a21]/20 bg-white text-[#211a21] focus-visible:ring-[#211a21] text-right"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zinc-600 font-semibold">رقم التواصل</Label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                id="phone"
                name="phone"
                defaultValue={cafeInfo.phone || ''}
                className="pr-10 pl-4 border-[#211a21]/20 bg-white text-[#211a21] focus-visible:ring-[#211a21] text-right"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-zinc-600 font-semibold">العنوان الفعلي</Label>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 h-4 w-4 text-zinc-400" />
              <Textarea
                id="address"
                name="address"
                defaultValue={cafeInfo.address || ''}
                className="pr-10 pl-4 border-[#211a21]/20 bg-white text-[#211a21] focus-visible:ring-[#211a21] min-h-[80px] text-right"
              />
            </div>
          </div>
        </div>

        {/* Left Col: Description */}
        <div className="space-y-4 text-right">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-zinc-600 font-semibold">نبذة عن المقهى</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={cafeInfo.description || ''}
              className="border-[#211a21]/20 bg-white text-[#211a21] focus-visible:ring-[#211a21] min-h-[178px] text-right leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Asset Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#5a4d5a]/10 pt-6 text-right">
        {/* Logo upload */}
        <div className="space-y-3">
          <Label className="text-zinc-600 font-semibold">شعار المقهى</Label>
          <div className="flex items-center gap-4 flex-row-reverse">
            <div className="h-16 w-16 rounded-xl overflow-hidden bg-zinc-100 border border-[#5a4d5a]/10 shrink-0">
              {logoPreview ? (
                <img src={logoPreview} alt="الشعار" className="w-full h-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-zinc-300">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1.5 text-right">
              <Input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleLogoChange}
                className="border-zinc-200 bg-white text-zinc-600 text-xs file:bg-zinc-100 file:text-zinc-700 file:border-0 file:rounded-md file:px-2.5 file:py-1 file:ml-2 hover:file:bg-zinc-200"
              />
              <p className="text-[10px] text-zinc-400">يفضل استخدام مقاس مربع. الحجم الأقصى ٢ ميجابايت.</p>
            </div>
          </div>
        </div>

        {/* Cover image upload */}
        <div className="space-y-3">
          <Label className="text-zinc-600 font-semibold">صورة الغلاف</Label>
          <div className="flex items-center gap-4 flex-row-reverse">
            <div className="h-16 w-28 rounded-xl overflow-hidden bg-zinc-100 border border-[#5a4d5a]/10 shrink-0">
              {coverPreview ? (
                <img src={coverPreview} alt="الغلاف" className="w-full h-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-zinc-300">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1.5 text-right">
              <Input
                type="file"
                name="cover"
                accept="image/*"
                onChange={handleCoverChange}
                className="border-zinc-200 bg-white text-zinc-600 text-xs file:bg-zinc-100 file:text-zinc-700 file:border-0 file:rounded-md file:px-2.5 file:py-1 file:ml-2 hover:file:bg-zinc-200"
              />
              <p className="text-[10px] text-zinc-400">يفضل استخدام مقاس عريض. الحجم الأقصى ٥ ميجابايت.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-[#5a4d5a]/10 pt-5">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#211a21] hover:bg-[#2e242e] text-white border border-transparent font-bold gap-2 transition-all duration-200 shadow-md hover:shadow-[#211a21]/15"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              جاري حفظ التعديلات...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              تحديث الملف التعريفي
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
