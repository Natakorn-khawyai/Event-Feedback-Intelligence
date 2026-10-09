'use client';

import React, { useState } from 'react';
import { Heart, Plus, Minus, Trash2 } from 'lucide-react';

interface ItemCardProps {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageEmoji?: string;
  badge?: string;
  badgeColor?: string;
  initialQuantity?: number;
  quantity?: number;
  isSelected?: boolean;
  onQuantityChange?: (qty: number) => void;
  onAdd?: () => void;
  onDelete?: () => void;
  isLiked?: boolean;
  onToggleLike?: (liked: boolean) => void;
  showStepper?: boolean;
  compact?: boolean;
}

export default function ItemCard({
  id,
  title,
  subtitle,
  imageUrl,
  imageEmoji,
  badge,
  badgeColor = 'var(--badge-mint)',
  initialQuantity = 1,
  quantity,
  isSelected = false,
  onQuantityChange,
  onAdd,
  onDelete,
  isLiked = false,
  onToggleLike,
  showStepper = true,
  compact = false,
}: ItemCardProps) {
  const [internalQty, setInternalQty] = useState(initialQuantity);
  const [liked, setLiked] = useState(isLiked);
  const [likePopping, setLikePopping] = useState(false);
  const [selected, setSelected] = useState(isSelected);

  const currentQty = quantity !== undefined ? quantity : internalQty;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !liked;
    setLiked(next);
    setLikePopping(true);
    setTimeout(() => setLikePopping(false), 250);
    if (onToggleLike) onToggleLike(next);
  };

  const handleMinus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentQty > 1) {
      const next = currentQty - 1;
      setInternalQty(next);
      if (onQuantityChange) onQuantityChange(next);
    } else {
      setSelected(false);
      setInternalQty(0);
      if (onQuantityChange) onQuantityChange(0);
      if (onDelete) onDelete();
    }
  };

  const handlePlus = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = currentQty + 1;
    setInternalQty(next);
    if (onQuantityChange) onQuantityChange(next);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(true);
    const next = currentQty > 0 ? currentQty : 1;
    setInternalQty(next);
    if (onQuantityChange) onQuantityChange(next);
    if (onAdd) onAdd();
  };

  const isItemActive = isSelected || selected || currentQty > 0;

  return (
    <div
      className="surface-card fade-up"
      style={{
        padding: compact ? '10px' : '14px',
        borderRadius: compact ? '20px' : 'var(--radius-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        gap: '8px',
        border: isItemActive ? '1.5px solid var(--accent-pink-hot)' : '1px solid var(--border-glass)',
        boxShadow: isItemActive ? '0 6px 20px rgba(232, 70, 124, 0.12)' : 'var(--shadow-soft)',
        transition: 'all 0.15s ease-out',
      }}
    >
      {/* Top row: badge + heart toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
        {badge ? (
          <span style={{
            backgroundColor: badgeColor,
            color: 'var(--text-primary)',
            borderRadius: '999px',
            padding: '2px 8px',
            fontSize: '10px',
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
            background: 'rgba(255, 255, 255, 0.85)',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: '5px',
            color: liked ? 'var(--accent-pink-hot)' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: likePopping ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.15s ease',
            boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
            marginLeft: 'auto',
          }}
        >
          <Heart
            size={compact ? 15 : 18}
            strokeWidth={1.5}
            fill={liked ? 'var(--accent-pink-hot)' : 'none'}
          />
        </button>
      </div>

      {/* Visual / Image container */}
      <div style={{
        height: compact ? '72px' : '90px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(255, 209, 227, 0.4) 0%, rgba(230, 220, 250, 0.4) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: compact ? '32px' : '42px', userSelect: 'none' }}>
            {imageEmoji || '🌸'}
          </span>
        )}
      </div>

      {/* Item Name Below */}
      <div style={{ textAlign: compact ? 'center' : 'left' }}>
        <h4 style={{
          fontSize: compact ? '12px' : '14px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          margin: 0,
          lineHeight: '1.25',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: compact ? 'nowrap' : 'normal',
        }}>
          {title}
        </h4>
        {subtitle && (
          <p style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            margin: '2px 0 0 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom controls: "+" add button bottom, or quantity stepper (− 1 +) when selected */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2px',
      }}>
        {isItemActive && showStepper ? (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            background: 'rgba(255, 209, 227, 0.35)',
            border: '1px solid rgba(232, 70, 124, 0.3)',
            borderRadius: '999px',
            padding: '2px 6px',
            width: '100%',
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
              {currentQty === 1 ? <Trash2 size={12} color="var(--danger)" /> : <Minus size={12} strokeWidth={2.2} />}
            </button>
            <span style={{ fontSize: '13px', fontWeight: '800', minWidth: '16px', textAlign: 'center', color: 'var(--accent-pink-hot)' }}>
              {currentQty}
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
              <Plus size={12} strokeWidth={2.2} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddClick}
            aria-label={`เพิ่ม ${title}`}
            style={{
              width: '100%',
              padding: '6px 12px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: 'var(--accent-pink-pastel)',
              color: 'var(--accent-pink-hot)',
              fontWeight: '700',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Plus size={14} strokeWidth={2.5} />
            <span>เพิ่ม</span>
          </button>
        )}
      </div>
    </div>
  );
}
