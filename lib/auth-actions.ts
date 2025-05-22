"use server"

import { cookies } from "next/headers"

// بيانات المستخدم المشفرة - يمكنك تغييرها لبياناتك الخاصة
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "password"

// تسجيل الدخول - تم تعديله لإرجاع حالة النجاح بدلاً من إعادة التوجيه
export async function signIn(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  // التحقق من صحة بيانات الاعتماد بشكل مباشر
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // إنشاء جلسة بسيطة
    cookies().set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    })

    return { success: true }
  }

  return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" }
}

// تسجيل الخروج
export async function signOut() {
  cookies().delete("admin-session")
  return { success: true }
}

// التحقق من الجلسة
export async function getSession(): Promise<boolean> {
  const session = cookies().get("admin-session")?.value
  return session === "authenticated"
}
