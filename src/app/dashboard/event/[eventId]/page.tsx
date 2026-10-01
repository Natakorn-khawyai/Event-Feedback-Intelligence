import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import InsightClient from './InsightClient';
import QRShare from './QRShare';

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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Link href="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'underline', marginBottom: '8px', display: 'inline-block' }}>
            &larr; กลับไปแดชบอร์ด
          </Link>
          <h2>วิเคราะห์ผล: {event.title}</h2>
          <p style={{ color: 'var(--text-muted)' }}>จำนวนผู้ตอบแบบสอบถาม: {totalResponses} คน</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{totalAvg}</div>
          <div style={{ color: 'var(--text-muted)' }}>คะแนนเฉลี่ยรวม</div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <InsightClient eventId={event.id} initialInsight={insight} hasResponses={totalResponses > 0} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {questionAverages.map((q, index) => (
          <div key={q.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Q{index + 1}:</span> {q.text}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
              {q.avg}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <QRShare eventId={event.id} eventTitle={event.title} />
      </div>
    </div>
  );
}
