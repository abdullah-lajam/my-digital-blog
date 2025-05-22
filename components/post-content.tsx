import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Post } from "@/lib/types"

interface PostContentProps {
  post: Post
}

export function PostContent({ post }: PostContentProps) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 mb-6">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="صورة الكاتب" />
            <AvatarFallback>كاتب</AvatarFallback>
          </Avatar>

          <div>
            <div className="font-medium">{post.author}</div>
            <div className="text-sm text-muted-foreground">
              {post.date} • {post.readingTime} دقائق للقراءة
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.isHtml ? (
          // إذا كان المحتوى HTML، نعرضه مباشرة
          <div dangerouslySetInnerHTML={{ __html: post.content.join("") }} />
        ) : (
          // إذا كان المحتوى نصًا عاديًا، نعرض كل فقرة على حدة
          post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)
        )}
      </div>

      <div className="mt-8 pt-8 border-t">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
