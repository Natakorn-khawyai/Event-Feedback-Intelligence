'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="fade-up" style={{
      textAlign: 'center',
      paddingTop: '8vh',
      paddingBottom: '8vh',
      maxWidth: '820px',
      marginInline: 'auto',
    }}>
      {/* Decorative AI Pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 16px',
        backgroundColor: 'rgba(255, 209, 227, 0.45)',
        border: '1px solid rgba(232, 70, 124, 0.25)',
        borderRadius: 'var(--radius-full)',
        fontSize: '12px',
        fontWeight: '700',
        color: 'var(--accent-pink-hot)',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(232, 70, 124, 0.08)',
      }}>
        <Sparkles size={14} strokeWidth={2.2} />
        <span>AI-Powered Event Analytics</span>
      </div>

      {/* Main Heading */}
      <h1 style={{
        fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
        fontWeight: '800',
        marginBottom: '20px',
        color: 'var(--text-primary)',
        lineHeight: '1.2',
        letterSpacing: '-0.02em',
      }}>
        เปลี่ยน Feedback ธรรมดา<br />
        <span className="highlight-stroke">ให้เป็น Insight</span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-secondary)',
        marginBottom: '44px',
        maxWidth: '620px',
        marginInline: 'auto',
        lineHeight: '1.6',
      }}>
        รับฟังเสียงจากผู้เข้าร่วมงาน และใช้ AI วิเคราะห์ความพึงพอใจเพื่อยกระดับประสบการณ์ในงานครั้งถัดไปให้ดียิ่งขึ้น
      </p>

      {/* Single Action Button: เข้าสู่หน้าแดชบอร์ดจัดการงาน */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <button className="btn-cta" style={{
            fontSize: '16px',
            padding: '16px 42px',
            boxShadow: 'var(--shadow-pill)',
          }}>
            <Sparkles size={18} strokeWidth={2} />
            <span>เข้าสู่หน้าแดชบอร์ดจัดการงาน</span>
            <ArrowRight size={18} strokeWidth={2.2} />
          </button>
        </Link>
      </div>
    </div>
  );
}