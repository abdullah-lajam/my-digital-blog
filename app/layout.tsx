import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
})

// تحديث عنوان المدونة
export const metadata: Metadata = {
  title: "مدونتي الرقمية",
  description: "مدونة شخصية احترافية لمشاركة الأفكار والمعرفة",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
