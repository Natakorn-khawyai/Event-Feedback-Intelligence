'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface ColorOption {
  id: string;
  label: string;
  color: string;
}

interface ColorSwatchProps {
  colors: ColorOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  showAllOption?: boolean;
}

export default function ColorSwatch({
  colors,
  selectedId,
  onSelect,
  showAllOption = true,
}: ColorSwatchProps) {
  return (
    <div className="scroll-snap-x" style={{ alignItems: 'center', padding: '4px 0', marginBottom: '16px' }}>
      {showAllOption && (
        <button
          type="button"
          onClick={() => onSelect('all')}
          className="scroll-snap-item"
          style={{
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            border: selectedId === 'all' ? '1.5px solid var(--accent-pink-hot)' : '1px solid var(--border-glass)',
            backgroundColor: selectedId === 'all' ? 'var(--accent-pink-hot)' : 'var(--surface-white)',
            color: selectedId === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
            fontWeight: '600',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            transition: 'all 0.15s ease',
            height: '34px',
          }}
        >
          ทั้งหมด
        </button>
      )}

      {colors.map((c) => {
        const isSelected = selectedId === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            title={c.label}
            aria-label={c.label}
            className="scroll-snap-item"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: c.color,
              border: isSelected ? '2.5px solid #FFFFFF' : '2px solid rgba(255, 255, 255, 0.7)',
              boxShadow: isSelected
                ? `0 0 0 2px var(--accent-pink-hot), 0 3px 8px rgba(0,0,0,0.12)`
                : '0 2px 6px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease-out',
              outline: 'none',
              transform: isSelected ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
          </button>
        );
      })}
    </div>
  );
}
