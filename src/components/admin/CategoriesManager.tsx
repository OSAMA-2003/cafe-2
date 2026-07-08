'use client'

import React, { useState, useTransition, useMemo } from 'react'
import { Category } from '@/types'
import { addCategory, updateCategory, deleteCategory } from '@/actions/categories'
import { Search, Plus, Loader2, Pencil, Trash2, FolderTree } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface CategoriesManagerProps {
  initialCategories: Category[]
}

export function CategoriesManager({ initialCategories }: CategoriesManagerProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  // Add Dialog State
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  // Edit Dialog State
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingName, setEditingName] = useState('')

  // Delete Dialog State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  // Filter categories
  const filteredCategories = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [categories, searchQuery])

  const handleAdd = () => {
    if (!newCategoryName.trim()) {
      toast.error('يرجى إدخال اسم القسم')
      return
    }

    startTransition(async () => {
      const res = await addCategory(newCategoryName.trim())
      if (res.error) {
        toast.error(res.error)
      } else if (res.category) {
        setCategories((prev) => [res.category!, ...prev])
        setNewCategoryName('')
        setIsAddOpen(false)
        toast.success('تمت إضافة القسم بنجاح!')
      }
    })
  }

  const handleEdit = () => {
    if (!editingCategory || !editingName.trim()) {
      toast.error('يرجى إدخال اسم القسم')
      return
    }

    startTransition(async () => {
      const res = await updateCategory(editingCategory.id, editingName.trim())
      if (res.error) {
        toast.error(res.error)
      } else if (res.category) {
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? res.category! : c))
        )
        setIsEditOpen(false)
        setEditingCategory(null)
        toast.success('تم تحديث اسم القسم بنجاح!')
      }
    })
  }

  const handleDelete = () => {
    if (!deletingCategory) return

    startTransition(async () => {
      const res = await deleteCategory(deletingCategory.id)
      if (res.error) {
        toast.error(res.error)
      } else {
        setCategories((prev) => prev.filter((c) => c.id !== deletingCategory.id))
        toast.success('تم حذف القسم بنجاح!')
        setDeletingCategory(null)
        setIsDeleteOpen(false)
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header controls bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        {/* Search bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="ابحث عن قسم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 pl-4 border-[#211a21]/20 bg-white text-[#211a21] focus-visible:ring-[#211a21] rounded-lg text-right"
          />
        </div>

        {/* Add Category Trigger */}
        <Button onClick={() => setIsAddOpen(true)} className="w-full sm:w-auto bg-[#211a21] hover:bg-[#2e242e] text-white border border-transparent font-bold gap-2 transition-all duration-200 shadow-md">
          <Plus className="h-4 w-4" />
          إضافة قسم جديد
        </Button>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="border-zinc-200 bg-white text-[#211a21] backdrop-blur-md max-w-md text-right">
            <DialogHeader className="text-right">
              <DialogTitle className="text-lg font-bold font-serif text-[#211a21]">إضافة قسم جديد</DialogTitle>
              <DialogDescription className="text-zinc-500 text-xs mt-1">
                أنشئ قسماً جديداً لتصنيف منتجات المنيو. تأكد من أن الاسم فريد وغير مكرر.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-3 text-right">
              <div className="space-y-2">
                <Label htmlFor="category-name" className="text-zinc-600 font-semibold">اسم القسم</Label>
                <Input
                  id="category-name"
                  placeholder="مثال: مشروبات باردة"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="border-[#211a21]/20 bg-white text-[#211a21] focus-visible:ring-[#211a21] text-right"
                />
              </div>
            </div>
            <DialogFooter className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                onClick={() => setIsAddOpen(false)}
                className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleAdd}
                disabled={isPending}
                className="bg-[#211a21] hover:bg-[#2e242e] text-white font-semibold"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'إنشاء القسم'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Table list */}
      <div className="rounded-xl border border-[#211a21]/15 bg-white overflow-hidden shadow-sm">
        <Table className="text-right">
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="border-zinc-100 hover:bg-transparent">
              <TableHead className="text-right text-[#211a21] font-bold">اسم القسم</TableHead>
              <TableHead className="text-right text-[#211a21] font-bold">تاريخ الإنشاء</TableHead>
              <TableHead className="text-left text-[#211a21] font-bold pl-6">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <TableRow key={category.id} className="border-zinc-100 hover:bg-zinc-50/30 transition-colors">
                  <TableCell className="font-semibold text-[#211a21] py-4.5">{category.name}</TableCell>
                  <TableCell className="text-zinc-400 text-xs">
                    {new Date(category.created_at).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-left pl-6 space-x-2 space-x-reverse">
                    {/* Edit Trigger */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingCategory(category)
                        setEditingName(category.name)
                        setIsEditOpen(true)
                      }}
                      className="text-zinc-400 hover:bg-[#211a21]/5 hover:text-[#211a21] h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    {/* Delete Trigger */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setDeletingCategory(category)
                        setIsDeleteOpen(true)
                      }}
                      className="text-zinc-400 hover:bg-red-50 hover:text-red-600 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={3} className="text-center py-16 text-zinc-400">
                  <FolderTree className="h-10 w-10 mx-auto mb-3 text-zinc-300 stroke-[1.5]" />
                  {'لم يتم العثور على أي أقسام. اضغط على "إضافة قسم جديد" للبدء.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Category Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="border-zinc-200 bg-white text-[#211a21] backdrop-blur-md max-w-md text-right">
          <DialogHeader className="text-right">
            <DialogTitle className="text-lg font-bold font-serif text-[#211a21]">تعديل القسم</DialogTitle>
            <DialogDescription className="text-zinc-500 text-xs mt-1">
              تعديل اسم القسم الحالي. تأكد من أن الاسم فريد وغير مكرر.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3 text-right">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-zinc-600 font-semibold">اسم القسم</Label>
              <Input
                id="edit-name"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="border-[#211a21]/20 bg-white text-[#211a21] focus-visible:ring-[#211a21] text-right"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="ghost"
              onClick={() => setIsEditOpen(false)}
              className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            >
              إلغاء
            </Button>
            <Button
              onClick={handleEdit}
              disabled={isPending}
              className="bg-[#211a21] hover:bg-[#2e242e] text-white font-semibold"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'حفظ التعديلات'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="border-zinc-200 bg-white text-[#211a21] backdrop-blur-md max-w-md text-right">
          <DialogHeader className="text-right">
            <DialogTitle className="text-lg font-bold font-serif text-red-600">تأكيد حذف القسم</DialogTitle>
            <DialogDescription className="text-zinc-500 text-xs mt-1">
              هل أنت متأكد من رغبتك في حذف القسم <span className="font-bold text-[#211a21]">&quot;{deletingCategory?.name}&quot;</span>؟
            </DialogDescription>
            <p className="text-[11px] text-red-600 mt-3 bg-red-50 border border-red-100 p-2.5 rounded-lg leading-relaxed">
              تنبيه هام: سيؤدي حذف هذا القسم إلى حذف جميع المنتجات المندرجة تحته تلقائياً من المنيو. لا يمكن التراجع عن هذا الإجراء لاحقاً.
            </p>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end mt-4">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteOpen(false)}
              className="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            >
              إلغاء
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'تأكيد الحذف'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
