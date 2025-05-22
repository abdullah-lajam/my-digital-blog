import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Tag, Users, Folder } from "lucide-react"

export default function AdminDashboard() {
  // بيانات إحصائية ثابتة بدلاً من الاعتماد على استدعاء API
  const stats = [
    {
      title: "المقالات",
      value: "...",
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/posts",
    },
    {
      title: "التصنيفات",
      value: "...",
      icon: <Folder className="h-6 w-6" />,
      href: "/admin/categories",
    },
    {
      title: "الوسوم",
      value: "...",
      icon: <Tag className="h-6 w-6" />,
      href: "/admin/tags",
    },
    {
      title: "المستخدمين",
      value: "1",
      icon: <Users className="h-6 w-6" />,
      href: "/admin/users",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <Link href="/admin/posts/new">
          <Button>إضافة مقال جديد</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.title}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                <div className="p-2 bg-primary/10 rounded-full text-primary">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <CardDescription>إجمالي {stat.title}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أحدث المقالات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قم بزيارة صفحة المقالات لعرض جميع المقالات.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>روابط سريعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/posts/new">
                <Button variant="outline" className="w-full">
                  إضافة مقال
                </Button>
              </Link>
              <Link href="/admin/categories">
                <Button variant="outline" className="w-full">
                  إدارة التصنيفات
                </Button>
              </Link>
              <Link href="/admin/tags">
                <Button variant="outline" className="w-full">
                  إدارة الوسوم
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="outline" className="w-full">
                  إدارة المستخدمين
                </Button>
              </Link>
            </div>
            <div className="pt-2">
              <Link href="/" className="text-primary hover:underline">
                زيارة الموقع
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
