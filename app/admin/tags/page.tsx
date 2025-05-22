import { getPosts } from "@/lib/post-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function TagsPage() {
  const posts = await getPosts()

  // استخراج الوسوم الفريدة وعدد المقالات في كل وسم
  const tagsMap = posts
    .flatMap((post) => post.tags)
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  const tags = Object.entries(tagsMap).sort((a, b) => b[1] - a[1]) // ترتيب تنازلي حسب عدد المقالات

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">إدارة الوسوم</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tags.map(([tag, count]) => (
          <Card key={tag}>
            <CardHeader className="pb-2">
              <CardTitle>{tag}</CardTitle>
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
