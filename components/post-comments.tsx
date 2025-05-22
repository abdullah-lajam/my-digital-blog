"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"

interface PostCommentsProps {
  postSlug: string
}

interface Comment {
  id: string
  author: string
  avatar: string
  date: string
  content: string
}

export function PostComments({ postSlug }: PostCommentsProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "أحمد محمد",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "منذ 3 أيام",
      content: "مقال رائع! استفدت منه كثيراً وأتطلع لقراءة المزيد من مقالاتك.",
    },
    {
      id: "2",
      author: "سارة أحمد",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "منذ يومين",
      content: "شكراً على هذه المعلومات القيمة. هل يمكنك التوسع أكثر في هذا الموضوع في مقالات قادمة؟",
    },
  ])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "أنت",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "الآن",
      content: comment,
    }

    setComments([newComment, ...comments])
    setComment("")
    setIsSubmitting(false)

    toast({
      title: "تم إضافة تعليقك بنجاح",
      description: "شكراً على مشاركتك!",
    })
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">التعليقات ({comments.length})</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          placeholder="أضف تعليقك هنا..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="mb-4"
          rows={4}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الإرسال..." : "إرسال التعليق"}
        </Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{comment.author}</div>
                <div className="text-sm text-muted-foreground">{comment.date}</div>
              </div>
            </div>

            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
