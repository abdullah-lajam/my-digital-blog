import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">الصفحة غير موجودة</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
      </p>
      <Link href="/">
        <Button>العودة إلى الصفحة الرئيسية</Button>
      </Link>
    </div>
  )
}
