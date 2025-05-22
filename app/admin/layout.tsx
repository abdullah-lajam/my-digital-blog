import type React from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { getSession } from "@/lib/auth-actions"
import { redirect } from "next/navigation"

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // التحقق من حالة المصادقة
  const isAuthenticated = await getSession()

  // إذا لم يكن المستخدم مصادقًا، قم بتوجيهه إلى صفحة تسجيل الدخول
  if (!isAuthenticated) {
    redirect("/login")
  }

  // عرض تخطيط لوحة التحكم للمستخدمين المصادقين
  return <AdminLayout>{children}</AdminLayout>
}
