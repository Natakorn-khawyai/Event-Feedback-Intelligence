'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRShare({ eventId, eventTitle }: { eventId: string, eventTitle: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate the full URL dynamically based on the current window location
    const surveyUrl = `${window.location.origin}/scan/${eventId}`;
    setUrl(surveyUrl);
  }, [eventId]);

  const copyToClipboard = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!url) return null; // Avoid rendering on server

  return (
    <div className="glass-card" style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h3 style={{ marginBottom: '8px' }}>สแกน QR Code เพื่อทำแบบประเมิน</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
        ให้ผู้เข้าร่วมงานสแกนคิวอาร์โค้ดนี้ หรือส่งลิงก์ด้านล่างเพื่อเริ่มทำแบบประเมินของงาน "{eventTitle}"
      </p>

      <div style={{ display: 'inline-block', padding: '16px', background: '#ffffff', borderRadius: '12px', marginBottom: '24px' }}>
        <QRCodeSVG value={url} size={200} level="H" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
        <input 
          type="text" 
          readOnly 
          value={url} 
          className="input-field" 
          style={{ flex: 1, marginBottom: 0, fontSize: '0.9rem', color: 'var(--text-muted)', cursor: 'text' }}
        />
        <button 
          onClick={copyToClipboard}
          className="btn-primary"
          style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}
        >
          {copied ? '✅ คัดลอกแล้ว' : 'คัดลอกลิงก์'}
        </button>
      </div>
    </div>
  );
}
