'use client';

import { useState, useTransition } from 'react';
import { loginUser, registerUser } from '@/app/actions/auth';
import TopBar from '@/components/ui/TopBar';
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
    <div className="fade-up">
      <TopBar
        title={isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
        showBack={true}
        backHref="/"
        showSearch={false}
        showMic={false}
      />

      {/* Hero Welcome Card */}
      <div
        className="hero-glass-card"
        style={{
          marginBottom: '20px',
          textAlign: 'center',
          padding: '24px 20px',
        }}
      >
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          color: 'var(--accent-pink-hot)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(232, 70, 124, 0.25)',
          marginBottom: '12px',
        }}>
          <Sparkles size={26} strokeWidth={1.8} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
          ยินดีต้อนรับสู่ <span className="highlight-stroke">Event Insight</span>
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          {isLogin ? 'เข้าสู่ระบบเพื่อจัดการอีเวนต์และดูผลวิเคราะห์ AI' : 'สร้างบัญชีผู้จัดงานเพื่อเริ่มสร้างแบบประเมิน'}
        </p>
      </div>

      {/* Tab Switcher Pills */}
      <div style={{
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 'var(--radius-full)',
        padding: '4px',
        marginBottom: '20px',
        border: '1px solid var(--border-glass)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}>
        <button
          type="button"
          onClick={() => { setIsLogin(true); setError(null); }}
          style={{
            flex: 1,
            padding: '10px 0',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: isLogin ? 'var(--accent-pink-hot)' : 'transparent',
            color: isLogin ? '#FFFFFF' : 'var(--text-secondary)',
            fontWeight: '700',
            fontSize: '13px',
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
            padding: '10px 0',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: !isLogin ? 'var(--accent-pink-hot)' : 'transparent',
            color: !isLogin ? '#FFFFFF' : 'var(--text-secondary)',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: !isLogin ? 'var(--shadow-pill)' : 'none',
            transition: 'all 0.15s ease-out',
          }}
        >
          สร้างบัญชีใหม่
        </button>
      </div>

      {/* Auth Card */}
      <div className="surface-card">
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
