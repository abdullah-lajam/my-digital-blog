import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { posts } from "@/lib/posts-data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { RelatedPosts } from "@/components/related-posts"
import { PostComments } from "@/components/post-comments"

export default function AIRoadmapPost() {
  const post = posts.find((post) => post.slug === "ai-learning-roadmap")

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-1 container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="صورة الكاتب" />
                <AvatarFallback>كاتب</AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-muted-foreground">
                  {post.date} • {post.readingTime} دقائق للقراءة
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="container mx-auto px-4 py-10">
              {/* Header Section */}
              <div className="flex flex-col items-center justify-center text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-blue-600 text-white">
                  <i className="fas fa-robot text-2xl"></i>
                </div>
                <h1 className="text-4xl font-extrabold mb-4">
                  خريطة الطريق الشاملة لتعلّم الذكاء الاصطناعي لغير المتخصصين
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  دليلك العملي لفهم وتطبيق الذكاء الاصطناعي في حياتك المهنية والشخصية
                </p>

                <div className="mt-6 max-w-md mx-auto bg-blue-600 backdrop-blur-md text-white border border-white/30 rounded-xl p-6 shadow-xl">
                  <p className="text-lg font-semibold mb-1">إعداد: عبدالله سالم</p>
                  <p className="text-sm">
                    <a
                      href="https://www.linkedin.com/in/abdullah-salem-lajam"
                      target="_blank"
                      className="underline hover:text-indigo-200 transition-colors"
                      rel="noreferrer"
                    >
                      LinkedIn: Abdullah Salem
                    </a>
                  </p>
                </div>

                <div className="inline-flex bg-blue-100 rounded-full px-4 py-2 text-blue-800 font-bold">
                  <span>إصدار مايو 2025</span>
                </div>
              </div>

              {/* Intro Links Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-12 border-r-4 border-blue-500">
                <p className="text-lg mb-4">يرتبط هذا الدليل بشكل تكاملي مع مصدريْن سبق إعدادهما ضمن حقيبة تثقيفية :</p>
                <ol className="list-decimal mr-5 space-y-3">
                  <li className="flex items-center">
                    <span className="font-bold ml-2">"AI‑Tools Navigator"</span> – دليل التصفح العملي لأدوات الذكاء
                    الاصطناعي
                    <a
                      href="https://abdullah-lajam.github.io/AI-Tools-Navigator/"
                      className="text-blue-600 hover:text-blue-800 mr-2 inline-flex items-center"
                    >
                      <i className="fas fa-external-link-alt ml-1 text-sm"></i>
                      رابط المصدر
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="font-bold ml-2">دورة "هندسة الأوامر – Prompt Engineering"</span>
                    <a
                      href="https://abdullah-lajam.github.io/prompt-engineering"
                      className="text-blue-600 hover:text-blue-800 mr-2 inline-flex items-center"
                    >
                      <i className="fas fa-external-link-alt ml-1 text-sm"></i>
                      رابط المصدر
                    </a>
                  </li>
                </ol>
                <p className="mt-4 text-gray-700">
                  يُنصح بالاطلاع عليهما أثناء تقدّمك في المرحلة الثالثة من هذه الخريطة.
                </p>
              </div>

              {/* Section 0 */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-12 relative">
                <span className="phase-number">0</span>
                <h2 className="text-2xl font-bold mb-6">لمن أُعدَّ هذا الدليل؟</h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th>الفئة</th>
                        <th>التحدي الشائع</th>
                        <th>كيف يساعدهم الدليل؟</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-bold">المعلِّمون</td>
                        <td>دمج أدوات تفاعلية في الصفوف</td>
                        <td>أمثلة تربوية + أدوات توليد محتوى عربي</td>
                      </tr>
                      <tr>
                        <td className="font-bold">روّاد الأعمال</td>
                        <td>أتمتة مهام التسويق وخدمة العملاء</td>
                        <td>سيناريوهات جاهزة + إرشادات هندسة أوامر</td>
                      </tr>
                      <tr>
                        <td className="font-bold">الموظفون</td>
                        <td>زيادة الإنتاجية وتلخيص المستندات</td>
                        <td>مخططات عملية لاستخدام Copilot/‏ChatGPT</td>
                      </tr>
                      <tr>
                        <td className="font-bold">الطلاب</td>
                        <td>فهم المفاهيم سريعًا وإنشاء ملخصات</td>
                        <td>خطّة شهرية + مصادر عربية مجانية</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Additional content for Section 0 */}
                <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">تقييم جاهزيتك للذكاء الاصطناعي</h3>
                  <p className="mb-3">قبل البدء بالرحلة، قم بتقييم ذاتي بسيط لتحديد نقطة انطلاقك المثالية:</p>

                  <div className="space-y-4 mt-3">
                    <div>
                      <p className="font-bold">١. المعرفة النظرية الأساسية</p>
                      <div className="progress-bar">
                        <div className="progress" style={{ width: "20%" }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>مبتدئ</span>
                        <span>متوسط</span>
                        <span>متقدم</span>
                      </div>
                    </div>

                    <div>
                      <p className="font-bold">٢. التطبيق العملي للأدوات</p>
                      <div className="progress-bar">
                        <div className="progress" style={{ width: "40%" }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>مبتدئ</span>
                        <span>متوسط</span>
                        <span>متقدم</span>
                      </div>
                    </div>

                    <div>
                      <p className="font-bold">٣. القدرة على دمج الذكاء الاصطناعي في العمل</p>
                      <div className="progress-bar">
                        <div className="progress" style={{ width: "10%" }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>مبتدئ</span>
                        <span>متوسط</span>
                        <span>متقدم</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-700">
                    <i className="fas fa-lightbulb text-yellow-500 ml-1"></i>
                    نصيحة: اختر نقطة البدء في الخريطة بناءً على تقييمك الشخصي. يمكنك تخطي أجزاء من المرحلة الأولى إذا كنت
                    تمتلك خلفية قوية.
                  </p>
                </div>
              </div>

              {/* Section 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-12 relative">
                <span className="phase-number">1</span>
                <div className="inline-flex items-center mb-6">
                  <div className="ai-icon text-xl">
                    <i className="fas fa-book"></i>
                  </div>
                  <h2 className="text-2xl font-bold">المرحلة ١ – الأساسيات النظرية</h2>
                </div>

                {/* Section 1-1 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">١‑١ تعريف وأهداف الذكاء الاصطناعي</h3>

                  <ul className="list-disc mr-6 space-y-3">
                    <li>
                      <span className="font-bold">تعريف مُبسط:</span> أنظمة برمجية تحاكي قدرات التفكير البشري (تعلّم،
                      استنتاج، فهم لغة).
                    </li>
                    <li>
                      <span className="font-bold">هدف عملي:</span> بناء نماذج تتخذ قرارات أفضل أو أسرع من الإنسان في
                      نطاق محدد.
                    </li>
                  </ul>

                  {/* Added content */}
                  <div className="mt-6">
                    <h4 className="text-lg font-bold mb-2">أنواع الذكاء الاصطناعي - تصنيف عملي:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-bold text-blue-800">الذكاء الضيق (ANI)</h5>
                        <p>متخصص بمهمة محددة، مثل: التعرف على الكلام، تحليل صور الأشعة.</p>
                        <span className="badge">الأكثر شيوعاً حالياً</span>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-bold text-blue-800">الذكاء العام (AGI)</h5>
                        <p>يحاكي القدرات البشرية عبر مجالات متعددة ويتكيف مع مهام جديدة.</p>
                        <span className="badge badge-orange">تحت التطوير</span>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-bold text-blue-800">الذكاء الفائق (ASI)</h5>
                        <p>قدرات تفوق الإنسان في كافة المجالات المعرفية والإبداعية.</p>
                        <span className="badge badge-orange">مفهوم مستقبلي</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
                <h2 className="text-2xl font-bold mb-4 text-center">الخاتمة – بداية رحلتك مع الذكاء الاصطناعي</h2>
                <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                  لقد استعرضنا معاً خريطة الطريق المتكاملة للبدء في عالم الذكاء الاصطناعي. تذكر أن التعلم لا يتوقف عند
                  نقطة معينة، بل هو رحلة مستمرة من الفضول والتجربة والتطوير.
                </p>
                <p className="text-md text-gray-600 leading-relaxed text-center mb-6">
                  ابدأ بتطبيق أبسط الأدوات في حياتك اليومية، ثم انتقل تدريجياً إلى المهام الأكثر تعقيداً. لا تخف من
                  التجربة والخطأ، فجميع الخبراء كانوا في البداية مبتدئين.
                </p>
                <div className="flex justify-center">
                  <div className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-blue-700 cursor-pointer">
                    ابدأ رحلتك الآن 🚀
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>
        <RelatedPosts currentPostId={post.id} />
        <PostComments postSlug={post.slug} />
      </main>
      <BlogFooter />
    </div>
  )
}
