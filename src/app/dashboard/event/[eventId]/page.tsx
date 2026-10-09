import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TopBar from '@/components/ui/TopBar';
import InsightClient from './InsightClient';
import QRShare from './QRShare';
import { Star, MessageSquare, Calendar, MapPin, Sparkles } from 'lucide-react';

export default async function EventDashboardPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const session = await getSession();
  if (!session) redirect('/auth');

  const event = await prisma.event.findUnique({
    where: { id: eventId, userId: session.userId },
    include: {
      questions: { orderBy: { order: 'asc' } },
      responses: { include: { answers: true } },
      insights: true
    }
  });

  if (!event) redirect('/dashboard');

  const totalResponses = event.responses.length;
  
  const questionAverages = event.questions.map(q => {
    const answersForQ = event.responses.flatMap(r => r.answers.filter(a => a.questionId === q.id));
    const avg = answersForQ.length > 0 
      ? (answersForQ.reduce((sum, a) => sum + a.score, 0) / answersForQ.length).toFixed(1)
      : '0.0';
    return { ...q, avg };
  });

  const totalAvg = questionAverages.length > 0 
    ? (questionAverages.reduce((sum, q) => sum + parseFloat(q.avg), 0) / questionAverages.length).toFixed(1)
    : '0.0';

  const insight = event.insights[0] || null;

  return (
    <div className="fade-up">
      {/* Top Bar with Back Navigation */}
      <TopBar
        title="วิเคราะห์ผลแบบประเมิน"
        showBack={true}
        backHref="/dashboard"
        showSearch={false}
        showMic={false}
      />

      {/* Hero Overview Card */}
      <div className="hero-glass-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: 'var(--accent-pink-hot)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Calendar size={12} strokeWidth={1.8} />
            {new Date(event.date).toLocaleDateString('th-TH')}
          </span>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <Star size={16} fill="var(--accent-pink-hot)" color="var(--accent-pink-hot)" />
            <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {totalAvg}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ 5.0</span>
          </div>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          {event.title}
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          {event.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} strokeWidth={1.5} />
              {event.location}
            </span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MessageSquare size={13} strokeWidth={1.5} />
            ผู้ตอบ {totalResponses} คน
          </span>
        </div>
      </div>

      {/* AI Intelligence Summary */}
      <div style={{ marginBottom: '24px' }}>
        <InsightClient eventId={event.id} initialInsight={insight} hasResponses={totalResponses > 0} />
      </div>

      {/* Question Score Breakdown */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            คะแนนรายข้อคำถาม ({questionAverages.length} ข้อ)
          </h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
            เฉลี่ย 1 - 5 ดาว
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {questionAverages.map((q, index) => (
            <div
              key={q.id}
              className="surface-card"
              style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-pink-pastel)',
                  color: 'var(--accent-pink-hot)',
                  fontSize: '11px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {index + 1}
                </span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  {q.text}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'rgba(232, 70, 124, 0.08)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                flexShrink: 0,
              }}>
                <Star size={13} fill="var(--accent-pink-hot)" color="var(--accent-pink-hot)" />
                <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent-pink-hot)' }}>
                  {q.avg}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Sharing */}
      <div style={{ marginBottom: '32px' }}>
        <QRShare eventId={event.id} eventTitle={event.title} />
      </div>
    </div>
  );
}
