import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UsersPage() {
  // في التطبيق الحقيقي، ستحصل على هذه البيانات من قاعدة البيانات
  const users = [
    {
      id: "1",
      name: "المسؤول",
      email: "admin@example.com",
      role: "مدير",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-4 space-x-reverse">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">الدور: {user.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
