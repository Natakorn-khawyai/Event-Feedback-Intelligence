import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '15vh', maxWidth: '800px', marginInline: 'auto' }}>

      {/* Playful Accent Pill */}
      <div style={{
        display: 'inline-block',
        padding: '6px 16px',
        background: 'rgba(0,0,0,0.05)',
        borderRadius: '9999px',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: 'var(--text-muted)',
        marginBottom: '24px',
        border: '1px solid var(--card-border)'
      }}>
      </div>

      <h1 className="editorial-heading" style={{ fontSize: '4.5rem', marginBottom: '20px', color: 'var(--text-main)', lineHeight: '1.1' }}>
        เปลี่ยน Feedback ธรรมดา<br />
        <span style={{ fontStyle: 'italic', color: 'var(--primary-color)' }}>ให้เป็น Insight</span>
      </h1>

      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '600px', marginInline: 'auto' }}>
        รับฟังเสียงจากผู้เข้าร่วมงาน และใช้ AI วิเคราะห์ความพึงพอใจเพื่อยกระดับประสบการณ์ในงานครั้งถัดไปให้ดียิ่งขึ้น
      </p>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="/auth">
          <button className="btn-primary" style={{ padding: '18px 40px', fontSize: '1.1rem' }}>
            เริ่มต้นสร้างแบบประเมิน
          </button>
        </Link>
      </div>

    </div>
  );
}