'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { CafeInfo } from '@/types'

export async function getCafeInfo(): Promise<CafeInfo | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cafe_info')
    .select('*')
    .limit(1)

  if (error) {
    console.error('Error fetching cafe info:', error.message)
    return null
  }

  if (!data || data.length === 0) {
    return null
  }

  return data[0]
}

export async function updateCafeInfo(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const address = formData.get('address') as string
  const phone = formData.get('phone') as string
  const logoFile = formData.get('logo') as File | null
  const coverFile = formData.get('cover') as File | null
  const existingLogoUrl = formData.get('existing_logo_url') as string
  const existingCoverUrl = formData.get('existing_cover_url') as string

  if (!name) {
    return { error: 'Cafe name is required.' }
  }

  const supabase = await createClient()
  let logoUrl = existingLogoUrl || ''
  let coverUrl = existingCoverUrl || ''

  // Upload logo
  if (logoFile && logoFile.size > 0) {
    const fileExt = logoFile.name.split('.').pop()
    const fileName = `logo-${Date.now()}.${fileExt}`
    const arrayBuffer = await logoFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data: storageData, error: storageError } = await supabase.storage
      .from('cafe-assets')
      .upload(fileName, buffer, {
        contentType: logoFile.type,
      })

    if (storageError) {
      return { error: `Failed to upload logo: ${storageError.message}` }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('cafe-assets')
      .getPublicUrl(fileName)

    // Delete old logo asset if we had one in storage
    if (existingLogoUrl && existingLogoUrl.includes('cafe-assets')) {
      try {
        const parts = existingLogoUrl.split('/')
        const oldFileName = parts[parts.length - 1]
        await supabase.storage.from('cafe-assets').remove([oldFileName])
      } catch (e) {
        console.error('Failed to remove old logo:', e)
      }
    }

    logoUrl = publicUrl
  }

  // Upload cover
  if (coverFile && coverFile.size > 0) {
    const fileExt = coverFile.name.split('.').pop()
    const fileName = `cover-${Date.now()}.${fileExt}`
    const arrayBuffer = await coverFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data: storageData, error: storageError } = await supabase.storage
      .from('cafe-assets')
      .upload(fileName, buffer, {
        contentType: coverFile.type,
      })

    if (storageError) {
      return { error: `Failed to upload cover: ${storageError.message}` }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('cafe-assets')
      .getPublicUrl(fileName)

    // Delete old cover asset if we had one in storage
    if (existingCoverUrl && existingCoverUrl.includes('cafe-assets')) {
      try {
        const parts = existingCoverUrl.split('/')
        const oldFileName = parts[parts.length - 1]
        await supabase.storage.from('cafe-assets').remove([oldFileName])
      } catch (e) {
        console.error('Failed to remove old cover:', e)
      }
    }

    coverUrl = publicUrl
  }

  const { error } = await supabase
    .from('cafe_info')
    .update({
      name,
      description: description || null,
      address: address || null,
      phone: phone || null,
      logo_url: logoUrl || null,
      cover_url: coverUrl || null,
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/menu')
  revalidatePath('/admin')
  return { success: true }
}
