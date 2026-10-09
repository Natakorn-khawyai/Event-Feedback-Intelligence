'use client';

import { useState, useTransition, useEffect } from 'react';
import { submitSurvey } from '@/app/actions/survey';
import { Calendar, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';

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
      <div className="surface-card fade-up" style={{ textAlign: 'center', padding: '48px 24px', margin: '40px auto 0 auto', maxWidth: '540px' }}>
        <div style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          backgroundColor: 'var(--badge-mint)',
          color: 'var(--badge-mint-text)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '18px',
          boxShadow: '0 6px 20px rgba(213, 240, 208, 0.6)',
        }}>
          <CheckCircle2 size={38} strokeWidth={2.2} />
        </div>
        <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
          คุณส่งแบบประเมินเรียบร้อยแล้ว
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '340px', marginInline: 'auto', lineHeight: '1.6' }}>
          ขอบคุณที่เป็นส่วนสำคัญในการส่งฟีดแบ็กให้ทีมงานพัฒนาต่อไปครับ
        </p>
      </div>
    );
  }

  const isComplete = Object.keys(scores).length === questions.length && feedback.trim() !== '';

  return (
    <div className="fade-up" style={{ maxWidth: '680px', margin: '0 auto', paddingBottom: '60px', width: '100%' }}>
      {/* Event Header Hero Card */}
      <div className="hero-glass-card" style={{
        marginBottom: '20px',
        textAlign: 'left',
        padding: '30px 28px',
        borderRadius: '24px',
      }}>
        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '7px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: '15px',
            fontWeight: '800',
            color: 'var(--accent-pink-hot)',
            boxShadow: '0 2px 10px rgba(232, 70, 124, 0.12)',
            border: '1.5px solid rgba(232, 70, 124, 0.2)',
          }}>
            <Sparkles size={16} strokeWidth={2.4} />
            <span>แบบสอบถามความพึงพอใจ</span>
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(22px, 4vw, 28px)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          margin: '0 0 12px 0',
          lineHeight: '1.3',
          textAlign: 'left',
          letterSpacing: '-0.02em',
        }}>
          {event.title}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: '14px',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          fontWeight: '600',
          textAlign: 'left',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={15} strokeWidth={2} color="var(--accent-pink-hot)" />
            {new Date(event.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          {event.location && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} strokeWidth={2} color="var(--accent-pink-hot)" />
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
                  padding: '22px 20px',
                  borderRadius: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px' }}>
                  <span style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-pink-pastel)',
                    color: 'var(--accent-pink-hot)',
                    fontSize: '13px',
                    fontWeight: '800',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}>
                    {index + 1}
                  </span>
                  <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0, lineHeight: '1.45' }}>
                    {q.text}
                  </p>
                </div>

                {/* Responsive 5-Score Rating Buttons */}
                <div className="rating-scale-grid">
                  {[1, 2, 3, 4, 5].map((score) => {
                    const isSelected = currentScore === score;
                    return (
                      <button
                        key={score}
                        type="button"
                        onClick={() => handleScoreChange(q.id, score)}
                        aria-label={`ระดับคะแนน ${score}`}
                        className="rating-tile-btn"
                        style={{
                          border: isSelected ? 'none' : '1.5px solid rgba(220, 220, 230, 0.75)',
                          background: isSelected
                            ? 'linear-gradient(135deg, var(--accent-pink-hot) 0%, #D8336D 100%)'
                            : 'rgba(255, 255, 255, 0.95)',
                          color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                          boxShadow: isSelected
                            ? '0 4px 14px rgba(232, 70, 124, 0.35)'
                            : '0 2px 6px rgba(0,0,0,0.03)',
                          transform: isSelected ? 'scale(1.03)' : 'scale(1)',
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
                  alignItems: 'center',
                  marginTop: '10px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
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
        <div className="surface-card" style={{ padding: '22px 20px', borderRadius: '20px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '16px' }}>💡</span>
            <label style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>
              ข้อเสนอแนะเพิ่มเติม (จำเป็นต้องกรอก)
            </label>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
            สิ่งที่คุณประทับใจ หรือข้อเสนอแนะที่อยากให้ปรับปรุงในครั้งถัดไป
          </p>
          <textarea
            className="input-modern"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="พิมพ์ความคิดเห็น หรือฟีดแบ็กของคุณที่นี่..."
            style={{ resize: 'vertical', minHeight: '110px', width: '100%', fontSize: '14px' }}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-cta"
          style={{
            width: '100%',
            height: '52px',
            fontSize: '16px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 6px 20px rgba(232, 70, 124, 0.35)',
          }}
          disabled={isPending || !isComplete}
        >
          {isPending ? (
            <span>กำลังส่งข้อมูล...</span>
          ) : (
            <>
              <Send size={18} strokeWidth={2.2} />
              <span>ส่งแบบประเมินความพึงพอใจ</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
