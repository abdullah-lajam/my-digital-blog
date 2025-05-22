import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">من أنا</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              مرحباً! أنا [اسمك]، مطور ويب وكاتب محتوى تقني. أعمل في مجال تطوير الويب منذ أكثر من [عدد] سنوات، وأحب
              مشاركة معرفتي وخبراتي مع الآخرين.
            </p>

            <h2>خبراتي</h2>
            <p>
              تتركز خبراتي في تطوير تطبيقات الويب باستخدام تقنيات JavaScript الحديثة مثل React وNext.js. أهتم بشكل خاص
              بتحسين تجربة المستخدم وأداء التطبيقات.
            </p>

            <h2>هدف المدونة</h2>
            <p>
              أهدف من خلال هذه المدونة إلى مشاركة معرفتي في مجال تطوير الويب، وتقديم محتوى عربي مفيد للمطورين العرب.
              أسعى لتبسيط المفاهيم التقنية المعقدة وتقديمها بطريقة سهلة وممتعة.
            </p>

            <h2>تواصل معي</h2>
            <p>يمكنك التواصل معي عبر البريد الإلكتروني [بريدك الإلكتروني] أو متابعتي على منصات التواصل الاجتماعي.</p>
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  )
}
