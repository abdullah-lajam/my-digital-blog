import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { posts } from "@/lib/posts-data"

interface RelatedPostsProps {
  currentPostId: string
}

export function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  // Get 3 related posts (excluding the current post)
  const relatedPosts = posts.filter((post) => post.id !== currentPostId).slice(0, 3)

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">مقالات ذات صلة</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-40 w-full">
                <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>

              <div className="p-4">
                <Link href={`/posts/${post.slug}`}>
                  <h3 className="font-bold hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                </Link>

                <div className="text-sm text-muted-foreground mt-2">
                  {post.date} • {post.readingTime} دقائق للقراءة
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
