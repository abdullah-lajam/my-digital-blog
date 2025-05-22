import { AdminHeader } from "@/components/admin/admin-header"
import type { ReactNode } from "react"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
