"use client"

import type React from "react"

import { useState } from "react"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنقوم بالرد عليك في أقرب وقت ممكن.",
    })

    setIsSubmitting(false)
    event.currentTarget.reset()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">تواصل معي</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                الاسم
              </label>
              <Input id="name" name="name" required placeholder="أدخل اسمك" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <Input id="email" name="email" type="email" required placeholder="أدخل بريدك الإلكتروني" />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                الموضوع
              </label>
              <Input id="subject" name="subject" required placeholder="أدخل موضوع الرسالة" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                الرسالة
              </label>
              <Textarea id="message" name="message" required placeholder="أدخل رسالتك هنا" rows={6} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
            </Button>
          </form>
        </div>
      </main>
      <BlogFooter />
    </div>
  )
}
