import type { Metadata } from 'next'
import { Sarabun } from 'next/font/google'
import './globals.css'
import { getSession } from '@/lib/auth'
import { logoutUser } from '@/app/actions/auth'
import Link from 'next/link'

const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-sarabun',
})

export const metadata: Metadata = {
  title: 'Event Feedback Intelligence',
  description: 'แพลตฟอร์มรับฟีดแบ็กงานกิจกรรมที่ขับเคลื่อนด้วย AI',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession();

  return (
    <html lang="th" className={sarabun.variable}>
      <body>
        <nav style={{ padding: '20px', background: 'var(--card-bg)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href={session ? "/dashboard" : "/"} style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>Event Feedback Intelligence</h2>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {session ? (
              <>
                <form action={logoutUser} style={{ margin: 0 }}>
                  <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--danger)', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>ออกจากระบบ</button>
                </form>
              </>
            ) : (
              <>
                <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-main)' }}>หน้าแรก</Link>
                <Link href="/auth" style={{ textDecoration: 'none', color: 'var(--primary-color)', fontWeight: 'bold' }}>ผู้จัดงาน (เข้าสู่ระบบ)</Link>
              </>
            )}
          </div>
        </nav>
        <main className="container" style={{ padding: '40px 20px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
