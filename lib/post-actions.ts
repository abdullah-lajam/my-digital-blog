"use server"

import { revalidatePath } from "next/cache"
import { posts as initialPosts } from "@/lib/posts-data"
import type { Post } from "@/lib/types"

// الحصول على جميع المقالات
export async function getPosts(): Promise<Post[]> {
  try {
    // نعيد المقالات الأولية مباشرة لتجنب أخطاء قراءة الملفات
    return initialPosts
  } catch (error) {
    console.error("Error getting posts:", error)
    return []
  }
}

// الحصول على مقال بواسطة المعرف
export async function getPostById(id: string): Promise<Post | null> {
  try {
    // إذا كان المعرف هو "new"، فهذا يعني أننا نريد إنشاء مقال جديد
    if (id === "new") {
      return null
    }

    // البحث في المقالات الأولية
    const post = initialPosts.find((p) => p.id === id || p.slug === id)
    return post || null
  } catch (error) {
    console.error(`Error getting post ${id}:`, error)
    return null
  }
}

// إنشاء مقال جديد
export async function createPost(postData: any): Promise<Post> {
  try {
    // استخراج البيانات
    const title = postData.title || ""
    const slug = postData.slug || ""
    const excerpt = postData.excerpt || ""
    const editorMode = postData.editorMode || "text"

    // معالجة المحتوى بناءً على وضع المحرر
    let content: string[]
    if (editorMode === "html") {
      // إذا كان المحتوى HTML، نحفظه كما هو في مصفوفة بعنصر واحد
      content = [postData.content || ""]
    } else {
      // إذا كان المحتوى نصًا عاديًا، نقسمه إلى فقرات
      content =
        typeof postData.content === "string"
          ? postData.content.split("\n\n").filter(Boolean)
          : Array.isArray(postData.content)
            ? postData.content
            : []
    }

    const coverImage = postData.coverImage || "/placeholder.svg"
    const author = postData.author || "غير معروف"
    const readingTime = Number.parseInt(postData.readingTime) || 5
    const categories = Array.isArray(postData.categories)
      ? postData.categories
      : typeof postData.categories === "string"
        ? JSON.parse(postData.categories)
        : []
    const tags = Array.isArray(postData.tags)
      ? postData.tags
      : typeof postData.tags === "string"
        ? JSON.parse(postData.tags)
        : []

    // إنشاء كائن المقال
    const post: Post = {
      id: Date.now().toString(), // استخدام الطابع الزمني كمعرف فريد
      title,
      slug,
      excerpt,
      content,
      coverImage,
      date: new Date().toLocaleDateString("ar-SA"),
      author,
      readingTime,
      categories,
      tags,
      isHtml: editorMode === "html", // إضافة علامة لتحديد ما إذا كان المحتوى HTML
    }

    // تحديث الصفحات
    revalidatePath("/admin/posts")
    revalidatePath("/posts")
    revalidatePath(`/posts/${slug}`)
    revalidatePath("/")

    return post
  } catch (error) {
    console.error("Error creating post:", error)
    throw new Error("فشل في إنشاء المقال")
  }
}

// تحديث مقال موجود
export async function updatePost(id: string, postData: any): Promise<Post | null> {
  try {
    // الحصول على المقال الحالي
    const currentPost = await getPostById(id)
    if (!currentPost) {
      throw new Error(`Post with ID ${id} not found`)
    }

    // استخراج البيانات
    const title = postData.title || currentPost.title
    const slug = postData.slug || currentPost.slug
    const excerpt = postData.excerpt || currentPost.excerpt
    const editorMode = postData.editorMode || "text"

    // معالجة المحتوى بناءً على وضع المحرر
    let content: string[]
    if (editorMode === "html") {
      // إذا كان المحتوى HTML، نحفظه كما هو في مصفوفة بعنصر واحد
      content = [postData.content || ""]
    } else {
      // إذا كان المحتوى نصًا عاديًا، نقسمه إلى فقرات
      content =
        typeof postData.content === "string"
          ? postData.content.split("\n\n").filter(Boolean)
          : Array.isArray(postData.content)
            ? postData.content
            : currentPost.content
    }

    const coverImage = postData.coverImage || currentPost.coverImage
    const author = postData.author || currentPost.author
    const readingTime = Number.parseInt(postData.readingTime) || currentPost.readingTime
    const categories = Array.isArray(postData.categories)
      ? postData.categories
      : typeof postData.categories === "string"
        ? JSON.parse(postData.categories)
        : currentPost.categories
    const tags = Array.isArray(postData.tags)
      ? postData.tags
      : typeof postData.tags === "string"
        ? JSON.parse(postData.tags)
        : currentPost.tags

    // إنشاء كائن المقال المحدث
    const updatedPost: Post = {
      id: id,
      title,
      slug,
      excerpt,
      content,
      coverImage,
      date: currentPost.date,
      author,
      readingTime,
      categories,
      tags,
      isHtml: editorMode === "html", // إضافة علامة لتحديد ما إذا كان المحتوى HTML
    }

    // تحديث الصفحات
    revalidatePath("/admin/posts")
    revalidatePath("/posts")
    revalidatePath(`/posts/${slug}`)
    revalidatePath("/")

    return updatedPost
  } catch (error) {
    console.error(`Error updating post ${id}:`, error)
    return null
  }
}

// حذف مقال
export async function deletePost(id: string): Promise<{ success: boolean }> {
  try {
    // تحديث الصفحات
    revalidatePath("/admin/posts")
    revalidatePath("/posts")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error)
    return { success: false }
  }
}
