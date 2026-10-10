import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TopBar from '@/components/ui/TopBar';
import InsightClient from './InsightClient';
import QRShare from './QRShare';
import ExportSystem from './ExportSystem';
import DataVisualizations from './DataVisualizations';
import { Star, MessageSquare, Calendar, MapPin, Sparkles, ArrowLeft } from 'lucide-react';

export default async function EventDashboardPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const session = await getSession();
  if (!session) redirect('/auth');

  const event = await prisma.event.findUnique({
    where: { id: eventId, userId: session.userId },
    include: {
      questions: { orderBy: { order: 'asc' } },
      responses: { include: { answers: true, feedback: true } },
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '6px' }}>
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
            <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ 5.0 ดาว</span>
          </div>
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 4.5vw, 40px)',
          fontWeight: '900',
          color: 'var(--text-primary)',
          margin: '0 0 10px 0',
          lineHeight: '1.15',
          letterSpacing: '-0.025em',
        }}>
          {event.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', fontSize: '16px', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <MessageSquare size={20} strokeWidth={2} color="var(--accent-pink-hot)" />
            มีผู้ร่วมตอบแบบสอบถามทั้งหมด <strong style={{ color: 'var(--text-primary)' }}>{totalResponses}</strong> คน
          </span>

          <ExportSystem
            eventTitle={event.title}
            eventDate={event.date}
            eventLocation={event.location}
            totalResponses={totalResponses}
            totalAvg={totalAvg}
            questions={questionAverages}
            responses={event.responses}
            insight={insight}
          />
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

      {/* Interactive Data Visualizations (Bar & Donut / Pie Charts) */}
      <DataVisualizations
        questions={questionAverages}
        responses={event.responses}
        totalAvg={totalAvg}
      />
    </div>
  );
}
