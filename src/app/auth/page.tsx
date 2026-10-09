'use client';

import { useState, useTransition } from 'react';
import { loginUser, registerUser } from '@/app/actions/auth';
import { User, Lock, Mail, Sparkles, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const action = isLogin ? loginUser : registerUser;
      const res = await action(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="fade-up" style={{
      maxWidth: '520px',
      margin: '40px auto 80px auto',
      width: '100%',
      position: 'relative',
    }}>
      {/* Ambient desktop glow */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '380px',
        height: '380px',
        background: 'radial-gradient(circle, rgba(255, 209, 227, 0.4) 0%, rgba(230, 220, 250, 0.15) 70%, transparent 100%)',
        filter: 'blur(50px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Unified Desktop Auth Card */}
      <div
        className="surface-card"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '44px 40px',
          borderRadius: '24px',
          boxShadow: '0 16px 48px rgba(31, 31, 46, 0.08)',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid var(--border-glass)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Welcome Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD1E3 0%, #E6DCFA 100%)',
            color: 'var(--accent-pink-hot)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(232, 70, 124, 0.2)',
            marginBottom: '16px',
          }}>
            <Sparkles size={28} strokeWidth={2} />
          </div>

          <h1 style={{
            fontSize: '26px',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}>
            ยินดีต้อนรับสู่ <span className="highlight-stroke">Event Insight</span>
          </h1>

          <p style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            margin: 0,
          }}>
            {isLogin ? 'เข้าสู่ระบบเพื่อจัดการอีเวนต์และดูผลวิเคราะห์ AI' : 'สร้างบัญชีผู้จัดงานเพื่อเริ่มสร้างแบบประเมิน'}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div style={{
          display: 'flex',
          background: 'rgba(240, 245, 247, 0.85)',
          borderRadius: 'var(--radius-full)',
          padding: '4px',
          marginBottom: '24px',
          border: '1px solid var(--border-glass)',
        }}>
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(null); }}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: isLogin ? 'var(--accent-pink-hot)' : 'transparent',
              color: isLogin ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: isLogin ? 'var(--shadow-pill)' : 'none',
              transition: 'all 0.15s ease-out',
            }}
          >
            เข้าสู่ระบบ
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(null); }}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: !isLogin ? 'var(--accent-pink-hot)' : 'transparent',
              color: !isLogin ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: !isLogin ? 'var(--shadow-pill)' : 'none',
              transition: 'all 0.15s ease-out',
            }}
          >
            สร้างบัญชีใหม่
          </button>
        </div>


        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.08)',
            color: 'var(--status-danger)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                ชื่อ - นามสกุล หรือ องค์กร
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  name="name"
                  type="text"
                  placeholder="เช่น สมชาย ใจดี"
                  className="input-modern"
                  style={{ paddingLeft: '44px' }}
                  required
                />
                <div style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }}>
                  <User size={18} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              อีเมล
            </label>
            <div style={{ position: 'relative' }}>
              <input
                name="email"
                type="email"
                placeholder="อีเมลของคุณ"
                className="input-modern"
                style={{ paddingLeft: '44px' }}
                required
              />
              <div style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }}>
                <Mail size={18} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              รหัสผ่าน
            </label>
            <div style={{ position: 'relative' }}>
              <input
                name="password"
                type="password"
                placeholder="รหัสผ่านของคุณ"
                className="input-modern"
                style={{ paddingLeft: '44px' }}
                required
              />
              <div style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }}>
                <Lock size={18} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-cta"
            style={{ width: '100%', marginTop: '8px' }}
            disabled={isPending}
          >
            {isPending ? (
              <span>กำลังประมวลผล...</span>
            ) : (
              <>
                <span>{isLogin ? 'เข้าสู่ระบบ' : 'ยืนยันการสมัคร'}</span>
                <ArrowRight size={16} strokeWidth={2.2} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-pink-hot)',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            {isLogin ? 'ยังไม่มีบัญชี? สมัครสมาชิกใหม่ที่นี่' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
          </button>
        </div>
      </div>
    </div>
  );
}
