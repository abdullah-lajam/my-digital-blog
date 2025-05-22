"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">حدث خطأ ما</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        نعتذر، حدث خطأ أثناء محاولة الوصول إلى لوحة التحكم. يرجى المحاولة مرة أخرى.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} variant="outline">
          إعادة المحاولة
        </Button>
        <Link href="/admin/login">
          <Button>العودة إلى صفحة تسجيل الدخول</Button>
        </Link>
      </div>
    </div>
  )
}
