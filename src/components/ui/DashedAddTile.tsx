'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface DashedAddTileProps {
  label: string;
  sublabel?: string;
  onClick?: () => void;
  href?: string;
  minHeight?: number;
}

export default function DashedAddTile({
  label,
  sublabel,
  onClick,
  href,
  minHeight = 120,
}: DashedAddTileProps) {
  const content = (
    <div
      className="dashed-add-slot"
      style={{
        height: '100%',
        minHeight: `${minHeight}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '24px',
        textAlign: 'center',
      }}
      onClick={onClick}
    >
      <div style={{
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent-pink-pastel)',
        color: 'var(--accent-pink-hot)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(255, 209, 227, 0.5)',
      }}>
        <Plus size={24} strokeWidth={2.4} />
      </div>
      <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{label}</span>
      {sublabel && (
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sublabel}</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {content}
      </Link>
    );
  }

  return content;
}
