import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/types"

interface FeaturedPostsProps {
  posts: Post[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">مقالات مميزة</h2>

        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد مقالات مميزة حتى الآن.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>

                <CardContent className="p-6">
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

                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>

                <CardFooter className="px-6 py-4 border-t bg-muted/20 flex justify-between">
                  <div className="text-sm text-muted-foreground">{post.date}</div>
                  <div className="text-sm text-muted-foreground">{post.readingTime} دقائق للقراءة</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
