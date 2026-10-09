'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroCardProps {
  titlePrefix?: string;
  highlightText: string;
  titleSuffix?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  previewPill?: {
    items: { icon?: React.ReactNode; text: string }[];
  };
  onClickCta?: () => void;
}

export default function HeroCard({
  titlePrefix = 'Make your own',
  highlightText = 'Insight',
  titleSuffix = '!',
  description,
  ctaText = 'เริ่มต้นใช้งาน',
  ctaHref,
  previewPill,
  onClickCta,
}: HeroCardProps) {
  return (
    <div className="hero-glass-card" style={{ marginBottom: '24px' }}>
      {/* Decorative Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          background: 'rgba(255, 255, 255, 0.75)',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: '700',
          color: 'var(--accent-pink-hot)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(8px)',
        }}>
          <Sparkles size={13} strokeWidth={2} /> AI Powered
        </span>
      </div>

      {/* Main Headline */}
      <h2 style={{
        fontSize: '24px',
        fontWeight: '800',
        lineHeight: '1.25',
        color: 'var(--text-primary)',
        marginBottom: '10px',
      }}>
        {titlePrefix}{' '}
        <span className="highlight-stroke">{highlightText}</span>
        {titleSuffix}
      </h2>

      {description && (
        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: '1.5',
          marginBottom: '16px',
        }}>
          {description}
        </p>
      )}

      {/* Inner White Pill Preview */}
      {previewPill && previewPill.items.length > 0 && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '999px',
          padding: '8px 14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
          marginBottom: '18px',
          maxWidth: '100%',
          overflowX: 'auto',
          backdropFilter: 'blur(10px)',
        }}>
          {previewPill.items.map((item, index) => (
            <React.Fragment key={index}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>
                {item.icon && <span style={{ color: 'var(--accent-pink-hot)', display: 'flex' }}>{item.icon}</span>}
                <span>{item.text}</span>
              </div>
              {index < previewPill.items.length - 1 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* CTA Button */}
      {ctaHref ? (
        <div>
          <Link href={ctaHref} className="btn-cta" style={{ textDecoration: 'none' }}>
            <span>{ctaText}</span>
            <ArrowRight size={16} strokeWidth={2.2} />
          </Link>
        </div>
      ) : onClickCta ? (
        <div>
          <button type="button" onClick={onClickCta} className="btn-cta">
            <span>{ctaText}</span>
            <ArrowRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
