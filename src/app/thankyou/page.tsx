import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '10vh auto', textAlign: 'center' }} className="glass-card">
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
      <h2 style={{ color: 'var(--success)', marginBottom: '16px' }}>ขอบคุณสำหรับความคิดเห็น!</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
        เราจะนำ Feedback ของคุณไปพัฒนาและปรับปรุงการจัดงานในครั้งต่อไปให้ดียิ่งขึ้น
      </p>
      
      <Link href="/">
        <button className="btn-primary" style={{ width: '100%' }}>กลับสู่หน้าแรก</button>
      </Link>
    </div>
  );
}
