'use client';

import { useState, useTransition, useEffect } from 'react';
import { submitSurvey } from '@/app/actions/survey';
import TopBar from '@/components/ui/TopBar';
import { Calendar, MapPin, Sparkles, Send, CheckCircle2, Heart } from 'lucide-react';

export default function SurveyClient({ event, questions }: { event: any; questions: any[] }) {
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [identifier, setIdentifier] = useState('');

  useEffect(() => {
    let id = localStorage.getItem('survey_id');
    if (!id) {
      id = Math.random().toString(36).substring(7);
      localStorage.setItem('survey_id', id);
    }
    setIdentifier(id);
    
    if (localStorage.getItem(`done_${event.id}`)) {
      setError('คุณเคยทำแบบประเมินนี้แล้วในเครื่องนี้');
    }
  }, [event.id]);

  const handleScoreChange = (qId: string, score: number) => {
    setScores(prev => ({ ...prev, [qId]: score }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localStorage.getItem(`done_${event.id}`)) return;
    
    setError(null);
    startTransition(async () => {
      const res = await submitSurvey(event.id, identifier, scores, feedback);
      if (res?.error) {
        setError(res.error);
      } else {
        localStorage.setItem(`done_${event.id}`, 'true');
      }
    });
  };

  if (error && error.includes('เคยทำ')) {
    return (
      <div className="surface-card fade-up" style={{ textAlign: 'center', padding: '40px 20px', marginTop: '40px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--badge-mint)',
          color: 'var(--badge-mint-text)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <CheckCircle2 size={36} strokeWidth={2} />
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
          คุณส่งแบบประเมินเรียบร้อยแล้ว
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '300px', marginInline: 'auto' }}>
          ขอบคุณที่เป็นส่วนสำคัญในการส่งฟีดแบ็กให้ทีมงานพัฒนาต่อไปครับ
        </p>
      </div>
    );
  }

  const isComplete = Object.keys(scores).length === questions.length && feedback.trim() !== '';

  return (
    <div className="fade-up" style={{ maxWidth: '680px', margin: '0 auto', paddingBottom: '40px' }}>
      <TopBar
        title="แบบประเมินกิจกรรม"
        showBack={false}
        showSearch={false}
        showMic={false}
      />

      {/* Event Header Hero */}
      <div className="hero-glass-card" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: '700',
          color: 'var(--accent-pink-hot)',
          marginBottom: '10px',
        }}>
          <Sparkles size={13} strokeWidth={2} /> แบบสอบถามความพึงพอใจ
        </span>

        <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          {event.title}
        </h2>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} strokeWidth={1.8} />
            {new Date(event.date).toLocaleDateString('th-TH')}
          </span>
          {event.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} strokeWidth={1.8} />
              {event.location}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(239, 68, 68, 0.08)',
          color: 'var(--status-danger)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '16px',
        }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {questions.map((q, index) => {
            const currentScore = scores[q.id];
            return (
              <div
                key={q.id}
                className="surface-card"
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-card)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
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
                  <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                    {q.text}
                  </p>
                </div>

                {/* 5-Star / 5-Score Rating Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map((score) => {
                    const isSelected = currentScore === score;
                    return (
                      <button
                        key={score}
                        type="button"
                        onClick={() => handleScoreChange(q.id, score)}
                        aria-label={`ระดับคะแนน ${score}`}
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          border: isSelected ? 'none' : '1px solid var(--border-glass)',
                          backgroundColor: isSelected ? 'var(--accent-pink-hot)' : 'rgba(255, 255, 255, 0.9)',
                          color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                          fontWeight: '800',
                          fontSize: '16px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: isSelected ? 'var(--shadow-pill)' : '0 2px 6px rgba(0,0,0,0.03)',
                          transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                          transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {score}
                      </button>
                    );
                  })}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                }}>
                  <span>น้อยที่สุด (1)</span>
                  <span>มากที่สุด (5)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggestion Textarea Card */}
        <div className="surface-card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ fontSize: '15px' }}>💡</span>
            <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
              ข้อเสนอแนะเพิ่มเติม (จำเป็นต้องกรอก)
            </label>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            สิ่งที่คุณประทับใจ หรือข้อเสนอแนะที่อยากให้ปรับปรุงในครั้งถัดไป
          </p>
          <textarea
            className="input-modern"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
            style={{ resize: 'vertical', minHeight: '100px' }}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-cta"
          style={{ width: '100%', padding: '16px', fontSize: '16px' }}
          disabled={isPending || !isComplete}
        >
          {isPending ? (
            <span>กำลังส่งข้อมูล...</span>
          ) : (
            <>
              <Send size={18} strokeWidth={2} />
              <span>ส่งแบบประเมินความพึงพอใจ</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
