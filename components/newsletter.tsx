"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "تم الاشتراك بنجاح!",
      description: "شكراً لاشتراكك في النشرة البريدية.",
    })

    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">اشترك في النشرة البريدية</h2>
          <p className="text-muted-foreground mb-8">احصل على أحدث المقالات والنصائح مباشرة إلى بريدك الإلكتروني.</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري الاشتراك..." : "اشترك الآن"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            لن نقوم بمشاركة بريدك الإلكتروني مع أي جهة أخرى. يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </div>
      </div>
    </section>
  )
}
