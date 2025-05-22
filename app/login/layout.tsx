import type React from "react"
import { getSession } from "@/lib/auth-actions"
import { redirect } from "next/navigation"

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await getSession()

  // إذا كان المستخدم مصادقًا بالفعل، قم بتوجيهه إلى لوحة التحكم
  if (isAuthenticated) {
    redirect("/admin")
  }

  return children
}
