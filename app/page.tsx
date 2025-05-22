import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { FeaturedPosts } from "@/components/featured-posts"
import { LatestPosts } from "@/components/latest-posts"
import { Newsletter } from "@/components/newsletter"
import { featuredPosts, latestPosts } from "@/lib/posts-data"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">مرحباً بك في مدونتي الشخصية</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              مساحة لمشاركة أفكاري وخبراتي في مجال التكنولوجيا والتطوير
            </p>
          </div>
        </section>

        <FeaturedPosts posts={featuredPosts} />
        <LatestPosts posts={latestPosts} />

        <Newsletter />
      </main>
      <BlogFooter />
    </div>
  )
}
