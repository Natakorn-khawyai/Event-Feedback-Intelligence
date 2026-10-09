'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Calendar, ArrowUpRight } from 'lucide-react';

interface PhotoCardProps {
  id: string;
  title: string;
  authorName?: string;
  date?: string;
  responseCount?: number;
  likeCount?: number;
  accentColor?: string;
  href?: string;
  badge?: string;
  badgeColor?: string;
}

export default function PhotoCard({
  id,
  title,
  authorName = 'Organizer',
  date,
  responseCount = 0,
  accentColor = '#FFD1E3',
  href,
  badge,
  badgeColor = 'var(--badge-mint)',
}: PhotoCardProps) {

  const cardContent = (
    <div
      className="surface-card fade-up"
      style={{
        padding: '0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Decorative Top Banner */}
      <div style={{
        height: '90px',
        background: `linear-gradient(135deg, ${accentColor} 0%, #FFFFFF 100%)`,
        position: 'relative',
        padding: '12px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>


        {/* Author Avatar overlapping bottom-left */}
        <div style={{
          position: 'absolute',
          bottom: '-16px',
          left: '16px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          border: '2.5px solid #FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '800',
          fontSize: '14px',
          color: 'var(--accent-pink-hot)',
          boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
          background: 'linear-gradient(135deg, #FFE2EE 0%, #E6DCFA 100%)',
        }}>
          {authorName.substring(0, 1).toUpperCase()}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '22px 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>
          By {authorName}
        </div>

        <h3 style={{
          fontSize: '15px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          lineHeight: '1.35',
          margin: '0',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {title}
        </h3>

        {date && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <Calendar size={12} strokeWidth={1.5} />
            <span>{date}</span>
          </div>
        )}

        {/* Metadata Footer: responses */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '6px',
          paddingTop: '8px',
          borderTop: '1px solid rgba(31, 31, 46, 0.05)',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={13} strokeWidth={1.8} color="var(--accent-pink-hot)" />
            <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{responseCount} ฟีดแบ็ก</span>
          </div>

          <div style={{ color: 'var(--accent-pink-hot)', display: 'flex', alignItems: 'center' }}>
            <ArrowUpRight size={16} strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
