'use client';

import React from 'react';

interface Avatar {
  name: string;
  avatarUrl?: string;
  bg?: string;
}

interface AvatarStackProps {
  avatars?: Avatar[];
  limit?: number;
  size?: number;
  totalCount?: number;
}

const defaultAvatars: Avatar[] = [
  { name: 'Nat', bg: '#FFD1E3' },
  { name: 'Fern', bg: '#E6DCFA' },
  { name: 'Kao', bg: '#D5F0D0' },
  { name: 'Mew', bg: '#FFF3B8' },
];

export default function AvatarStack({
  avatars = defaultAvatars,
  limit = 3,
  size = 28,
  totalCount,
}: AvatarStackProps) {
  const visible = avatars.slice(0, limit);
  const remaining = totalCount ? totalCount - limit : Math.max(0, avatars.length - limit);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      {visible.map((av, idx) => (
        <div
          key={idx}
          title={av.name}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: av.bg || '#FFD1E3',
            border: '2px solid #FFFFFF',
            marginLeft: idx === 0 ? 0 : `-${Math.round(size * 0.35)}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${Math.round(size * 0.38)}px`,
            fontWeight: '700',
            color: 'var(--text-primary)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
            position: 'relative',
            zIndex: limit - idx,
            overflow: 'hidden',
          }}
        >
          {av.avatarUrl ? (
            <img src={av.avatarUrl} alt={av.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            av.name.substring(0, 1).toUpperCase()
          )}
        </div>
      ))}

      {remaining > 0 && (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: '#F3D9F5',
            border: '2px solid #FFFFFF',
            marginLeft: `-${Math.round(size * 0.35)}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${Math.round(size * 0.35)}px`,
            fontWeight: '700',
            color: 'var(--accent-pink-hot)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
            position: 'relative',
            zIndex: 0,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
