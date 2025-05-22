"use client"

import type { Post } from "@/lib/types"
import { posts as initialPosts } from "@/lib/posts-data"

// مفتاح التخزين في localStorage
const POSTS_STORAGE_KEY = "blog_posts"

// التحقق من وجود window
const isBrowser = typeof window !== "undefined"

// الحصول على المقالات من التخزين المحلي
export function getStoredPosts(): Post[] {
  // التحقق من وجود window (لأن هذا الكود يعمل فقط في المتصفح)
  if (!isBrowser) {
    return initialPosts
  }

  try {
    // محاولة الحصول على المقالات من التخزين المحلي
    const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY)
    if (!storedPosts) {
      // إذا لم تكن هناك مقالات مخزنة، قم بتخزين المقالات الأولية
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(initialPosts))
      return initialPosts
    }

    // تحويل المقالات المخزنة إلى كائنات
    return JSON.parse(storedPosts)
  } catch (error) {
    console.error("Error getting stored posts:", error)
    return initialPosts
  }
}

// الحصول على مقال بواسطة المعرف
export function getStoredPostById(id: string): Post | null {
  if (!isBrowser) {
    return null
  }

  try {
    const posts = getStoredPosts()
    return posts.find((post) => post.id === id) || null
  } catch (error) {
    console.error(`Error getting post with ID ${id}:`, error)
    return null
  }
}

// حفظ المقالات في التخزين المحلي
export function storePost(post: Post): boolean {
  // التحقق من وجود window
  if (!isBrowser) {
    return false
  }

  try {
    // الحصول على المقالات الحالية
    const posts = getStoredPosts()

    // البحث عن المقال الحالي (إذا كان موجودًا)
    const existingPostIndex = posts.findIndex((p) => p.id === post.id)

    if (existingPostIndex !== -1) {
      // تحديث المقال الموجود
      console.log(`Updating existing post at index ${existingPostIndex}:`, post)
      posts[existingPostIndex] = post
    } else {
      // إضافة المقال الجديد
      console.log("Adding new post:", post)
      posts.push(post)
    }

    // حفظ المقالات في التخزين المحلي
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts))
    console.log("Posts saved to localStorage. Total posts:", posts.length)
    return true
  } catch (error) {
    console.error("Error storing post:", error)
    return false
  }
}

// حذف مقال من التخزين المحلي
export function deleteStoredPost(id: string): boolean {
  // التحقق من وجود window
  if (!isBrowser) {
    return false
  }

  try {
    // الحصول على المقالات الحالية
    const posts = getStoredPosts()

    // حذف المقال
    const updatedPosts = posts.filter((p) => p.id !== id)

    // حفظ المقالات في التخزين المحلي
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts))
    return true
  } catch (error) {
    console.error("Error deleting post:", error)
    return false
  }
}
