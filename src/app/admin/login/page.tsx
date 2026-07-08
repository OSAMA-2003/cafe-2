'use client'

import React, { useActionState, startTransition } from 'react'
import Link from 'next/link'
import { signIn } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Lock, Mail, Loader2 } from 'lucide-react'

const initialState = {
  error: null as string | null,
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, initialState)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fcfafc] px-4 overflow-hidden">
      {/* Decorative Ornaments (Brand Colors) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#211a21]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-[#5a4d5a]/5 blur-[100px] pointer-events-none" />

      <Card className="relative w-full max-w-md overflow-hidden border-[#5a4d5a]/15 bg-white shadow-xl rounded-2xl">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#211a21] via-[#5a4d5a] to-[#211a21]" />
        
        <CardHeader className="pt-10 pb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-auto items-center justify-center">
            <img src="/logo.png" alt="VO كافيه" className="h-14 w-auto object-contain drop-shadow-sm" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-[#211a21] font-serif">
            لوحة تحكم VO CAFE
          </CardTitle>
          <CardDescription className="text-zinc-400 text-xs mt-1.5">
            سجل الدخول لإدارة المنيو، الأقسام، والمظهر العام للموقع.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 text-right">
            {state?.error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600 text-right leading-relaxed">
                {state.error === 'Invalid login credentials' ? 'بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.' : state.error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#211a21] font-semibold text-xs">
                البريد الإلكتروني
              </Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-zinc-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@cafe.com"
                  className="pr-10 pl-4 border-zinc-200 bg-white text-[#211a21] placeholder-zinc-400 focus-visible:ring-[#211a21] focus-visible:border-[#211a21] text-right rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#211a21] font-semibold text-xs">
                كلمة المرور
              </Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-zinc-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pr-10 pl-4 border-zinc-200 bg-white text-[#211a21] placeholder-zinc-400 focus-visible:ring-[#211a21] focus-visible:border-[#211a21] text-right rounded-lg"
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-6 pb-10 flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#211a21] hover:bg-[#2e242e] text-white border border-transparent font-bold py-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  جاري التحقق...
                </span>
              ) : (
                'الدخول للوحة التحكم'
              )}
            </Button>
            
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-[#211a21] transition-colors duration-200"
            >
              ← العودة للموقع الرئيسي
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
