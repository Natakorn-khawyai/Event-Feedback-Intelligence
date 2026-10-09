'use client';

import React, { useState } from 'react';
import TopBar from '@/components/ui/TopBar';
import ColorSwatch, { ColorOption } from '@/components/ui/ColorSwatch';
import ItemCard from '@/components/ui/ItemCard';
import DashedAddTile from '@/components/ui/DashedAddTile';
import { SlidersHorizontal, Search, ShoppingBag, Sparkles } from 'lucide-react';

const builderColors: ColorOption[] = [
  { id: 'magenta', label: 'Magenta', color: '#E8467C' },
  { id: 'red', label: 'Red', color: '#FF6B6B' },
  { id: 'teal', label: 'Teal', color: '#4ECDC4' },
  { id: 'lilac', label: 'Lilac', color: '#C7A4E8' },
  { id: 'orange', label: 'Orange', color: '#FFB347' },
  { id: 'blue', label: 'Blue', color: '#70A1FF' },
];

interface FlowerItem {
  id: string;
  name: string;
  colorId: string;
  emoji: string;
  price: number;
}

const flowersCatalog: FlowerItem[] = [
  { id: 'f1', name: 'Pastel Rose', colorId: 'magenta', emoji: '🌹', price: 45 },
  { id: 'f2', name: 'Pink Tulip', colorId: 'magenta', emoji: '🌷', price: 50 },
  { id: 'f3', name: 'Cherry Blossom', colorId: 'lilac', emoji: '🌸', price: 40 },
  { id: 'f4', name: 'White Daisy', colorId: 'teal', emoji: '🌼', price: 35 },
  { id: 'f5', name: 'Sunflower', colorId: 'orange', emoji: '🌻', price: 55 },
  { id: 'f6', name: 'Blue Hydrangea', colorId: 'blue', emoji: '🪻', price: 60 },
  { id: 'f7', name: 'Coral Carnation', colorId: 'red', emoji: '🌺', price: 45 },
  { id: 'f8', name: 'Lavender Sprig', colorId: 'lilac', emoji: '🌾', price: 30 },
  { id: 'f9', name: 'Orchid Bloom', colorId: 'magenta', emoji: '💐', price: 70 },
];

export default function BouquetBuilderPage() {
  const [activeTab, setActiveTab] = useState<'Flowers' | 'Leaves' | 'Ribbons' | 'Accessories'>('Flowers');
  const [selectedColor, setSelectedColor] = useState('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({
    f1: 1, // Start with 1 selected to showcase stepper
  });

  const topTabs: ('Flowers' | 'Leaves' | 'Ribbons' | 'Accessories')[] = [
    'Flowers',
    'Leaves',
    'Ribbons',
    'Accessories',
  ];

  const handleQtyChange = (id: string, qty: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: qty,
    }));
  };

  const filteredFlowers = flowersCatalog.filter(item => {
    if (selectedColor === 'all') return true;
    return item.colorId === selectedColor;
  });

  const totalItems = Object.values(quantities).reduce((sum, q) => sum + q, 0);

  return (
    <div className="fade-up" style={{ paddingBottom: '60px' }}>
      {/* Top Bar with Back Navigation */}
      <TopBar
        title="Bouquet Builder"
        showBack={true}
        backHref="/"
        showSearch={true}
        showMic={false}
      />

      {/* Top Tabs: Flowers (active, pink filled tile with underline), Leaves, Ribbons, Accessories */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        paddingBottom: '4px',
      }}>
        {topTabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                flex: '0 0 auto',
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--accent-pink-pastel)' : 'var(--surface-white)',
                color: isActive ? 'var(--accent-pink-hot)' : 'var(--text-secondary)',
                fontWeight: '700',
                fontSize: '13px',
                border: isActive ? '1.5px solid var(--accent-pink-hot)' : '1px solid var(--border-glass)',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: isActive ? '0 4px 12px rgba(255, 209, 227, 0.45)' : '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{tab}</span>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '3px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '3px',
                  backgroundColor: 'var(--accent-pink-hot)',
                  borderRadius: '999px',
                }} />
              )}
            </button>
          );
        })}

        {/* Dashed "+" tile */}
        <div style={{
          flex: '0 0 auto',
          padding: '10px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1.5px dashed #CBD5E1',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          color: 'var(--text-muted)',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
          + Custom
        </div>
      </div>

      {/* Color Filter Row: "All" chip + circular color swatches (selected = check icon) */}
      <div style={{ marginBottom: '14px' }}>
        <ColorSwatch
          colors={builderColors}
          selectedId={selectedColor}
          onSelect={setSelectedColor}
          showAllOption={true}
        />
      </div>

      {/* Section Title "Flowers" with filter + search icons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '14px',
        padding: '0 4px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            {activeTab}
          </h3>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            backgroundColor: 'var(--badge-pink)',
            color: 'var(--badge-pink-text)',
            padding: '2px 8px',
            borderRadius: '999px',
          }}>
            {filteredFlowers.length} ชนิด
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            aria-label="ตัวกรอง"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid var(--border-glass)',
              backgroundColor: 'var(--surface-white)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="ค้นหา"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid var(--border-glass)',
              backgroundColor: 'var(--surface-white)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <Search size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Item Grid (3 Columns) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '24px',
      }}>
        {filteredFlowers.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            title={item.name}
            imageEmoji={item.emoji}
            quantity={quantities[item.id] || 0}
            onQuantityChange={(q) => handleQtyChange(item.id, q)}
            compact={true}
          />
        ))}

        {/* Dashed placeholder for "add" slot */}
        <DashedAddTile
          label="Custom"
          sublabel="เพิ่มเอง"
          onClick={() => alert('เพิ่มชนิดใหม่ได้ตามใจคุณ')}
          minHeight={150}
        />
      </div>

      {/* Bottom Sticky Bouquet Summary Bar */}
      <div style={{
        position: 'sticky',
        bottom: '16px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-full)',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-elevated)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-pink-pastel)',
            color: 'var(--accent-pink-hot)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ShoppingBag size={18} strokeWidth={2} />
          </div>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)', display: 'block' }}>
              ช่อดอกไม้ของคุณ
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              รวม {totalItems} ชิ้น
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert(`จัดช่อดอกไม้สำเร็จ! รวม ${totalItems} ชิ้น`)}
          className="btn-cta"
          style={{ minHeight: '38px', padding: '8px 18px', fontSize: '13px' }}
        >
          <Sparkles size={14} strokeWidth={2} />
          <span>สั่งจัดช่อ</span>
        </button>
      </div>
    </div>
  );
}
