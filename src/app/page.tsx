'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="fade-up" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 160px)',
      textAlign: 'center',
      maxWidth: '840px',
      marginInline: 'auto',
      padding: '20px 24px',
    }}>
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
            fontSize: '19px',
            padding: '20px 52px',
            boxShadow: '0 8px 28px rgba(232, 70, 124, 0.35)',
            gap: '12px',
          }}>
            <span>เข้าสู่หน้าแดชบอร์ดจัดการงาน</span>
            <ArrowRight size={22} strokeWidth={2.4} />
          </button>
        </Link>
      </div>
    </div>
  );
}