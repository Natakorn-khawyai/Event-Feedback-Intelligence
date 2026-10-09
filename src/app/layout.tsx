import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Sarabun } from 'next/font/google';
import './globals.css';
import { getSession } from '@/lib/auth';
import { logoutUser } from '@/app/actions/auth';
import Link from 'next/link';
import { LogOut, User, LayoutDashboard, Home } from 'lucide-react';

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
        {/* Full-Width Edge-to-Edge Desktop Navigation Bar */}
        <header style={{
          width: '100%',
          background: 'var(--surface-white)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-glass)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div className="global-header-inner">
            {/* Left: Brand Title */}
            <Link
              href={session ? '/dashboard' : '/'}
              className="brand-title"
            >
              Event Feedback Intelligence
            </Link>

            {/* Right: User / Auth Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {session ? (
                <>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '7px 16px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 209, 227, 0.45)',
                    border: '1px solid rgba(232, 70, 124, 0.25)',
                  }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-pink-hot)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '800',
                    }}>
                      {(session.name || 'U').substring(0, 1).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {session.name}
                    </span>
                  </div>

                  <form action={logoutUser} style={{ margin: 0 }}>
                    <button
                      type="submit"
                      aria-label="ออกจากระบบ"
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--border-glass)',
                        backgroundColor: '#FFFFFF',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '9px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '14px',
                        fontWeight: '700',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        transition: 'all 0.15s ease',
                      }}
                      title="ออกจากระบบ"
                    >
                      <LogOut size={16} strokeWidth={2} />
                      <span className="desktop-only">ออกจากระบบ</span>
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
                      padding: '11px 24px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '15px',
                      fontWeight: '700',
                      boxShadow: 'var(--shadow-pill)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease-out',
                    }}
                  >
                    <User size={18} strokeWidth={2.2} />
                    <span>เข้าสู่ระบบ</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="app-container" style={{ paddingTop: '28px' }}>
          <main>
            {children}
          </main>

          {/* Bottom Floating Navigation Pill Bar (Mobile Only - Logged in Organizers) */}
          {session && (
            <nav
              aria-label="Bottom Navigation"
              className="mobile-only"
              style={{
                position: 'fixed',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 32px)',
                maxWidth: '320px',
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-glass)',
                boxShadow: '0 8px 30px rgba(31, 31, 46, 0.12)',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '8px 12px',
                zIndex: 50,
              }}
            >
              <Link
                href="/"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  textDecoration: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 12px',
                }}
              >
                <Home size={19} strokeWidth={1.8} />
                <span>หน้าแรก</span>
              </Link>

              <Link
                href="/dashboard"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  textDecoration: 'none',
                  color: 'var(--accent-pink-hot)',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 12px',
                }}
              >
                <LayoutDashboard size={19} strokeWidth={1.8} />
                <span>แดชบอร์ด</span>
              </Link>
            </nav>
          )}
        </div>
      </body>
    </html>
  );
}
