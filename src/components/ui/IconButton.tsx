'use client';

import React from 'react';
import Link from 'next/link';

interface IconButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
  isActive?: boolean;
  size?: number; // default 56
  color?: string; // default pastel pink
  activeColor?: string;
  ariaLabel?: string;
}

export default function IconButton({
  icon,
  label,
  onClick,
  href,
  isActive = false,
  size = 56,
  color = 'var(--accent-pink-pastel)',
  activeColor = 'var(--accent-pink-hot)',
  ariaLabel,
}: IconButtonProps) {
  const content = (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel || label || 'Icon button'}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          border: 'none',
          backgroundColor: isActive ? activeColor : color,
          color: isActive ? '#FFFFFF' : 'var(--accent-pink-hot)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isActive ? 'var(--shadow-pill)' : '0 4px 12px rgba(255, 209, 227, 0.45)',
          transition: 'all 0.15s ease-out',
          outline: 'none',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.92)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {icon}
      </button>
      {label && (
        <span style={{
          fontSize: '12px',
          fontWeight: isActive ? '700' : '500',
          color: isActive ? 'var(--accent-pink-hot)' : 'var(--text-secondary)',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          maxWidth: '68px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {label}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}
