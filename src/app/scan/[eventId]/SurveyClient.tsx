'use client';

import { useState, useTransition, useEffect } from 'react';
import { submitSurvey } from '@/app/actions/survey';

export default function SurveyClient({ event, questions }: { event: any, questions: any[] }) {
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
      <div style={{ maxWidth: '500px', margin: '10vh auto', textAlign: 'center' }} className="glass-card">
        <h3>คุณทำแบบสอบถามนี้ไปแล้ว!</h3>
        <p style={{ color: 'var(--text-muted)' }}>ขอบคุณที่ร่วมเป็นส่วนหนึ่งในงานของเรา</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', paddingBottom: '40px' }}>
      <div className="glass-card" style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '8px' }}>Event Feedback</h3>
        <h2 style={{ marginBottom: '8px' }}>{event.title}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{new Date(event.date).toLocaleDateString('th-TH')} | {event.location}</p>
      </div>

      {error && (
        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderLeft: '4px solid var(--danger)', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q.id} className="glass-card" style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '16px' }}>{index + 1}. {q.text}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[1, 2, 3, 4, 5].map(score => (
                <button
                  key={score}
                  type="button"
                  onClick={() => handleScoreChange(q.id, score)}
                  style={{
                    width: '45px', height: '45px', borderRadius: '50%', 
                    border: '1px solid var(--primary-color)',
                    background: scores[q.id] === score ? 'var(--primary-color)' : 'transparent',
                    color: scores[q.id] === score ? 'var(--bg-color)' : 'var(--text-main)',
                    fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {score}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>น้อยที่สุด (1)</span>
              <span>มากที่สุด (5)</span>
            </div>
          </div>
        ))}

        <div className="glass-card" style={{ marginBottom: '24px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '16px' }}>💡 ข้อเสนอแนะเพิ่มเติม (จำเป็นต้องกรอก)</p>
          <textarea 
            className="input-field" 
            rows={4} 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="สิ่งที่คุณชอบ, สิ่งที่ไม่ชอบ หรือสิ่งที่ควรปรับปรุง..."
            style={{ resize: 'vertical' }}
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%', fontSize: '1.2rem', padding: '16px' }}
          disabled={isPending || Object.keys(scores).length < questions.length || feedback.trim() === ''}
        >
          {isPending ? 'กำลังส่งข้อมูล...' : 'ส่งแบบประเมิน'}
        </button>
      </form>
    </div>
  );
}
