"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getStoredPosts, deleteStoredPost } from "@/lib/post-storage"
import type { Post } from "@/lib/types"
import { Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()

  // تحميل المقالات عند تحميل الصفحة
  useEffect(() => {
    setPosts(getStoredPosts())
  }, [])

  // حذف مقال
  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      deleteStoredPost(id)
      setPosts(getStoredPosts())
      toast({
        title: "تم حذف المقال",
        description: "تم حذف المقال بنجاح.",
      })
      router.refresh()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة المقالات</h1>
        <Link href="/admin/posts/new">
          <Button>إضافة مقال جديد</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-xl text-muted-foreground mb-4">لا توجد مقالات حتى الآن</p>
          <Link href="/admin/posts/new">
            <Button>إضافة مقال جديد</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-2">
                <CardTitle>
                  <Link href={`/admin/posts/${post.id}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {post.date} • {post.readingTime} دقائق للقراءة
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/posts/${post.id}`}>
                      <Button variant="outline" size="sm">
                        تعديل
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
