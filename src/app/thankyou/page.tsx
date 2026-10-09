import Link from 'next/link';
import TopBar from '@/components/ui/TopBar';
import { Sparkles, CheckCircle2, Home } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="fade-up" style={{ paddingBottom: '40px' }}>
      <TopBar
        title="ส่งข้อมูลสำเร็จ"
        showBack={false}
        showSearch={false}
        showMic={false}
      />

      <div
        className="surface-card"
        style={{
          maxWidth: '400px',
          margin: '30px auto 0 auto',
          textAlign: 'center',
          padding: '36px 24px',
          borderRadius: 'var(--radius-card-lg)',
        }}
      >
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--badge-mint)',
          color: 'var(--badge-mint-text)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 6px 20px rgba(213, 240, 208, 0.6)',
        }}>
          <CheckCircle2 size={40} strokeWidth={2.2} />
        </div>

        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '10px',
        }}>
          ขอบคุณสำหรับความคิดเห็น!
        </h2>

        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '28px',
        }}>
          เราได้รับฟีดแบ็กของคุณเรียบร้อยแล้ว ทุกข้อเสนอแนะจะถูกนำไปวิเคราะห์ด้วย AI เพื่อยกระดับประสบการณ์ในกิจกรรมครั้งต่อไปให้ดียิ่งขึ้น
        </p>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <button className="btn-cta" style={{ width: '100%', padding: '14px' }}>
            <Home size={18} strokeWidth={2} />
            <span>กลับสู่หน้าแรก</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
