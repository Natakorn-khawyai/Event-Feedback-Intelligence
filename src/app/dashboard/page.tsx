import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import TopBar from '@/components/ui/TopBar';
import AvatarStack from '@/components/ui/AvatarStack';
import DashedAddTile from '@/components/ui/DashedAddTile';
import PhotoCard from '@/components/ui/PhotoCard';
import { Plus, ArrowRight, Sparkles, BarChart3, MessageSquare, Calendar } from 'lucide-react';

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


  const mockAvatars = [
    { name: session.name || 'Admin', bg: '#FFD1E3' },
    { name: 'Surveyor', bg: '#E6DCFA' },
    { name: 'AI Bot', bg: '#D5F0D0' },
  ];

  const pastelColors = ['#FFD1E3', '#E6DCFA', '#FFF3B8', '#D5F0D0', '#DFF1F5'];

  return (
    <div className="fade-up" style={{ paddingBottom: '40px' }}>
      {/* Top Banner with Stats & Profile */}
      <div style={{
        background: 'var(--surface-white)',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-card)',
        padding: '24px 28px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-soft)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD1E3 0%, #E6DCFA 100%)',
            color: 'var(--accent-pink-hot)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: '800',
            boxShadow: '0 4px 12px rgba(232, 70, 124, 0.2)',
          }}>
            {(session.name || 'U').substring(0, 1).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              แดชบอร์ดผู้จัดงาน: {session.name}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              ยินดีต้อนรับกลับมา! จัดการอีเวนต์และตรวจสอบข้อมูลเชิงลึกจาก AI ได้ที่นี่
            </p>
          </div>
        </div>

        {/* Quick Stats Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid rgba(232, 70, 124, 0.3)',
            padding: '8px 16px 8px 20px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 2px 10px rgba(232, 70, 124, 0.1)',
          }}>
            <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
              กิจกรรมทั้งหมด
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '32px',
              height: '32px',
              padding: '0 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--accent-pink-hot)',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '800',
              boxShadow: '0 2px 8px rgba(232, 70, 124, 0.35)',
            }}>
              {events.length}
            </span>
          </div>

          <Link href="/create" style={{ textDecoration: 'none' }}>
            <button className="btn-cta" style={{ padding: '12px 24px', fontSize: '14px' }}>
              <Plus size={18} strokeWidth={2.5} />
              <span>สร้างงานใหม่</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '18px',
      }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            รายการแบบประเมินของคุณ
          </h2>
        </div>
      </div>

      {/* Desktop Responsive Grid: 3-4 Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {/* Dashed Add Slot Tile */}
        <DashedAddTile
          label="สร้างแบบประเมินงานใหม่"
          href="/create"
          minHeight={260}
        />

        {/* Existing Event Cards */}
        {events.map((event, idx) => {
          const accent = pastelColors[idx % pastelColors.length];
          return (
            <PhotoCard
              key={event.id}
              id={event.id}
              title={event.title}
              authorName={session.name || 'Organizer'}
              date={new Date(event.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
              responseCount={event._count.responses}
              accentColor={accent}
              href={`/dashboard/event/${event.id}`}
            />
          );
        })}
      </div>

      {/* Empty State when no events exist */}
      {events.length === 0 && (
        <div
          className="surface-card fade-up"
          style={{
            textAlign: 'center',
            padding: '60px 24px',
            marginTop: '12px',
            border: '2px dashed #D1D5DB',
            background: 'var(--hero-gradient)',
            borderRadius: 'var(--radius-card-lg)',
          }}
        >
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(232, 70, 124, 0.2)',
            marginBottom: '16px',
            color: 'var(--accent-pink-hot)',
          }}>
            <Sparkles size={36} strokeWidth={1.8} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
            ยังไม่มีแบบประเมินในระบบ
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            maxWidth: '420px',
            marginInline: 'auto',
            lineHeight: 1.6,
          }}>
            เริ่มต้นสร้างแบบประเมินแรกของคุณ ให้ AI ออกแบบคำถามความพึงพอใจ 5 ระดับให้ทันทีภายในไม่กี่วินาที
          </p>
          <Link href="/create" style={{ textDecoration: 'none' }}>
            <button className="btn-cta" style={{ padding: '14px 32px' }}>
              <Plus size={18} strokeWidth={2.2} />
              <span>สร้างแบบประเมินแรกทันที</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
