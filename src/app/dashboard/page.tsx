import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import TopBar from '@/components/ui/TopBar';
import AvatarStack from '@/components/ui/AvatarStack';
import DashedAddTile from '@/components/ui/DashedAddTile';
import PhotoCard from '@/components/ui/PhotoCard';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';

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

  // Calculate total feedback received
  const totalResponses = events.reduce((sum, ev) => sum + ev._count.responses, 0);

  const mockAvatars = [
    { name: session.name || 'Admin', bg: '#FFD1E3' },
    { name: 'Surveyor', bg: '#E6DCFA' },
    { name: 'AI Bot', bg: '#D5F0D0' },
  ];

  const pastelColors = ['#FFD1E3', '#E6DCFA', '#FFF3B8', '#D5F0D0', '#DFF1F5'];

  return (
    <div className="fade-up">
      {/* Top Bar */}
      <TopBar
        title="กิจกรรมของคุณ"
        showBack={false}
        showSearch={true}
        showFilter={true}
      />

      {/* "Top users →" Pink Pill Banner */}
      <div style={{
        background: 'var(--badge-pink)',
        border: '1px solid rgba(232, 70, 124, 0.25)',
        borderRadius: 'var(--radius-full)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(232, 70, 124, 0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AvatarStack avatars={mockAvatars} limit={3} totalCount={events.length + 3} size={28} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-pink-hot)' }}>
            ผู้จัด: {session.name}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '12px',
          fontWeight: '700',
          color: 'var(--accent-pink-hot)',
          backgroundColor: '#FFFFFF',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <span>{totalResponses} ฟีดแบ็ก</span>
          <ArrowRight size={13} strokeWidth={2.5} />
        </div>
      </div>

      {/* Header section with Create Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
            รายการแบบประเมิน ({events.length})
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
            แตะที่การ์ดเพื่อดูผลการประเมินและอินไซต์จาก AI
          </p>
        </div>
        <Link href="/create" style={{ textDecoration: 'none' }}>
          <button className="btn-cta" style={{ padding: '8px 16px', minHeight: '38px', fontSize: '13px' }}>
            <Plus size={16} strokeWidth={2.2} />
            <span>สร้างงาน</span>
          </button>
        </Link>
      </div>

      {/* 2-Column Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '14px',
        marginBottom: '32px',
      }}>
        {/* Dashed Add Slot Tile */}
        <DashedAddTile
          label="สร้างงานใหม่"
          sublabel="AI Generate คำถาม"
          href="/create"
          minHeight={170}
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
              date={new Date(event.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
              responseCount={event._count.responses}
              likeCount={10 + (event._count.responses * 2)}
              accentColor={accent}
              badge={event._count.responses > 0 ? 'มีข้อมูล' : 'รอฟีดแบ็ก'}
              badgeColor={event._count.responses > 0 ? 'var(--badge-mint)' : 'var(--badge-yellow)'}
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
            padding: '40px 20px',
            marginTop: '12px',
            border: '2px dashed #D1D5DB',
            background: 'var(--hero-gradient)',
            borderRadius: 'var(--radius-card-lg)',
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(232, 70, 124, 0.2)',
            marginBottom: '16px',
            color: 'var(--accent-pink-hot)',
          }}>
            <Sparkles size={32} strokeWidth={1.8} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
            ยังไม่มีแบบประเมินในระบบ
          </h3>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '20px',
            maxWidth: '300px',
            marginInline: 'auto',
            lineHeight: 1.5,
          }}>
            เริ่มต้นสร้างแบบประเมินแรกของคุณ ให้ AI ออกแบบคำถามความพึงพอใจ 5 ระดับให้ภายใน 3 วินาที
          </p>
          <Link href="/create" style={{ textDecoration: 'none' }}>
            <button className="btn-cta">
              <Plus size={16} strokeWidth={2.2} />
              <span>สร้างแบบประเมินแรกทันที</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
