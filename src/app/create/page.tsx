'use client';

import { useState, useTransition } from 'react';
import { generateEventQuestions, saveEvent } from '@/app/actions/event';
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
  ArrowRight
} from 'lucide-react';

const eventCategories = [
  { id: 'seminar', label: 'งานสัมมนา / อบรม' },
  { id: 'concert', label: 'คอนเสิร์ต / การแสดง' },
  { id: 'sports', label: 'กีฬา / วิ่ง / สุขภาพ' },
  { id: 'exhibition', label: 'นิทรรศการ / แสดงผลงาน' },
  { id: 'workshop', label: 'เวิร์กช็อป / การเรียนรู้' },
  { id: 'other', label: 'อื่นๆ / ทั่วไป' },
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
  const [locationValue, setLocationValue] = useState('บน Website');

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const validCount = Math.max(1, numQuestions || 5);
    formData.set('eventType', selectedType === 'all' ? 'other' : selectedType);
    formData.set('numQuestions', validCount.toString());

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
    <div className="fade-up" style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '48px' }}>
      {/* Desktop Header */}
      <div style={{ marginBottom: '22px' }}>
        <h1
          style={{
            fontSize: 'clamp(26px, 3.2vw, 34px)',
            fontWeight: '900',
            color: 'var(--text-primary)',
            margin: '0 0 6px 0',
            letterSpacing: '-0.025em',
          }}
        >
          {step === 1 ? 'สร้างแบบประเมินความพึงพอใจ' : 'ตรวจสอบและปรับแต่งคำถาม'}
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          {step === 1
            ? 'กรอกข้อมูลกิจกรรมของคุณ เพื่อให้ AI ช่วยออกแบบชุดคำถามความพึงพอใจ 5 ระดับที่ตรงกับงานอัตโนมัติ'
            : `AI ได้ร่างคำถามสำหรับ "${eventData?.title || ''}" แล้ว (${questions.length} ข้อ) คุณสามารถแก้ไข เพิ่ม หรือลบคำถามได้ตามต้องการ`}
        </p>
      </div>

      {/* Modern Desktop Stepper Indicator */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '26px',
        }}
      >
        <div
          style={{
            padding: '14px 20px',
            borderRadius: '14px',
            background: step === 1 ? 'var(--accent-pink-hot)' : 'rgba(255, 255, 255, 0.8)',
            color: step === 1 ? '#FFFFFF' : 'var(--text-secondary)',
            border: step === 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
            fontWeight: '700',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: step === 1 ? '0 4px 14px rgba(232, 70, 124, 0.25)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          <span
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: step === 1 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: '800',
            }}
          >
            1
          </span>
          <span>ข้อมูลงานกิจกรรม</span>
        </div>

        <div
          style={{
            padding: '14px 20px',
            borderRadius: '14px',
            background: step === 2 ? 'var(--accent-pink-hot)' : 'rgba(255, 255, 255, 0.8)',
            color: step === 2 ? '#FFFFFF' : 'var(--text-secondary)',
            border: step === 2 ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
            fontWeight: '700',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: step === 2 ? '0 4px 14px rgba(232, 70, 124, 0.25)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          <span
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: step === 2 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: '800',
            }}
          >
            2
          </span>
          <span>ชุดคำถาม AI ({numQuestions} ข้อ)</span>
        </div>

        <div
          style={{
            padding: '14px 20px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.45)',
            color: 'var(--text-muted)',
            border: '1.5px dashed rgba(0, 0, 0, 0.12)',
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
            }}
          >
            3
          </span>
          <span>QR Code & เผยแพร่</span>
        </div>
      </div>

      {error && (
        <div style={{
          padding: '14px 18px',
          background: 'rgba(239, 68, 68, 0.08)',
          color: 'var(--status-danger)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontSize: '15px',
          fontWeight: '600',
          marginBottom: '22px',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* STEP 1: EVENT DETAILS FORM */}
      {step === 1 && (
        <form onSubmit={handleGenerate} className="surface-card" style={{ padding: '34px 38px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-pink-pastel)',
              color: 'var(--accent-pink-hot)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Sparkles size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                กำหนดรายละเอียดงาน
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                AI จะนำข้อมูลนี้ไปออกแบบคำถามความพึงพอใจที่สอดคล้องที่สุด
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                ชื่องานกิจกรรม *
              </label>
              <input
                name="title"
                type="text"
                className="input-modern"
                placeholder="เช่น งานสัมมนา AI เพื่อธุรกิจ 2026 หรือ งานประเมินเว็บไซต์"
                required
                defaultValue={eventData?.title}
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* 2-Column Responsive Row on Desktop */}
            <div className="form-desktop-row-2">
              <div>
                <label style={{ display: 'block', fontSize: '15px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  วันที่จัดงาน *
                </label>
                <input
                  name="date"
                  type="date"
                  className="input-modern"
                  required
                  defaultValue={eventData?.date}
                  style={{ fontSize: '16px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '15px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  เวลา (ถ้ามี)
                </label>
                <input
                  name="time"
                  type="time"
                  className="input-modern"
                  defaultValue={eventData?.time}
                  style={{ fontSize: '16px' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                  สถานที่จัดงาน *
                </label>
              </div>
              <input
                name="location"
                type="text"
                className="input-modern"
                placeholder="เช่น บน Website หรือ อาคารศูนย์ประชุม"
                required
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                style={{ fontSize: '16px' }}
              />

              {/* Quick Preset Location Chips */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                {[
                  { label: 'บน Website', value: 'บน Website' },
                  { label: 'ออนไลน์ / Zoom', value: 'ออนไลน์ (Zoom / Meet)' },
                  { label: 'อาคารศูนย์ประชุม', value: 'อาคารศูนย์ประชุม' },
                  { label: 'สวนหลวง ร.9', value: 'สวนหลวง ร.9' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setLocationValue(item.value)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontWeight: '700',
                      backgroundColor: locationValue === item.value ? 'var(--accent-pink-pastel)' : 'rgba(255, 255, 255, 0.85)',
                      color: locationValue === item.value ? 'var(--accent-pink-hot)' : 'var(--text-secondary)',
                      border: locationValue === item.value ? '1.5px solid var(--accent-pink-hot)' : '1px solid rgba(0, 0, 0, 0.08)',
                      cursor: 'pointer',
                      boxShadow: locationValue === item.value ? '0 2px 6px rgba(232, 70, 124, 0.2)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Text Selection Pills */}
            <div style={{ marginTop: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                  เลือกหมวดหมู่ประเภทงาน  *
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {eventCategories.map((cat) => {
                  const isSelected = selectedType === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedType(cat.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease-out',
                        backgroundColor: isSelected ? 'var(--accent-pink-hot)' : 'rgba(255, 255, 255, 0.85)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                        border: isSelected ? '1.5px solid var(--accent-pink-hot)' : '1.5px solid rgba(138, 138, 154, 0.22)',
                        boxShadow: isSelected
                          ? '0 4px 14px rgba(232, 70, 124, 0.3)'
                          : '0 2px 6px rgba(0, 0, 0, 0.03)',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      <span>{cat.label}</span>
                      {isSelected && (
                        <Check size={15} strokeWidth={2.8} style={{ marginLeft: '2px' }} />
                      )}
                    </button>
                  );
                })}
              </div>

              <input type="hidden" name="eventType" value={selectedType} />
            </div>

            {/* Stepper for Quantity of Questions (− 5 +) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)',
              marginTop: '6px',
            }}>
              <div>
                <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', display: 'block' }}>
                  จำนวนข้อคำถาม
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  แนะนำ 3 - 7 ข้อ เพื่อความกระชับและตอบง่าย
                </span>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                backgroundColor: 'rgba(31, 31, 46, 0.05)',
                padding: '6px 14px',
                borderRadius: '999px',
              }}>
                <button
                  type="button"
                  onClick={() => setNumQuestions(prev => Math.max(1, (prev || 1) - 1))}
                  aria-label="ลดจำนวนคำถาม"
                  style={{
                    width: '32px',
                    height: '32px',
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
                  <Minus size={16} strokeWidth={2} />
                </button>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={numQuestions || ''}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw === '') {
                      setNumQuestions(0);
                    } else {
                      const val = parseInt(raw, 10);
                      if (!isNaN(val)) {
                        setNumQuestions(Math.min(20, Math.max(0, val)));
                      }
                    }
                  }}
                  onBlur={() => {
                    if (!numQuestions || numQuestions < 1) {
                      setNumQuestions(1);
                    }
                  }}
                  aria-label="จำนวนคำถามที่ต้องการ"
                  style={{
                    width: '46px',
                    height: '32px',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    outline: 'none',
                    padding: '0',
                    transition: 'all 0.15s ease',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setNumQuestions(prev => Math.min(20, (prev || 0) + 1))}
                  aria-label="เพิ่มจำนวนคำถาม"
                  style={{
                    width: '32px',
                    height: '32px',
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
                  <Plus size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-cta"
              style={{ width: '100%', marginTop: '10px', padding: '16px 24px', fontSize: '16px' }}
              disabled={isPending}
            >
              {isPending ? (
                <span>กำลังให้ AI ออกแบบคำถาม...</span>
              ) : (
                <>
                  <Sparkles size={18} strokeWidth={2} />
                  <span>สร้างคำถามด้วย AI</span>
                  <ArrowRight size={18} strokeWidth={2} />
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
            marginBottom: '18px',
          }}>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                ชุดคำถามความพึงพอใจ
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                สำหรับ "{eventData?.title}" ({questions.length} ข้อ)
              </p>
            </div>
            <span style={{
              backgroundColor: 'var(--badge-mint)',
              color: 'var(--badge-mint-text)',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Sparkles size={14} strokeWidth={2} />
              <span>AI Generated</span>
            </span>
          </div>

          {/* Questions Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="surface-card fade-up"
                style={{
                  padding: '20px 22px',
                  borderRadius: 'var(--radius-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-pink-pastel)',
                      color: 'var(--accent-pink-hot)',
                      fontSize: '14px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: '700' }}>
                      ประเมิน 1 - 5 คะแนน (Star Rating)
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
                    <Trash2 size={18} strokeWidth={1.8} />
                  </button>
                </div>

                <input
                  type="text"
                  className="input-modern"
                  value={q}
                  onChange={(e) => updateQuestion(idx, e.target.value)}
                  placeholder="พิมพ์ข้อความคำถาม..."
                  style={{ minHeight: '48px', fontSize: '16px' }}
                />
              </div>
            ))}

            {/* Dashed Add Slot Tile */}
            <DashedAddTile
              label="เพิ่มคำถามข้อถัดไป"
              sublabel="กดเพื่อเพิ่มคำถามแบบพิมพ์เอง"
              onClick={addQuestion}
              minHeight={90}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary"
              style={{ flex: 1, fontSize: '16px', padding: '15px' }}
            >
              ย้อนกลับไปแก้ไขข้อมูลงาน
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-cta"
              style={{ flex: 2, fontSize: '16px', padding: '15px' }}
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
