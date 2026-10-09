'use client';

import React from 'react';

interface TabChipsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabChips({
  tabs,
  activeTab,
  onTabChange,
}: TabChipsProps) {
  return (
    <div className="scroll-snap-x" style={{ marginBottom: '18px' }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className="scroll-snap-item"
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              border: isActive ? '1px solid var(--accent-pink-hot)' : '1px solid rgba(255, 255, 255, 0.7)',
              backgroundColor: isActive ? 'var(--accent-pink-hot)' : 'var(--surface-white)',
              color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: isActive ? '700' : '600',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: isActive ? 'var(--shadow-pill)' : '0 2px 6px rgba(0, 0, 0, 0.03)',
              transition: 'all 0.15s ease-out',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
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
            {tab}
          </button>
        );
      })}
    </div>
  );
}
