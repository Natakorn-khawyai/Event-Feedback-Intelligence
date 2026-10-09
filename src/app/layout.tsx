import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Sarabun } from 'next/font/google';
import './globals.css';
import { getSession } from '@/lib/auth';
import { logoutUser } from '@/app/actions/auth';
import Link from 'next/link';
import { Sparkles, LogOut, User, LayoutDashboard, Home, Users, Flower2, PlusCircle } from 'lucide-react';

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
          {/* Desktop Glass Navigation Bar */}
          <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 24px',
            marginBottom: '28px',
            background: 'var(--surface-white)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-soft)',
          }}>
            {/* Left: Brand Logo & Title */}
            <Link
              href={session ? "/dashboard" : "/"}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--text-primary)',
                fontWeight: '800',
                fontSize: '17px',
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD1E3 0%, #E6DCFA 100%)',
                color: 'var(--accent-pink-hot)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(232, 70, 124, 0.25)',
              }}>
                <Sparkles size={18} strokeWidth={2.2} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ lineHeight: '1.2' }}>Event Feedback Intelligence</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>AI Powered Analytics</span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="desktop-only" style={{ alignItems: 'center', gap: '8px' }}>
              <Link
                href="/"
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: '700',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  transition: 'all 0.15s ease',
                }}
              >
                หน้าแรก
              </Link>

              {session && (
                <>
                  <Link
                    href="/dashboard"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: '700',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <LayoutDashboard size={15} color="var(--accent-pink-hot)" />
                    <span>แดชบอร์ด</span>
                  </Link>

                  <Link
                    href="/create"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: '700',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <PlusCircle size={15} color="var(--accent-pink-hot)" />
                    <span>สร้างแบบประเมิน</span>
                  </Link>
                </>
              )}

              <Link
                href="/community"
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: '700',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Users size={15} color="var(--accent-pink-hot)" />
                <span>Community</span>
              </Link>

              <Link
                href="/builder"
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: '700',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Flower2 size={15} color="var(--accent-pink-hot)" />
                <span>Bouquet Builder</span>
              </Link>
            </nav>

            {/* Right: User / Auth Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {session ? (
                <>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 209, 227, 0.4)',
                    border: '1px solid rgba(232, 70, 124, 0.2)',
                  }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-pink-hot)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '800',
                    }}>
                      {(session.name || 'U').substring(0, 1).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
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
                        padding: '8px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '12px',
                        fontWeight: '700',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        transition: 'all 0.15s ease',
                      }}
                      title="ออกจากระบบ"
                    >
                      <LogOut size={15} strokeWidth={1.8} />
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
                      padding: '9px 20px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '13px',
                      fontWeight: '700',
                      boxShadow: 'var(--shadow-pill)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease-out',
                    }}
                  >
                    <User size={15} strokeWidth={2} />
                    <span>เข้าสู่ระบบ</span>
                  </Link>
                </>
              )}
            </div>
          </header>

          {/* Main View Area */}
          <main>
            {children}
          </main>

          {/* Bottom Floating Navigation Pill Bar (Mobile Only) */}
          <nav
            aria-label="Bottom Navigation"
            className="mobile-only"
            style={{
              position: 'fixed',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - 32px)',
              maxWidth: '400px',
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
                padding: '4px 8px',
              }}
            >
              <Home size={19} strokeWidth={1.8} />
              <span>Home</span>
            </Link>

            <Link
              href="/builder"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                textDecoration: 'none',
                color: 'var(--accent-pink-hot)',
                fontSize: '10px',
                fontWeight: '700',
                padding: '4px 8px',
              }}
            >
              <Flower2 size={19} strokeWidth={1.8} />
              <span>Builder</span>
            </Link>

            <Link
              href="/community"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                fontSize: '10px',
                fontWeight: '700',
                padding: '4px 8px',
              }}
            >
              <Users size={19} strokeWidth={1.8} />
              <span>Community</span>
            </Link>

            <Link
              href="/dashboard"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                fontSize: '10px',
                fontWeight: '700',
                padding: '4px 8px',
              }}
            >
              <LayoutDashboard size={19} strokeWidth={1.8} />
              <span>Insight</span>
            </Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
