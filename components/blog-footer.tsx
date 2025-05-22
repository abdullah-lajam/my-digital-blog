import Link from "next/link"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlogFooter() {
  return (
    <footer className="bg-background border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">مدونتي الرقمية</h3>
            <p className="text-muted-foreground">مساحة لمشاركة الأفكار والخبرات في مجال التكنولوجيا والتطوير.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-muted-foreground hover:text-foreground">
                  المقالات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  من أنا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  تواصل معي
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">تصنيفات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/ai" className="text-muted-foreground hover:text-foreground">
                  الذكاء الاصطناعي
                </Link>
              </li>
              <li>
                <Link href="/category/business" className="text-muted-foreground hover:text-foreground">
                  إدارة الأعمال
                </Link>
              </li>
              <li>
                <Link href="/category/self-development" className="text-muted-foreground hover:text-foreground">
                  تطوير الذات
                </Link>
              </li>
              <li>
                <Link href="/category/misc" className="text-muted-foreground hover:text-foreground">
                  مدونات متفرقة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">تابعني</h3>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">فيسبوك</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">تويتر</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">انستغرام</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">جيثب</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} مدونتي. جميع الحقوق محفوظة.</p>
          <div className="mt-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                دخول المسؤول
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
