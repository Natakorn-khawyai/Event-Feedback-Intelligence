import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TopBar from '@/components/ui/TopBar';
import InsightClient from './InsightClient';
import QRShare from './QRShare';
import { Star, MessageSquare, Calendar, MapPin, Sparkles, ArrowLeft } from 'lucide-react';

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
    <div className="fade-up" style={{ paddingBottom: '40px' }}>
      {/* Hero Overview Card: Wide Desktop Card */}
      <div className="hero-glass-card" style={{ marginBottom: '28px', padding: '32px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              color: 'var(--accent-pink-hot)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Calendar size={14} strokeWidth={2} />
              {new Date(event.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>

            {event.location && (
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                color: 'var(--text-primary)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <MapPin size={14} strokeWidth={1.8} />
                {event.location}
              </span>
            )}
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '8px 20px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
          }}>
            <Star size={20} fill="var(--accent-pink-hot)" color="var(--accent-pink-hot)" />
            <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {totalAvg}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ 5.0 ดาว</span>
          </div>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '10px', lineHeight: '1.25' }}>
          {event.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={16} strokeWidth={1.8} color="var(--accent-pink-hot)" />
            มีผู้ร่วมตอบแบบสอบถามทั้งหมด <strong>{totalResponses}</strong> คน
          </span>
        </div>
      </div>

      {/* Desktop 2-Column Split: AI Summary (Left) & QR Code Sharing (Right) */}
      <div className="desktop-grid-2" style={{ alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <InsightClient eventId={event.id} initialInsight={insight} hasResponses={totalResponses > 0} />
        </div>
        <div>
          <QRShare eventId={event.id} eventTitle={event.title} />
        </div>
      </div>

      {/* Question Score Breakdown */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              คะแนนเฉลี่ยรายข้อคำถาม ({questionAverages.length} ข้อ)
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              ผลคะแนนเฉลี่ยประเมินจากผู้เข้าร่วมกิจกรรมทั้งหมด
            </p>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
            คะแนนเต็ม 5.0
          </span>
        </div>

        <div className="desktop-grid-2" style={{ gap: '14px' }}>
          {questionAverages.map((q, index) => (
            <div
              key={q.id}
              className="surface-card"
              style={{
                padding: '18px 22px',
                borderRadius: 'var(--radius-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-pink-pastel)',
                  color: 'var(--accent-pink-hot)',
                  fontSize: '12px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {index + 1}
                </span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  {q.text}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(232, 70, 124, 0.08)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                flexShrink: 0,
              }}>
                <Star size={15} fill="var(--accent-pink-hot)" color="var(--accent-pink-hot)" />
                <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--accent-pink-hot)' }}>
                  {q.avg}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
