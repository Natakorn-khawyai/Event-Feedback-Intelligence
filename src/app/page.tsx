import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--text-main)' }}>
        เปลี่ยน Feedback ธรรมดา<br />ให้เป็น Insight เพื่อพัฒนาครั้งต่อไป
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
        รับฟังเสียงจากผู้เข้าร่วมงาน และใช้ AI วิเคราะห์ความพึงพอใจเพื่อยกระดับประสบการณ์ในงานครั้งถัดไป
      </p>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link href="/auth">
          <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            เริ่มต้นสร้างแบบประเมิน
          </button>
        </Link>
      </div>
    </div>
  );
}
