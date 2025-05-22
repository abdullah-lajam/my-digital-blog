"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "@/lib/auth-actions"

export function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    { name: "لوحة التحكم", href: "/admin" },
    { name: "المقالات", href: "/admin/posts" },
    { name: "التصنيفات", href: "/admin/categories" },
    { name: "الوسوم", href: "/admin/tags" },
    { name: "المستخدمين", href: "/admin/users" },
  ]

  async function handleSignOut() {
    await signOut()
    router.push("/login")
  }

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold">
              لوحة التحكم
            </Link>
            <div className="hidden md:block mr-10">
              <div className="flex items-center space-x-4 space-x-reverse">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === item.href ? "bg-primary/10 text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground ml-4">
              العودة للموقع
            </Link>
            <form action={handleSignOut}>
              <Button variant="ghost" size="icon" type="submit">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">تسجيل الخروج</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
