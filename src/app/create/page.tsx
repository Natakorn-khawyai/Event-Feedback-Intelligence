'use client';

import { useState, useTransition } from 'react';
import { generateEventQuestions, saveEvent } from '@/app/actions/event';
import TopBar from '@/components/ui/TopBar';
import ColorSwatch, { ColorOption } from '@/components/ui/ColorSwatch';
import DashedAddTile from '@/components/ui/DashedAddTile';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Minus, 
  Trash2, 
  Check, 
  ArrowRight,
  HelpCircle,
  Heart
} from 'lucide-react';

const eventTypeSwatches: ColorOption[] = [
  { id: 'seminar', label: 'งานสัมมนา', color: '#E8467C' }, // magenta
  { id: 'concert', label: 'คอนเสิร์ต', color: '#FF6B6B' }, // red
  { id: 'sports', label: 'กีฬา / วิ่ง', color: '#4ECDC4' }, // teal
  { id: 'exhibition', label: 'นิทรรศการ', color: '#C7A4E8' }, // lilac
  { id: 'other', label: 'อื่นๆ', color: '#FFB347' }, // orange
];

export default function CreateEventPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Selected event type swatch
  const [selectedType, setSelectedType] = useState('seminar');
  const [numQuestions, setNumQuestions] = useState(5);

  // States to hold step 1 data
  const [eventData, setEventData] = useState<any>(null);
  const [questions, setQuestions] = useState<string[]>([]);

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('eventType', selectedType === 'all' ? 'other' : selectedType);
    formData.set('numQuestions', numQuestions.toString());

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
          eventType: formData.get('eventType'),
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
    <div className="fade-up">
      <TopBar
        title={step === 1 ? 'สร้างแบบประเมิน' : 'ตรวจสอบคำถาม'}
        showBack={true}
        onBack={() => {
          if (step === 2) setStep(1);
          else window.location.href = '/dashboard';
        }}
        showSearch={false}
        showMic={false}
      />

      {/* Top Tabs: Step indicators like Flowers, Leaves, Ribbons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {/* Tab 1 */}
        <div style={{
          flex: 1,
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          background: step === 1 ? 'var(--accent-pink-hot)' : 'var(--surface-white)',
          color: step === 1 ? '#FFFFFF' : 'var(--text-secondary)',
          border: step === 1 ? 'none' : '1px solid var(--border-glass)',
          fontWeight: '700',
          fontSize: '13px',
          textAlign: 'center',
          boxShadow: step === 1 ? 'var(--shadow-pill)' : '0 2px 6px rgba(0,0,0,0.02)',
          transition: 'all 0.15s ease',
          whiteSpace: 'nowrap',
        }}>
          1. ข้อมูลงาน
        </div>

        {/* Tab 2 */}
        <div style={{
          flex: 1,
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          background: step === 2 ? 'var(--accent-pink-hot)' : 'var(--surface-white)',
          color: step === 2 ? '#FFFFFF' : 'var(--text-secondary)',
          border: step === 2 ? 'none' : '1px solid var(--border-glass)',
          fontWeight: '700',
          fontSize: '13px',
          textAlign: 'center',
          boxShadow: step === 2 ? 'var(--shadow-pill)' : '0 2px 6px rgba(0,0,0,0.02)',
          transition: 'all 0.15s ease',
          whiteSpace: 'nowrap',
        }}>
          2. ชุดคำถาม AI
        </div>

        {/* Tab 3 Preview */}
        <div style={{
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255,255,255,0.4)',
          color: 'var(--text-muted)',
          border: '1.5px dashed #CBD5E1',
          fontWeight: '600',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
        }}>
          + QR Code
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

      {/* STEP 1: EVENT DETAILS & AI GENERATOR CONFIG */}
      {step === 1 && (
        <form onSubmit={handleGenerate} className="surface-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-pink-pastel)',
              color: 'var(--accent-pink-hot)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Sparkles size={16} strokeWidth={2} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                กำหนดรายละเอียดงาน
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>
                AI จะนำข้อมูลนี้ไปออกแบบคำถามที่สอดคล้องที่สุด
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                ชื่องานกิจกรรม *
              </label>
              <input
                name="title"
                type="text"
                className="input-modern"
                placeholder="เช่น งานวิ่งมาราธอน 2026 หรือ งานเปิดตัวสินค้า"
                required
                defaultValue={eventData?.title}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  วันที่จัดงาน *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    name="date"
                    type="date"
                    className="input-modern"
                    required
                    defaultValue={eventData?.date}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  เวลา (ถ้ามี)
                </label>
                <input
                  name="time"
                  type="time"
                  className="input-modern"
                  defaultValue={eventData?.time}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                สถานที่จัดงาน *
              </label>
              <input
                name="location"
                type="text"
                className="input-modern"
                placeholder="เช่น อาคารศูนย์ประชุม หรือ สวนหลวง ร.9"
                required
                defaultValue={eventData?.location}
              />
            </div>

            {/* Color Swatch / Category Filter Row */}
            <div style={{ marginTop: '8px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                เลือกโทนประเภทงาน (Color Swatches)
              </label>
              <ColorSwatch
                colors={eventTypeSwatches}
                selectedId={selectedType}
                onSelect={(id) => setSelectedType(id)}
                showAllOption={false}
              />
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'var(--badge-pink)',
                color: 'var(--badge-pink-text)',
                fontSize: '11px',
                fontWeight: '700',
              }}>
                หมวดที่เลือก: {eventTypeSwatches.find(s => s.id === selectedType)?.label || 'อื่นๆ'}
              </div>
            </div>

            {/* Stepper for Quantity of Questions (− 5 +) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)',
              marginTop: '4px',
            }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', display: 'block' }}>
                  จำนวนข้อคำถาม
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  แนะนำ 3 - 7 ข้อ เพื่อความกระชับ
                </span>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(31, 31, 46, 0.05)',
                padding: '4px 10px',
                borderRadius: '999px',
              }}>
                <button
                  type="button"
                  onClick={() => setNumQuestions(prev => Math.max(1, prev - 1))}
                  aria-label="ลดจำนวนคำถาม"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  <Minus size={14} strokeWidth={2} />
                </button>
                <span style={{ fontSize: '15px', fontWeight: '800', minWidth: '20px', textAlign: 'center' }}>
                  {numQuestions}
                </span>
                <button
                  type="button"
                  onClick={() => setNumQuestions(prev => Math.min(15, prev + 1))}
                  aria-label="เพิ่มจำนวนคำถาม"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'var(--accent-pink-hot)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(232,70,124,0.3)',
                  }}
                >
                  <Plus size={14} strokeWidth={2} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-cta"
              style={{ width: '100%', marginTop: '10px', padding: '16px' }}
              disabled={isPending}
            >
              {isPending ? (
                <span>กำลังให้ AI ออกแบบคำถาม...</span>
              ) : (
                <>
                  <Sparkles size={16} strokeWidth={2} />
                  <span>สร้างคำถามด้วย AI ({numQuestions} ข้อ)</span>
                  <ArrowRight size={16} strokeWidth={2} />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: REVIEW & EDIT QUESTIONS */}
      {step === 2 && (
        <div>
          {/* Section Title Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
          }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                ชุดคำถามความพึงพอใจ
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                สำหรับ "{eventData?.title}" ({questions.length} ข้อ)
              </p>
            </div>
            <span style={{
              backgroundColor: 'var(--badge-mint)',
              color: 'var(--badge-mint-text)',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: '700',
            }}>
              AI Generated
            </span>
          </div>

          {/* Item List / Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="surface-card fade-up"
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-pink-pastel)',
                      color: 'var(--accent-pink-hot)',
                      fontSize: '12px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                      ประเมิน 1 - 5 คะแนน
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeQuestion(idx)}
                    aria-label="ลบคำถามนี้"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--status-danger)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Trash2 size={16} strokeWidth={1.8} />
                  </button>
                </div>

                <input
                  type="text"
                  className="input-modern"
                  value={q}
                  onChange={(e) => updateQuestion(idx, e.target.value)}
                  placeholder="พิมพ์ข้อความคำถาม..."
                  style={{ minHeight: '44px', fontSize: '14px' }}
                />
              </div>
            ))}

            {/* Dashed Add Slot Tile for new question */}
            <DashedAddTile
              label="เพิ่มคำถามข้อถัดไป"
              sublabel="กดเพื่อเพิ่มคำถามแบบพิมพ์เอง"
              onClick={addQuestion}
              minHeight={90}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              ย้อนกลับ
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-cta"
              style={{ flex: 2 }}
              disabled={isPending}
            >
              {isPending ? 'กำลังบันทึกงาน...' : 'บันทึก & สร้าง QR Code'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
