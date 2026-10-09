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
  CheckCircle2, 
  ArrowRight,
  Smile
} from 'lucide-react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('ยอดนิยม');

  const categories = [
    { id: 'all', label: 'ทั้งหมด', icon: <Layers size={22} strokeWidth={1.5} /> },
    { id: 'date', label: 'สัมมนา', icon: <Calendar size={22} strokeWidth={1.5} /> },
    { id: 'gift', label: 'เทศกาล', icon: <Gift size={22} strokeWidth={1.5} /> },
    { id: 'vr', label: 'อีเวนต์ VR', icon: <Glasses size={22} strokeWidth={1.5} /> },
  ];

  const tabs = ['ยอดนิยม', 'สัมมนาวิชาการ', 'งานกีฬา & วิ่ง', 'แนะนำโดย AI'];

  return (
    <div className="fade-up">
      {/* Top Bar with hamburger, mic, and search */}
      <TopBar 
        title="Event Insight" 
        showBack={false}
        showSearch={true}
        showMic={true}
      />

      {/* Category Row: 4 circular pink 56px buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px 20px 10px',
      }}>
        {categories.map((cat) => (
          <IconButton
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            isActive={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </div>

      {/* Hero Card */}
      <HeroCard
        titlePrefix="เปลี่ยน Feedback ธรรมดา"
        highlightText="ให้เป็น Insight"
        titleSuffix="!"
        description="รับฟังเสียงจริงจากผู้ร่วมงาน แล้วให้ AI ช่วยสรุปความพึงพอใจและวางแผนพัฒนาอย่างตรงจุด"
        ctaText="เริ่มต้นสร้างแบบประเมิน"
        ctaHref="/auth"
        previewPill={{
          items: [
            { icon: <Sparkles size={14} />, text: 'AI Gen คำถาม' },
            { icon: <QrCode size={14} />, text: 'สแกน QR Code' },
            { icon: <BarChart3 size={14} />, text: 'กราฟสรุปผล' },
          ]
        }}
      />

      {/* Tab Chips with horizontal scroll and snap */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
            หมวดหมู่ฟีดแบ็กยอดนิยม
          </span>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent-pink-hot)', cursor: 'pointer' }}>
            ดูทั้งหมด →
          </span>
        </div>
        <TabChips
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Below: Pastel-colored cards (Yellow & Mint Green) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
        {/* Pale Yellow Card */}
        <div
          style={{
            backgroundColor: 'var(--badge-yellow)',
            borderRadius: 'var(--radius-card)',
            padding: '20px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid rgba(255, 243, 184, 0.8)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--badge-yellow-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              flexShrink: 0,
            }}>
              <QrCode size={18} strokeWidth={2} />
            </div>
            <div>
              <h3 style={{
                fontSize: '15px',
                fontWeight: '700',
                color: 'var(--badge-yellow-text)',
                marginBottom: '4px',
              }}>
                สแกนง่าย 1 ครั้งต่ออุปกรณ์
              </h3>
              <p style={{ fontSize: '12px', color: '#6A5610', lineHeight: '1.45' }}>
                ผู้ร่วมงานแค่ยกกล้องสแกน ตอบคะแนน 1-5 และพิมพ์ความรู้สึกได้ทันที ระบบป้องกันการทำซ้ำอัตโนมัติ
              </p>
            </div>
          </div>
        </div>

        {/* Mint Green Card */}
        <div
          style={{
            backgroundColor: 'var(--badge-mint)',
            borderRadius: 'var(--radius-card)',
            padding: '20px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid rgba(213, 240, 208, 0.8)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--badge-mint-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              flexShrink: 0,
            }}>
              <Smile size={18} strokeWidth={2} />
            </div>
            <div>
              <h3 style={{
                fontSize: '15px',
                fontWeight: '700',
                color: 'var(--badge-mint-text)',
                marginBottom: '4px',
              }}>
                AI จำแนก Keep / Improve / Fix
              </h3>
              <p style={{ fontSize: '12px', color: '#1B541A', lineHeight: '1.45' }}>
                ไม่ต้องนั่งอ่านคอมเมนต์นับร้อยข้อความ ปัญญาประดิษฐ์จะสรุปสิ่งที่ดีและสิ่งที่ต้องรีบปรับปรุงให้คุณ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating/Primary CTA */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link href="/auth" style={{ textDecoration: 'none' }}>
          <button className="btn-cta" style={{ width: '100%', fontSize: '16px', padding: '16px' }}>
            <span>เข้าสู่ระบบเพื่อเริ่มสร้างงาน</span>
            <ArrowRight size={18} strokeWidth={2.2} />
          </button>
        </Link>
      </div>
    </div>
  );
}