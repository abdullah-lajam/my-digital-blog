export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string[]
  coverImage: string
  date: string
  author: string
  readingTime: number
  categories: string[]
  tags: string[]
  isHtml?: boolean // إضافة خاصية لتحديد ما إذا كان المحتوى HTML
}
