import { getPosts } from "@/lib/post-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CategoriesPage() {
  const posts = await getPosts()

  // استخراج التصنيفات الفريدة وعدد المقالات في كل تصنيف
  const categoriesMap = posts
    .flatMap((post) => post.categories)
    .reduce(
      (acc, category) => {
        acc[category] = (acc[category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  const categories = Object.entries(categoriesMap).sort((a, b) => b[1] - a[1]) // ترتيب تنازلي حسب عدد المقالات

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">إدارة التصنيفات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(([category, count]) => (
          <Card key={category}>
            <CardHeader className="pb-2">
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {count} {count === 1 ? "مقال" : "مقالات"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
