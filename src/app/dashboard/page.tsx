import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { logoutUser } from '@/app/actions/auth';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/auth');

  const events = await prisma.event.findMany({
    where: { userId: session.userId },
    include: {
      _count: {
        select: { responses: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ marginBottom: '4px' }}>แดชบอร์ดจัดการงาน</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>ผู้จัดงาน: {session.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/create">
            <button className="btn-primary">+ สร้างงานใหม่</button>
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {events.map(event => (
          <div key={event.id} className="glass-card">
            <h3>{event.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>วันที่: {event.date.toLocaleDateString('th-TH')}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '8px' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ผู้ตอบแบบสอบถาม</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{event._count.responses} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>คน</span></div>
              </div>
              <Link href={`/dashboard/event/${event.id}`}>
                <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--primary-color)', background: 'transparent', color: 'var(--primary-color)', cursor: 'pointer' }}>ดูผลลัพธ์</button>
              </Link>
            </div>

            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--card-border)' }}>
              <Link href={`/scan/${event.id}`} target="_blank" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'underline' }}>
                เปิดหน้าทำแบบสอบถาม
              </Link>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="glass-card" style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '80px 20px', 
            marginTop: '20px', 
            border: '2px dashed var(--card-border)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(150,150,255,0.05) 100%)',
            borderRadius: '24px' 
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '24px', animation: 'float 3s ease-in-out infinite', display: 'inline-block', textShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
              🤖
            </div>
            <h2 style={{ marginBottom: '12px', color: 'var(--text-main)', fontSize: '1.8rem' }}>แวะมาสร้างกิจกรรมแรกกันเถอะ!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '450px', margin: '0 auto 32px auto', lineHeight: 1.6, fontSize: '1.1rem' }}>
              น้อง AI พร้อมช่วยคุณวิเคราะห์ฟีดแบ็กแล้ว<br/>เริ่มต้นสร้างแบบประเมินสำหรับงานของคุณได้ง่ายๆ ภายใน 1 นาที
            </p>
            <Link href="/create">
              <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                เริ่มสร้างงานแรกของคุณเลย
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
