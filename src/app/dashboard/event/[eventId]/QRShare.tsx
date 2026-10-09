'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Copy, Check, ExternalLink } from 'lucide-react';

export default function QRShare({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const surveyUrl = `${window.location.origin}/scan/${eventId}`;
    setUrl(surveyUrl);
  }, [eventId]);

  const copyToClipboard = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!url) return null;

  return (
    <div className="surface-card" style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-pink-pastel)',
          color: 'var(--accent-pink-hot)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <QrCode size={16} strokeWidth={2} />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
          QR Code สำหรับผู้ร่วมงาน
        </h3>
      </div>

      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '18px', maxWidth: '320px', marginInline: 'auto' }}>
        สแกนเพื่อเข้าทำแบบประเมินของงาน "{eventTitle}" ได้ทันที
      </p>

      {/* QR Code Container */}
      <div style={{
        display: 'inline-block',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-soft)',
        border: '1px solid var(--border-glass)',
        marginBottom: '20px',
      }}>
        <QRCodeSVG value={url} size={190} level="H" />
      </div>

      {/* Copy Link Input Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 'var(--radius-full)',
        padding: '4px 6px 4px 14px',
        border: '1px solid var(--border-glass)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        marginBottom: '14px',
      }}>
        <input
          type="text"
          readOnly
          value={url}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            outline: 'none',
            textOverflow: 'ellipsis',
          }}
        />
        <button
          onClick={copyToClipboard}
          type="button"
          aria-label="คัดลอกลิงก์"
          className="btn-cta"
          style={{
            padding: '8px 16px',
            minHeight: '36px',
            fontSize: '12px',
          }}
        >
          {copied ? (
            <>
              <Check size={14} strokeWidth={2.5} />
              <span>คัดลอกแล้ว</span>
            </>
          ) : (
            <>
              <Copy size={14} strokeWidth={2} />
              <span>คัดลอก</span>
            </>
          )}
        </button>
      </div>

      {/* Open Survey in New Tab Link */}
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--accent-pink-hot)',
            textDecoration: 'none',
          }}
        >
          <span>ทดลองเปิดหน้าทำแบบสอบถาม</span>
          <ExternalLink size={13} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
