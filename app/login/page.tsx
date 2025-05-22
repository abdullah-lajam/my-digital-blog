"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth-actions"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn(formData)

      if (result.success) {
        // إعادة التوجيه على جانب العميل
        router.push("/admin")
      } else if (result.error) {
        setError(result.error)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("حدث خطأ أثناء محاولة تسجيل الدخول")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-8 space-y-8 bg-background rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">تسجيل الدخول إلى لوحة التحكم</h1>
          <p className="text-muted-foreground mt-2">أدخل بيانات الدخول للوصول إلى لوحة التحكم</p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">اسم المستخدم</Label>
            <Input id="username" name="username" type="text" required placeholder="أدخل اسم المستخدم" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" name="password" type="password" required placeholder="أدخل كلمة المرور" />
          </div>

          {error && <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>للتجربة استخدم:</p>
            <p>اسم المستخدم: admin</p>
            <p>كلمة المرور: password</p>
          </div>
        </form>

        <div className="text-center">
          <Link href="/" className="text-primary hover:underline text-sm">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
