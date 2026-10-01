'use client';

import { useState, useTransition } from 'react';
import { generateEventQuestions, saveEvent } from '@/app/actions/event';

export default function CreateEventPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  
  // States to hold step 1 data
  const [eventData, setEventData] = useState<any>(null);
  const [questions, setQuestions] = useState<string[]>([]);

  const handleGenerate = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const res = await generateEventQuestions(formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.questions) {
        setQuestions(res.questions);
        setEventData({
          title: formData.get('title'),
          date: formData.get('date'),
          time: formData.get('time'),
          location: formData.get('location'),
          eventType: formData.get('eventType')
        });
        setStep(2);
      }
    });
  };

  const handleSave = () => {
    setError(null);
    if (questions.length === 0) {
      setError('ต้องมีคำถามอย่างน้อย 1 ข้อ');
      return;
    }
    if (questions.some(q => q.trim() === '')) {
      setError('กรุณากรอกข้อความคำถามให้ครบถ้วน หรือลบข้อที่ว่างออก');
      return;
    }

    startTransition(async () => {
      const res = await saveEvent(eventData, questions);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  const updateQuestion = (index: number, val: string) => {
    const newQ = [...questions];
    newQ[index] = val;
    setQuestions(newQ);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    setQuestions([...questions, '']);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px' }}>สร้างแบบประเมินอัจฉริยะ</h2>
      
      {error && (
        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderLeft: '4px solid var(--danger)', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {step === 1 && (
        <form action={handleGenerate} className="glass-card">
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>ชื่องาน</label>
          <input name="title" type="text" className="input-field" placeholder="เช่น งานวิ่งมาราธอน 2026" required defaultValue={eventData?.title} />

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>วันที่จัดงาน</label>
              <input name="date" type="date" className="input-field" required defaultValue={eventData?.date} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>เวลา (ถ้ามี)</label>
              <input name="time" type="time" className="input-field" defaultValue={eventData?.time} />
            </div>
          </div>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>สถานที่จัดงาน</label>
          <input name="location" type="text" className="input-field" placeholder="ชื่อสถานที่ หรือ ลิงก์ Google Maps" required defaultValue={eventData?.location} />

          <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid var(--card-border)' }} />

          <h3 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>✨ Smart Question Generation</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            ระบบ AI จะทำการสร้างชุดคำถามความพึงพอใจ 5 ระดับ ที่เหมาะสมที่สุดให้โดยอัตโนมัติตามประเภทงานที่คุณเลือก
          </p>
          
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>เลือกประเภทงาน (Event Type)</label>
          <select name="eventType" className="input-field" required style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-main)' }} defaultValue={eventData?.eventType || ''}>
            <option value="">-- กรุณาเลือกประเภทงาน --</option>
            <option value="seminar">งานสัมมนา / อบรม (Seminar / Workshop)</option>
            <option value="concert">งานคอนเสิร์ต / เทศกาลดนตรี (Concert / Music Fest)</option>
            <option value="sports">งานวิ่ง / กีฬา (Sports Event / Marathon)</option>
            <option value="exhibition">งานจัดแสดงสินค้า / นิทรรศการ (Exhibition)</option>
            <option value="other">อื่นๆ (ระบบ AI จะวิเคราะห์จากชื่องาน)</option>
          </select>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>จำนวนข้อคำถามที่ต้องการ</label>
          <input name="numQuestions" type="number" min="1" className="input-field" defaultValue="5" required />

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '24px', fontSize: '1.1rem' }} disabled={isPending}>
            {isPending ? 'กำลังให้ AI สร้างชุดคำถาม...' : 'สร้างคำถาม'}
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="glass-card">
          <h3 style={{ marginBottom: '16px' }}>ตรวจสอบและแก้ไขคำถาม</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            นี่คือชุดคำถามที่ AI สร้างขึ้นให้สำหรับงาน "{eventData?.title}"<br/>
            คุณสามารถแก้ไขข้อความ ลบ หรือเพิ่มคำถามใหม่ได้ตามต้องการ
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {questions.map((q, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ width: '30px', fontWeight: 'bold', paddingTop: '12px' }}>{idx + 1}.</div>
                <input 
                  type="text"
                  className="input-field"
                  style={{ flex: 1, marginBottom: 0 }}
                  value={q}
                  onChange={(e) => updateQuestion(idx, e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => removeQuestion(idx)}
                  style={{ 
                    padding: '12px', background: 'transparent', border: '1px solid var(--danger)', 
                    color: 'var(--danger)', borderRadius: '8px', cursor: 'pointer' 
                  }}
                  title="ลบคำถามนี้"
                >
                  ลบ
                </button>
              </div>
            ))}
          </div>

          <button 
            type="button" 
            onClick={addQuestion}
            style={{ 
              width: '100%', padding: '12px', background: 'transparent', 
              border: '1px dashed var(--primary-color)', color: 'var(--primary-color)', 
              borderRadius: '8px', cursor: 'pointer', marginBottom: '32px' 
            }}
          >
            + เพิ่มคำถามใหม่
          </button>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              className="btn-primary"
              style={{ flex: 1, background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--text-muted)' }}
              disabled={isPending}
            >
              ย้อนกลับ
            </button>
            <button 
              type="button" 
              onClick={handleSave} 
              className="btn-primary"
              style={{ flex: 2 }}
              disabled={isPending}
            >
              {isPending ? 'กำลังบันทึกข้อมูล...' : 'ยืนยันและสร้างแบบประเมิน'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
