import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Sarabun } from 'next/font/google';
import './globals.css';
import { getSession } from '@/lib/auth';
import { logoutUser } from '@/app/actions/auth';
import Link from 'next/link';
import { Sparkles, LogOut, User, LayoutDashboard } from 'lucide-react';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-sarabun',
});

export const metadata: Metadata = {
  title: 'Event Feedback Intelligence - AI Survey & Analytics',
  description: 'แพลตฟอร์มรับฟีดแบ็กงานกิจกรรมที่ขับเคลื่อนด้วย AI ดีไซน์สดใส ทันสมัย และชาญฉลาด',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="th" className={`${plusJakartaSans.variable} ${sarabun.variable}`}>
      <body>
        <div className="app-container">
          {/* Top Floating Glass Navigation */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            marginBottom: '16px',
            background: 'var(--surface-white)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-soft)',
          }}>
            <Link
              href={session ? "/dashboard" : "/"}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-primary)',
                fontWeight: '800',
                fontSize: '14px',
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD1E3 0%, #E6DCFA 100%)',
                color: 'var(--accent-pink-hot)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(232, 70, 124, 0.2)',
              }}>
                <Sparkles size={16} strokeWidth={2} />
              </div>
              <span>Event Insight</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    style={{
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(255, 209, 227, 0.35)',
                    }}
                  >
                    <LayoutDashboard size={14} color="var(--accent-pink-hot)" />
                    <span>แดชบอร์ด</span>
                  </Link>
                  <form action={logoutUser} style={{ margin: 0 }}>
                    <button
                      type="submit"
                      aria-label="ออกจากระบบ"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        transition: 'color 0.15s ease',
                      }}
                      title="ออกจากระบบ"
                    >
                      <LogOut size={16} strokeWidth={1.8} />
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    style={{
                      textDecoration: 'none',
                      color: '#FFFFFF',
                      backgroundColor: 'var(--accent-pink-hot)',
                      padding: '7px 16px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      fontWeight: '700',
                      boxShadow: 'var(--shadow-pill)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease-out',
                    }}
                  >
                    <User size={13} strokeWidth={2} />
                    <span>เข้าสู่ระบบ</span>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Main View Area */}
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
