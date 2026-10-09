'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TopBar from '@/components/ui/TopBar';
import IconButton from '@/components/ui/IconButton';
import HeroCard from '@/components/ui/HeroCard';
import TabChips from '@/components/ui/TabChips';
import { 
  Sparkles, 
  Calendar, 
  Gift, 
  Glasses, 
  Layers, 
  QrCode, 
  BarChart3, 
  ArrowRight,
  Smile,
  Heart,
  Palette,
  Users
} from 'lucide-react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('Popular');

  const categories = [
    { id: 'all', label: 'All', icon: <Layers size={22} strokeWidth={1.5} />, href: undefined },
    { id: 'date', label: 'Date', icon: <Calendar size={22} strokeWidth={1.5} />, href: '/builder' },
    { id: 'gifts', label: 'Gifts', icon: <Gift size={22} strokeWidth={1.5} />, href: '/community' },
    { id: 'vr', label: 'VR', icon: <Glasses size={22} strokeWidth={1.5} />, href: '/dashboard' },
  ];

  const tabs = ['Popular', 'School', 'Recommended', 'Event Insight'];

  return (
    <div className="fade-up" style={{ paddingBottom: '32px' }}>
      {/* 1. Top Bar: hamburger menu (left), mic + search icons (right) */}
      <TopBar 
        title="Event & Bouquet" 
        showBack={false}
        showSearch={true}
        showMic={true}
      />

      {/* 2. Category row: 4 circular pink buttons (All, Date, Gifts, VR) with icon + label beneath */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 8px 18px 8px',
      }}>
        {categories.map((cat) => (
          <IconButton
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            href={cat.href}
            isActive={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </div>

      {/* 3. Hero card: "Make your own → / bouquet!" with pink emphasized word,
             and an inner white pill showing [flower] + [leaf] + [ribbon] preview */}
      <HeroCard
        titlePrefix="Make your own →"
        highlightText="bouquet"
        titleSuffix="!"
        description="ออกแบบช่อดอกไม้ในสไตล์ของคุณ หรือสร้างแบบประเมินความพึงพอใจด้วยพลัง AI อัจฉริยะ"
        ctaText="จัดช่อดอกไม้ของคุณ"
        ctaHref="/builder"
        previewPill={{
          items: [
            { icon: <span>🌸</span>, text: 'Flower' },
            { icon: <span>🍃</span>, text: 'Leaf' },
            { icon: <span>🎀</span>, text: 'Ribbon' },
          ]
        }}
      />

      {/* 4. Tab chips: Popular | School | Recommended (horizontal scroll, cut-off at edge to hint scrolling) */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
            สำรวจหมวดหมู่ยอดฮิต
          </span>
          <Link href="/community" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-pink-hot)', textDecoration: 'none' }}>
            ดูทั้งหมด →
          </Link>
        </div>
        <TabChips
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* 5. Below: Pastel-colored cards (Yellow & Mint Green) with greeting-style text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {/* Pale Yellow Greeting Card */}
        <div
          style={{
            backgroundColor: 'var(--badge-yellow)',
            borderRadius: 'var(--radius-card)',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid rgba(255, 243, 184, 0.85)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--badge-yellow-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              flexShrink: 0,
              fontSize: '18px',
            }}>
              ☀️
            </div>
            <div>
              <h3 style={{
                fontSize: '15px',
                fontWeight: '800',
                color: 'var(--badge-yellow-text)',
                marginBottom: '4px',
              }}>
                สวัสดีตอนเช้า! มีไอเดียช่อดอกไม้ใหม่หรือยัง?
              </h3>
              <p style={{ fontSize: '12px', color: '#6A5610', lineHeight: '1.45', margin: 0 }}>
                สำรวจดอกไม้คอลเลกชันใหม่ หรือสแกนรับฟีดแบ็กกิจกรรมของคุณได้ในคลิกเดียว
              </p>
            </div>
          </div>
        </div>

        {/* Mint Green Greeting Card */}
        <div
          style={{
            backgroundColor: 'var(--badge-mint)',
            borderRadius: 'var(--radius-card)',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid rgba(213, 240, 208, 0.85)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--badge-mint-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              flexShrink: 0,
              fontSize: '18px',
            }}>
              🌿
            </div>
            <div>
              <h3 style={{
                fontSize: '15px',
                fontWeight: '800',
                color: 'var(--badge-mint-text)',
                marginBottom: '4px',
              }}>
                Event Feedback Intelligence พร้อมใช้งาน
              </h3>
              <p style={{ fontSize: '12px', color: '#1B541A', lineHeight: '1.45', margin: 0 }}>
                AI พร้อมช่วยคุณสร้างคำถามแบบประเมินและสรุป Keep / Improve / Fix ให้อัตโนมัติ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        marginBottom: '20px',
      }}>
        <Link href="/builder" style={{ textDecoration: 'none' }}>
          <div className="surface-card" style={{
            padding: '16px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>💐</div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>Bouquet Builder</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>จัดช่อดอกไม้ 3 คอลัมน์</div>
          </div>
        </Link>

        <Link href="/community" style={{ textDecoration: 'none' }}>
          <div className="surface-card" style={{
            padding: '16px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>🌟</div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>Community</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>แกลเลอรีผลงานยอดนิยม</div>
          </div>
        </Link>
      </div>

      {/* Bottom Main Action Button */}
      <div style={{ textAlign: 'center' }}>
        <Link href="/auth" style={{ textDecoration: 'none' }}>
          <button className="btn-cta" style={{ width: '100%', fontSize: '15px', padding: '16px' }}>
            <Sparkles size={18} strokeWidth={2} />
            <span>เข้าสู่ระบบแดชบอร์ด / สร้างแบบประเมิน</span>
            <ArrowRight size={18} strokeWidth={2.2} />
          </button>
        </Link>
      </div>
    </div>
  );
}