'use client';

import React from 'react';

interface CategoryPillProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  count?: number;
}

export default function CategoryPill({
  label,
  icon,
  isActive = false,
  onClick,
  count,
}: CategoryPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 18px',
        borderRadius: 'var(--radius-full)',
        border: isActive ? '1px solid var(--accent-pink-hot)' : '1px solid var(--border-glass)',
        background: isActive ? 'var(--accent-pink-hot)' : 'var(--surface-white)',
        color: isActive ? '#FFFFFF' : 'var(--text-primary)',
        fontWeight: '600',
        fontSize: '13px',
        cursor: 'pointer',
        boxShadow: isActive ? 'var(--shadow-pill)' : '0 2px 8px rgba(0,0,0,0.03)',
        transition: 'all 0.15s ease-out',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        whiteSpace: 'nowrap',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.96)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span style={{
          backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'var(--badge-pink)',
          color: isActive ? '#FFFFFF' : 'var(--badge-pink-text)',
          borderRadius: '999px',
          padding: '2px 7px',
          fontSize: '11px',
          fontWeight: '700',
          marginLeft: '2px',
        }}>
          {count}
        </span>
      )}
    </button>
  );
}
