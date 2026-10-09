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
  ArrowRight,
  QrCode,
  BarChart3,
  Users,
  Flower2
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

  const tabs = ['Popular', 'School', 'Recommended', 'Event Insight', 'สัมมนา', 'กีฬา'];

  return (
    <div className="fade-up" style={{ paddingBottom: '40px' }}>
      {/* Category Row: 4 circular pink buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        padding: '8px 12px 24px 12px',
      }}>
        {categories.map((cat) => (
          <IconButton
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            href={cat.href}
            isActive={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
            size={60}
          />
        ))}
      </div>

      {/* Hero Card: Responsive Desktop Banner */}
      <div style={{ marginBottom: '28px' }}>
        <HeroCard
          titlePrefix="Make your own →"
          highlightText="bouquet"
          titleSuffix="!"
          description="ออกแบบช่อดอกไม้ในสไตล์ของคุณ หรือสร้างแบบประเมินความพึงพอใจอัจฉริยะที่วิเคราะห์ผลลัพธ์ด้วย AI สรุป Keep / Improve / Fix ให้อัตโนมัติในคลิกเดียว"
          ctaText="จัดช่อดอกไม้ของคุณ"
          ctaHref="/builder"
          previewPill={{
            items: [
              { icon: <span>🌸</span>, text: 'Flower' },
              { icon: <span>🍃</span>, text: 'Leaf' },
              { icon: <span>🎀</span>, text: 'Ribbon' },
              { icon: <Sparkles size={14} />, text: 'AI Feedback' },
            ]
          }}
        />
      </div>

      {/* Tab chips: Horizontal scroll with snap */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            สำรวจหมวดหมู่ยอดนิยม
          </h3>
          <Link href="/community" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-pink-hot)', textDecoration: 'none' }}>
            ดูชุมชนทั้งหมด →
          </Link>
        </div>
        <TabChips
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* 2-Column Responsive Grid on Desktop: Greeting & Feature Cards */}
      <div className="desktop-grid-2" style={{ marginBottom: '28px' }}>
        {/* Pale Yellow Card */}
        <div
          style={{
            backgroundColor: 'var(--badge-yellow)',
            borderRadius: 'var(--radius-card)',
            padding: '24px 28px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid rgba(255, 243, 184, 0.85)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--badge-yellow-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              flexShrink: 0,
              fontSize: '22px',
            }}>
              ☀️
            </div>
            <div>
              <h3 style={{
                fontSize: '17px',
                fontWeight: '800',
                color: 'var(--badge-yellow-text)',
                marginBottom: '6px',
              }}>
                สวัสดีตอนเช้า! มีไอเดียช่อดอกไม้ใหม่หรือยัง?
              </h3>
              <p style={{ fontSize: '13px', color: '#6A5610', lineHeight: '1.5', margin: 0 }}>
                สำรวจดอกไม้คอลเลกชันใหม่ หรือสแกนรับฟีดแบ็กกิจกรรมของคุณได้ในคลิกเดียว พร้อมเทคโนโลยี QR Code 1 เครื่องต่อ 1 สิทธิ์
              </p>
            </div>
          </div>
        </div>

        {/* Mint Green Card */}
        <div
          style={{
            backgroundColor: 'var(--badge-mint)',
            borderRadius: 'var(--radius-card)',
            padding: '24px 28px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid rgba(213, 240, 208, 0.85)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--badge-mint-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              flexShrink: 0,
              fontSize: '22px',
            }}>
              🌿
            </div>
            <div>
              <h3 style={{
                fontSize: '17px',
                fontWeight: '800',
                color: 'var(--badge-mint-text)',
                marginBottom: '6px',
              }}>
                Event Feedback Intelligence พร้อมทำงาน
              </h3>
              <p style={{ fontSize: '13px', color: '#1B541A', lineHeight: '1.5', margin: 0 }}>
                AI ช่วยคุณสร้างชุดคำถามแบบประเมินอัตโนมัติ และประมวลผลข้อเสนอแนะนับร้อยเป็น Keep / Improve / Fix อย่างแม่นยำ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Showcase Cards: 3 Columns on Desktop */}
      <div className="desktop-grid-3" style={{ marginBottom: '32px' }}>
        <Link href="/create" style={{ textDecoration: 'none' }}>
          <div className="surface-card" style={{
            padding: '24px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>✨</div>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>สร้างแบบประเมิน AI</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>ป้อนชื่ออีเวนต์ แล้วให้ AI ออกแบบคำถามทันที</p>
          </div>
        </Link>

        <Link href="/builder" style={{ textDecoration: 'none' }}>
          <div className="surface-card" style={{
            padding: '24px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>💐</div>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>Bouquet Builder</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>จัดช่อดอกไม้แบบคัสตอมพร้อม Stepper และสี</p>
          </div>
        </Link>

        <Link href="/community" style={{ textDecoration: 'none' }}>
          <div className="surface-card" style={{
            padding: '24px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌟</div>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>Community Gallery</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>ดูผลงานจากผู้สร้างยอดนิยมและแลกเปลี่ยนฟีดแบ็ก</p>
          </div>
        </Link>
      </div>

      {/* Bottom Main Action Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <button className="btn-cta" style={{ fontSize: '15px', padding: '16px 36px' }}>
            <Sparkles size={18} strokeWidth={2} />
            <span>เข้าสู่หน้าแดชบอร์ดจัดการงาน</span>
            <ArrowRight size={18} strokeWidth={2.2} />
          </button>
        </Link>

        <Link href="/create" style={{ textDecoration: 'none' }}>
          <button className="btn-secondary" style={{ fontSize: '15px', padding: '16px 32px' }}>
            <span>+ สร้างแบบประเมินใหม่</span>
          </button>
        </Link>
      </div>
    </div>
  );
}