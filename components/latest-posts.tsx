import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/types"

interface LatestPostsProps {
  posts: Post[]
}

export function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">أحدث المقالات</h2>

        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد مقالات حتى الآن.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-6 md:w-2/3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category) => (
                          <Badge key={category} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <Link href={`/posts/${post.slug}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h3>
                      </Link>

                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {post.date} • {post.readingTime} دقائق للقراءة
                        </div>

                        <Link href={`/posts/${post.slug}`}>
                          <Button variant="link" className="p-0">
                            اقرأ المزيد
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/posts">
            <Button>عرض جميع المقالات</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
