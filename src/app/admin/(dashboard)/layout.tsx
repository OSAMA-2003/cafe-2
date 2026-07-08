import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/admin/Sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#fcfafc] text-[#211a21]">
      <Sidebar email={user.email} />
      <main className="flex-1 overflow-y-auto px-6 py-6 lg:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
