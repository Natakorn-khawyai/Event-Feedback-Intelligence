'use server'

import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function registerUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) return { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return { error: 'อีเมลนี้ถูกใช้งานแล้ว' }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, passwordHash }
    })

    const session = await encrypt({ userId: user.id, name: user.name })
    const cookieStore = await cookies();
    cookieStore.set('session', session, { httpOnly: true, secure: true, maxAge: 86400 * 7, path: '/' })
    
  } catch (error) {
    console.error(error)
    return { error: 'เกิดข้อผิดพลาดของระบบ กรุณาลองใหม่' }
  }
  
  redirect('/dashboard')
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return { error: 'ไม่พบบัญชีผู้ใช้นี้' }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) return { error: 'รหัสผ่านไม่ถูกต้อง' }

    const session = await encrypt({ userId: user.id, name: user.name })
    const cookieStore = await cookies();
    cookieStore.set('session', session, { httpOnly: true, secure: true, maxAge: 86400 * 7, path: '/' })
    
  } catch (error) {
    console.error(error)
    return { error: 'เกิดข้อผิดพลาดของระบบ กรุณาลองใหม่' }
  }
  
  redirect('/dashboard')
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session')
  redirect('/auth')
}
