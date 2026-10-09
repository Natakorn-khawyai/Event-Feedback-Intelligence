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
      style={{ minHeight: `${minHeight}px` }}
      onClick={onClick}
    >
      <div style={{
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent-pink-pastel)',
        color: 'var(--accent-pink-hot)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(255, 209, 227, 0.5)',
      }}>
        <Plus size={22} strokeWidth={2.2} />
      </div>
      <span style={{ fontSize: '14px', fontWeight: '700', marginTop: '2px' }}>{label}</span>
      {sublabel && (
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sublabel}</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
        {content}
      </Link>
    );
  }

  return content;
}
