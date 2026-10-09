'use client';

import React, { useState } from 'react';
import TopBar from '@/components/ui/TopBar';
import AvatarStack from '@/components/ui/AvatarStack';
import PhotoCard from '@/components/ui/PhotoCard';
import TabChips from '@/components/ui/TabChips';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('ยอดนิยม');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const topUsers = [
    { name: 'Aom', bg: '#FFD1E3' },
    { name: 'Belle', bg: '#E6DCFA' },
    { name: 'Chai', bg: '#D5F0D0' },
    { name: 'Dew', bg: '#FFF3B8' },
    { name: 'Eve', bg: '#DFF1F5' },
  ];

  const communityPosts = [
    {
      id: 'c1',
      title: 'งานสัมมนา EdTech Thailand 2026',
      authorName: 'Aom Am',
      date: '8 ต.ค.',
      responseCount: 42,
      likeCount: 88,
      accentColor: '#FFD1E3',
      badge: 'แนะนำ',
      badgeColor: 'var(--badge-mint)',
    },
    {
      id: 'c2',
      title: 'ช่อดอกไม้วาเลนไทน์ Pastel Rose Bouquet',
      authorName: 'Belle Flora',
      date: '7 ต.ค.',
      responseCount: 29,
      likeCount: 142,
      accentColor: '#E6DCFA',
      badge: 'ดีไซน์เด่น',
      badgeColor: 'var(--badge-yellow)',
    },
    {
      id: 'c3',
      title: 'Music In The Park คอนเสิร์ตในสวน',
      authorName: 'Dew Sound',
      date: '6 ต.ค.',
      responseCount: 65,
      likeCount: 73,
      accentColor: '#FFF3B8',
      badge: 'ยอดฮิต',
      badgeColor: 'var(--badge-pink)',
    },
    {
      id: 'c4',
      title: 'Tulip & Daisy Bouquet สำหรับวันรับปริญญา',
      authorName: 'Kao Designer',
      date: '5 ต.ค.',
      responseCount: 18,
      likeCount: 95,
      accentColor: '#D5F0D0',
      badge: 'ใหม่',
      badgeColor: 'var(--badge-mint)',
    },
    {
      id: 'c5',
      title: 'วิ่งเพื่อสุขภาพ Green Mini Marathon',
      authorName: 'Runner Coach',
      date: '4 ต.ค.',
      responseCount: 110,
      likeCount: 120,
      accentColor: '#DFF1F5',
      badge: 'สัมมนา',
      badgeColor: 'var(--badge-yellow)',
    },
    {
      id: 'c6',
      title: 'Modern Blue Horizon Bouquet',
      authorName: 'Fern Art',
      date: '3 ต.ค.',
      responseCount: 34,
      likeCount: 81,
      accentColor: '#FFE2EE',
      badge: 'ยอดนิยม',
      badgeColor: 'var(--badge-pink)',
    },
  ];

  return (
    <div className="fade-up" style={{ paddingBottom: '40px' }}>
      {/* Header: back arrow, "Community" title, filter + search icons */}
      <TopBar
        title="Community"
        showBack={true}
        backHref="/"
        showSearch={true}
        showFilter={true}
        showMic={false}
        onFilterClick={() => setIsFilterActive(!isFilterActive)}
      />

      {/* "Top users →" pink pill banner with overlapping circular avatars */}
      <div style={{
        background: 'var(--badge-pink)',
        border: '1px solid rgba(232, 70, 124, 0.25)',
        borderRadius: 'var(--radius-full)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        boxShadow: '0 2px 10px rgba(232, 70, 124, 0.08)',
        cursor: 'pointer',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AvatarStack avatars={topUsers} limit={3} totalCount={topUsers.length} size={28} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-pink-hot)' }}>
            Top users
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '12px',
          fontWeight: '700',
          color: 'var(--accent-pink-hot)',
          backgroundColor: '#FFFFFF',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <span>ดูผู้สร้างยอดนิยม</span>
          <ArrowRight size={13} strokeWidth={2.5} />
        </div>
      </div>

      {/* Tab Filter Chips */}
      <TabChips
        tabs={['ยอดนิยม', 'ผลงานใหม่', 'จัดช่อดอกไม้', 'งานสัมมนา']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* 2-Column Masonry Grid of Photo Cards (rounded 16px) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        marginTop: '8px',
      }}>
        {communityPosts.map((post) => (
          <PhotoCard
            key={post.id}
            id={post.id}
            title={post.title}
            authorName={post.authorName}
            date={post.date}
            responseCount={post.responseCount}
            likeCount={post.likeCount}
            accentColor={post.accentColor}
            badge={post.badge}
            badgeColor={post.badgeColor}
          />
        ))}
      </div>
    </div>
  );
}
