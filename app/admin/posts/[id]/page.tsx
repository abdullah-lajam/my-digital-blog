"use client"

import { useEffect, useState } from "react"
import { PostForm } from "@/components/admin/post-form"
import { getStoredPosts } from "@/lib/post-storage"
import { useParams, useRouter } from "next/navigation"
import type { Post } from "@/lib/types"

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [post, setPost] = useState<Post | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // تحميل المقال والتصنيفات عند تحميل الصفحة
  useEffect(() => {
    const loadPost = () => {
      try {
        const posts = getStoredPosts()
        console.log("Total posts loaded:", posts.length)

        // إذا كان المعرف هو "new"، فهذا يعني أننا نريد إنشاء مقال جديد
        if (id === "new") {
          setPost(null)
        } else {
          // البحث عن المقال بواسطة المعرف أو الرابط المختصر
          const foundPost = posts.find((p) => p.id === id || p.slug === id)
          console.log("Found post:", foundPost)

          if (!foundPost) {
            setError("لم يتم العثور على المقال المطلوب")
          } else {
            setPost(foundPost)
          }
        }

        // استخراج التصنيفات الفريدة
        const uniqueCategories = Array.from(new Set(posts.flatMap((post) => post.categories)))
        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error loading post:", error)
        setError("حدث خطأ أثناء تحميل المقال")
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-lg">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-destructive text-lg mb-4">{error}</p>
        <button onClick={() => router.push("/admin/posts")} className="px-4 py-2 bg-primary text-white rounded-md">
          العودة إلى قائمة المقالات
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{id === "new" ? "إضافة مقال جديد" : "تعديل المقال"}</h1>
      <PostForm post={post} categories={categories} />
    </div>
  )
}
