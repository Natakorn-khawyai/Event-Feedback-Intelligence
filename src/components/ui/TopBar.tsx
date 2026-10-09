'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Mic, Search, ChevronLeft, SlidersHorizontal } from 'lucide-react';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  onBack?: () => void;
  showSearch?: boolean;
  showMic?: boolean;
  showFilter?: boolean;
  onSearchClick?: () => void;
  onMicClick?: () => void;
  onFilterClick?: () => void;
  rightAction?: React.ReactNode;
}

export default function TopBar({
  title = 'Feedback Intelligence',
  showBack = false,
  backHref,
  onBack,
  showSearch = true,
  showMic = true,
  showFilter = false,
  onSearchClick,
  onMicClick,
  onFilterClick,
  rightAction,
}: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 4px 16px 4px',
      marginBottom: '12px',
      position: 'relative',
    }}>
      {/* Left: Back or Menu */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {showBack ? (
          <button
            type="button"
            onClick={handleBack}
            aria-label="ย้อนกลับ"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid var(--border-glass)',
              background: 'var(--surface-white)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.15s ease-out',
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
        ) : (
          <button
            type="button"
            aria-label="เปิดเมนู"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid var(--border-glass)',
              background: 'var(--surface-white)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.15s ease-out',
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Center: Title / Logo */}
      <div style={{
        textAlign: 'center',
        fontSize: '17px',
        fontWeight: '700',
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em',
        maxWidth: '200px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          {title}
        </Link>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {rightAction ? (
          rightAction
        ) : (
          <>
            {showMic && (
              <button
                type="button"
                onClick={onMicClick}
                aria-label="ค้นหาด้วยเสียง"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--surface-white)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease-out',
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Mic size={18} strokeWidth={1.5} />
              </button>
            )}

            {showSearch && (
              <button
                type="button"
                onClick={onSearchClick}
                aria-label="ค้นหา"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--surface-white)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease-out',
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            )}

            {showFilter && (
              <button
                type="button"
                onClick={onFilterClick}
                aria-label="ตัวกรอง"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--surface-white)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease-out',
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <SlidersHorizontal size={18} strokeWidth={1.5} />
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
}
