'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Category } from '@/types'

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error.message)
    return []
  }

  return data || []
}

export async function createCategory(name: string) {
  if (!name || name.trim() === '') {
    return { error: 'Category name is required' }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .insert([{ name: name.trim() }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/menu')
  revalidatePath('/admin')
  revalidatePath('/admin/categories')
  return { success: true }
}

export async function updateCategory(id: string, name: string) {
  if (!name || name.trim() === '') {
    return { error: 'Category name is required' }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .update({ name: name.trim() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/menu')
  revalidatePath('/admin')
  revalidatePath('/admin/categories')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/menu')
  revalidatePath('/admin')
  revalidatePath('/admin/categories')
  return { success: true }
}
