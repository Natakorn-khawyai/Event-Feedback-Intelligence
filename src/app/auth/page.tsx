'use client';

import { useState, useTransition } from 'react';
import { loginUser, registerUser } from '@/app/actions/auth';

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
    <div style={{ maxWidth: '400px', margin: '40px auto' }} className="glass-card">
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        {isLogin ? 'เข้าสู่ระบบ (ผู้จัดงาน)' : 'สมัครสมาชิก'}
      </h2>
      
      {error && (
        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderLeft: '4px solid var(--danger)', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <form action={handleSubmit}>
        {!isLogin && (
          <input 
            name="name"
            type="text" 
            placeholder="ชื่อ - นามสกุล" 
            className="input-field" 
            required 
          />
        )}
        <input 
          name="email"
          type="email" 
          placeholder="อีเมล" 
          className="input-field" 
          required 
        />
        <input 
          name="password"
          type="password" 
          placeholder="รหัสผ่าน" 
          className="input-field" 
          required 
        />
        
        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={isPending}>
          {isPending ? 'กำลังประมวลผล...' : (isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก')}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={() => { setIsLogin(!isLogin); setError(null); }}
          type="button"
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLogin ? 'ยังไม่มีบัญชี? สมัครสมาชิก' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
        </button>
      </div>
    </div>
  );
}
