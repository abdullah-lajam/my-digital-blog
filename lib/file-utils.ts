import fs from "fs"
import path from "path"
import { promisify } from "util"

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const mkdirAsync = promisify(fs.mkdir)
const readdirAsync = promisify(fs.readdir)
const statAsync = promisify(fs.stat)
const unlinkAsync = promisify(fs.unlink)

// قراءة محتوى ملف
export async function readFile(filePath: string): Promise<string> {
  try {
    return await readFileAsync(filePath, "utf8")
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    throw error
  }
}

// كتابة محتوى إلى ملف
export async function writeFile(filePath: string, content: string): Promise<void> {
  try {
    // التأكد من وجود المجلد
    const dir = path.dirname(filePath)
    await ensureDirectoryExists(dir)

    // كتابة الملف
    await writeFileAsync(filePath, content, "utf8")
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error)
    throw error
  }
}

// التأكد من وجود المجلد، وإنشاؤه إذا لم يكن موجودًا
export async function ensureDirectoryExists(dir: string): Promise<void> {
  try {
    await statAsync(dir)
  } catch (error) {
    // إذا لم يكن المجلد موجودًا، قم بإنشائه
    await mkdirAsync(dir, { recursive: true })
  }
}

// قراءة محتويات مجلد
export async function readDirectory(dir: string): Promise<string[]> {
  try {
    return await readdirAsync(dir)
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
    throw error
  }
}

// حذف ملف
export async function deleteFile(filePath: string): Promise<void> {
  try {
    await unlinkAsync(filePath)
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error)
    throw error
  }
}

// التحقق من وجود ملف
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await statAsync(filePath)
    return true
  } catch (error) {
    return false
  }
}
