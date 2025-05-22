"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import type { Post } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { storePost } from "@/lib/post-storage"

interface PostFormProps {
  post?: Post | null
  categories: string[]
}

export function PostForm({ post, categories }: PostFormProps) {
  const router = useRouter()

  // حالة النموذج
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [content, setContent] = useState(post?.content.join("\n\n") || "")
  const [coverImage, setCoverImage] = useState(post?.coverImage || "")
  const [author, setAuthor] = useState(post?.author || "")
  const [readingTime, setReadingTime] = useState(post?.readingTime?.toString() || "5")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(post?.categories || [])
  const [tags, setTags] = useState(post?.tags.join(", ") || "")

  // حالة المحرر
  const [editorMode, setEditorMode] = useState<"text" | "html">(post?.isHtml ? "html" : "text")
  const [htmlPreview, setHtmlPreview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // تحديث المعاينة عند تغيير المحتوى
  const updatePreview = () => {
    if (editorMode === "html") {
      setHtmlPreview(content)
    } else {
      const html = content
        .split("\n\n")
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join("\n")
      setHtmlPreview(html)
    }
  }

  // معالجة تغيير التصنيفات
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  // معالجة إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // معالجة المحتوى بناءً على وضع المحرر
      let postContent: string[]
      if (editorMode === "html") {
        postContent = [content]
      } else {
        postContent = content.split("\n\n").filter(Boolean)
      }

      // معالجة الوسوم
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      // إنشاء كائن المقال
      const newPost: Post = {
        id: post?.id || Date.now().toString(),
        title,
        slug,
        excerpt,
        content: postContent,
        coverImage: coverImage || "/placeholder.svg",
        date: post?.date || new Date().toLocaleDateString("ar-SA"),
        author,
        readingTime: Number.parseInt(readingTime) || 5,
        categories: selectedCategories,
        tags: tagArray,
        isHtml: editorMode === "html",
      }

      console.log("Saving post:", newPost)

      // حفظ المقال
      const success = storePost(newPost)

      if (success) {
        toast({
          title: post ? "تم تحديث المقال بنجاح" : "تم إنشاء المقال بنجاح",
          description: post ? "تم تحديث المقال بنجاح وحفظ التغييرات." : "تم إنشاء المقال الجديد بنجاح.",
        })

        // إعادة توجيه المستخدم إلى صفحة المقالات بعد تأخير قصير
        setTimeout(() => {
          router.push("/admin/posts")
        }, 500)
      } else {
        throw new Error("فشل في حفظ المقال")
      }
    } catch (error) {
      console.error("Error saving post:", error)
      toast({
        title: "حدث خطأ",
        description: "لم يتم حفظ المقال. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">عنوان المقال</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="أدخل عنوان المقال"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">الرابط المختصر (Slug)</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="مثال: my-post-title"
            dir="ltr"
          />
          <p className="text-sm text-muted-foreground">
            يجب أن يكون الرابط المختصر فريدًا ويحتوي على أحرف إنجليزية وأرقام وشرطات فقط
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">ملخص المقال</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            placeholder="اكتب ملخصًا قصيرًا للمقال"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="content">محتوى المقال</Label>
            <Select value={editorMode} onValueChange={(value) => setEditorMode(value as "text" | "html")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر وضع المحرر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">نص عادي</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">المحرر</TabsTrigger>
              <TabsTrigger value="preview" onClick={updatePreview}>
                المعاينة
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editor">
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder={editorMode === "html" ? "اكتب كود HTML هنا" : "اكتب محتوى المقال هنا"}
                rows={15}
                className="font-mono"
                dir={editorMode === "html" ? "ltr" : "rtl"}
              />
              {editorMode === "text" ? (
                <p className="text-sm text-muted-foreground mt-2">
                  استخدم فقرات منفصلة بسطر فارغ. سيتم تحويل كل فقرة إلى عنصر &lt;p&gt; في HTML.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">
                  يمكنك كتابة كود HTML مباشرة. تأكد من كتابة HTML صحيح لتجنب مشاكل العرض.
                </p>
              )}
            </TabsContent>
            <TabsContent value="preview">
              <div
                className="border rounded-md p-4 min-h-[300px] prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlPreview }}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverImage">رابط صورة الغلاف</Label>
          <Input
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="أدخل رابط صورة الغلاف"
            dir="ltr"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">اسم الكاتب</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="أدخل اسم الكاتب"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="readingTime">وقت القراءة (بالدقائق)</Label>
          <Input
            id="readingTime"
            type="number"
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            required
            min={1}
          />
        </div>

        <div className="space-y-2">
          <Label>التصنيفات</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={`category-${category}`} className="cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">الوسوم</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="أدخل الوسوم مفصولة بفواصل (مثال: ذكاء اصطناعي, تعلم آلي)"
          />
          <p className="text-sm text-muted-foreground">أدخل الوسوم مفصولة بفواصل</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()} className="ml-2" disabled={isSubmitting}>
          إلغاء
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : post ? "تحديث المقال" : "إنشاء المقال"}
        </Button>
      </div>
    </form>
  )
}
