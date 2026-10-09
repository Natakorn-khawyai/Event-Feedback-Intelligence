'use client';

import React, { useState } from 'react';
import { Heart, Plus, Minus, Trash2 } from 'lucide-react';

interface ItemCardProps {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  initialQuantity?: number;
  onQuantityChange?: (qty: number) => void;
  onDelete?: () => void;
  isLiked?: boolean;
  onToggleLike?: (liked: boolean) => void;
  showStepper?: boolean;
}

export default function ItemCard({
  id,
  title,
  subtitle,
  badge,
  badgeColor = 'var(--badge-mint)',
  initialQuantity = 1,
  onQuantityChange,
  onDelete,
  isLiked = false,
  onToggleLike,
  showStepper = true,
}: ItemCardProps) {
  const [qty, setQty] = useState(initialQuantity);
  const [liked, setLiked] = useState(isLiked);
  const [likePopping, setLikePopping] = useState(false);

  const handleHeartClick = () => {
    const next = !liked;
    setLiked(next);
    setLikePopping(true);
    setTimeout(() => setLikePopping(false), 250);
    if (onToggleLike) onToggleLike(next);
  };

  const handleMinus = () => {
    if (qty > 1) {
      const next = qty - 1;
      setQty(next);
      if (onQuantityChange) onQuantityChange(next);
    } else if (onDelete) {
      onDelete();
    }
  };

  const handlePlus = () => {
    const next = qty + 1;
    setQty(next);
    if (onQuantityChange) onQuantityChange(next);
  };

  return (
    <div
      className="surface-card fade-up"
      style={{
        padding: '16px',
        borderRadius: 'var(--radius-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        gap: '12px',
      }}
    >
      {/* Top row: badge + heart toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {badge ? (
          <span style={{
            backgroundColor: badgeColor,
            color: 'var(--text-primary)',
            borderRadius: '999px',
            padding: '3px 10px',
            fontSize: '11px',
            fontWeight: '700',
          }}>
            {badge}
          </span>
        ) : <div />}

        <button
          type="button"
          onClick={handleHeartClick}
          aria-label="ถูกใจ"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: liked ? 'var(--accent-pink-hot)' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: likePopping ? 'scale(1.25)' : 'scale(1)',
            transition: 'transform 0.15s ease',
          }}
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            fill={liked ? 'var(--accent-pink-hot)' : 'none'}
          />
        </button>
      </div>

      {/* Title & subtitle */}
      <div>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '4px',
          lineHeight: '1.3',
        }}>
          {title}
        </h4>
        {subtitle && (
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom controls: Stepper or delete */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        {showStepper ? (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(31, 31, 46, 0.04)',
            borderRadius: '999px',
            padding: '3px 6px',
          }}>
            <button
              type="button"
              onClick={handleMinus}
              aria-label="ลดจำนวน"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: 'none',
                background: '#FFFFFF',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              {qty === 1 && onDelete ? <Trash2 size={12} color="var(--danger)" /> : <Minus size={12} />}
            </button>
            <span style={{ fontSize: '13px', fontWeight: '700', minWidth: '16px', textAlign: 'center' }}>
              {qty}
            </span>
            <button
              type="button"
              onClick={handlePlus}
              aria-label="เพิ่มจำนวน"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: 'none',
                background: 'var(--accent-pink-hot)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(232,70,124,0.3)',
              }}
            >
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <div />
        )}

        {onDelete && !showStepper && (
          <button
            type="button"
            onClick={onDelete}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--danger)',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Trash2 size={14} /> ลบ
          </button>
        )}
      </div>
    </div>
  );
}
