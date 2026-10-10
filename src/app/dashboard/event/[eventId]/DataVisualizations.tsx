'use client';

import { useState, useMemo } from 'react';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Star, Filter } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  order: number;
  avg?: string;
}

interface ResponseAnswer {
  questionId: string;
  score: number;
}

interface SurveyResponse {
  id: string;
  answers: ResponseAnswer[];
}

export default function DataVisualizations({
  questions,
  responses,
  totalAvg,
}: {
  questions: Question[];
  responses: SurveyResponse[];
  totalAvg: string;
}) {
  const [activeTab, setActiveTab] = useState<'bar' | 'pie'>('bar');
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('all');

  // Calculate score distribution (1 to 5 stars)
  const scoreDistribution = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalAnswers = 0;

    responses.forEach((r) => {
      r.answers.forEach((a) => {
        if (selectedQuestionId === 'all' || a.questionId === selectedQuestionId) {
          if (a.score >= 1 && a.score <= 5) {
            counts[a.score as 1 | 2 | 3 | 4 | 5]++;
            totalAnswers++;
          }
        }
      });
    });

    const colors = {
      5: { fill: '#10B981', label: '5 ดาว (ดีเยี่ยม)' },
      4: { fill: '#60A5FA', label: '4 ดาว (ดีมาก)' },
      3: { fill: '#EAB308', label: '3 ดาว (ปานกลาง)' },
      2: { fill: '#8B5CF6', label: '2 ดาว (พอใช้)' },
      1: { fill: '#F43F5E', label: '1 ดาว (ควรปรับปรุง)' },
    };

    const segments = ([5, 4, 3, 2, 1] as const).map((score) => {
      const count = counts[score];
      const percent = totalAnswers > 0 ? (count / totalAnswers) * 100 : 0;
      return {
        score,
        count,
        percent,
        color: colors[score].fill,
        label: colors[score].label,
      };
    });

    return { segments, totalAnswers };
  }, [responses, selectedQuestionId]);

  // Donut chart geometry calculations
  const donutData = useMemo(() => {
    const size = 220;
    const strokeWidth = 30;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let accumulatedPercent = 0;
    const arcs = scoreDistribution.segments.map((item) => {
      const strokeDasharray = `${(item.percent / 100) * circumference} ${circumference}`;
      const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
      accumulatedPercent += item.percent;

      return {
        ...item,
        strokeDasharray,
        strokeDashoffset,
      };
    });

    return { size, radius, strokeWidth, arcs, circumference };
  }, [scoreDistribution]);

  if (responses.length === 0) {
    return null;
  }

  return (
    <div className="surface-card" style={{ marginBottom: '28px', padding: '26px 30px' }}>
      {/* Header and Tab Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(232, 70, 124, 0.1)',
              color: 'var(--accent-pink-hot)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <TrendingUp size={22} strokeWidth={2.4} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              Interactive Data Visualizations
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: '3px 0 0 0' }}>
              แผนภูมิวิเคราะห์คะแนนและความพึงพอใจแบบอินเทอร์แอ็กทีฟ (คะแนนเต็ม 5 คะแนน)
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            padding: '5px',
            borderRadius: 'var(--radius-full)',
            gap: '6px',
          }}
        >
          <button
            onClick={() => setActiveTab('bar')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: '13.5px',
              fontWeight: '700',
              cursor: 'pointer',
              backgroundColor: activeTab === 'bar' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'bar' ? 'var(--accent-pink-hot)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'bar' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <BarChart3 size={16} strokeWidth={2.2} />
            <span>กราฟแท่ง (Bar Chart)</span>
          </button>

          <button
            onClick={() => setActiveTab('pie')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: '13.5px',
              fontWeight: '700',
              cursor: 'pointer',
              backgroundColor: activeTab === 'pie' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'pie' ? 'var(--accent-pink-hot)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'pie' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <PieChartIcon size={16} strokeWidth={2.2} />
            <span>แผนภูมิวงกลม (Donut / Pie)</span>
          </button>
        </div>
      </div>

      {/* 1. Bar Chart View */}
      {activeTab === 'bar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {questions.map((q, idx) => {
            const avgNum = parseFloat(q.avg || '0');
            const percentWidth = Math.min(100, Math.max(0, (avgNum / 5.0) * 100));

            return (
              <div
                key={q.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: '1px solid rgba(232, 70, 124, 0.12)',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                }}
              >
                {/* Header matching Image 1: Pink circle index + Question title on left, Pink pill with star on right */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '14px',
                    gap: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-pink-pastel)',
                        color: 'var(--accent-pink-hot)',
                        fontSize: '14px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      style={{
                        fontSize: '15.5px',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        lineHeight: '1.4',
                      }}
                    >
                      {q.text}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(232, 70, 124, 0.08)',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      flexShrink: 0,
                    }}
                  >
                    <Star size={16} fill="var(--accent-pink-hot)" color="var(--accent-pink-hot)" />
                    <span style={{ fontSize: '16.5px', fontWeight: '800', color: 'var(--accent-pink-hot)' }}>
                      {q.avg || '0.0'}
                    </span>
                  </div>
                </div>

                {/* Progress bar container (enlarged height to 13px) */}
                <div
                  style={{
                    height: '13px',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${percentWidth}%`,
                      background: 'linear-gradient(90deg, #FF6B97 0%, #E8467C 60%, #9B87F5 100%)',
                      borderRadius: '999px',
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Interactive Donut / Pie Chart View */}
      {activeTab === 'pie' && (
        <div>
          {/* Question Filter Dropdown */}
          <div style={{ marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-secondary)' }}>
              กรองตามคำถาม:
            </span>
            <select
              value={selectedQuestionId}
              onChange={(e) => setSelectedQuestionId(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(232, 70, 124, 0.25)',
                backgroundColor: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="all">⭐ ทุกข้อคำถามรวมกัน ({scoreDistribution.totalAnswers} คำตอบ)</option>
              {questions.map((q, idx) => (
                <option key={q.id} value={q.id}>
                  ข้อ {idx + 1}: {q.text}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '28px',
              padding: '12px 0',
            }}
          >
            {/* SVG Interactive Donut Chart */}
            <div style={{ position: 'relative', width: donutData.size, height: donutData.size }}>
              <svg width={donutData.size} height={donutData.size} viewBox={`0 0 ${donutData.size} ${donutData.size}`}>
                <g transform={`rotate(-90 ${donutData.size / 2} ${donutData.size / 2})`}>
                  {/* Base background circle */}
                  <circle
                    cx={donutData.size / 2}
                    cy={donutData.size / 2}
                    r={donutData.radius}
                    fill="none"
                    stroke="rgba(0, 0, 0, 0.04)"
                    strokeWidth={donutData.strokeWidth}
                  />

                  {/* Colored Arc Segments */}
                  {donutData.arcs.map((arc) => (
                    <circle
                      key={arc.score}
                      cx={donutData.size / 2}
                      cy={donutData.size / 2}
                      r={donutData.radius}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth={hoveredScore === arc.score ? donutData.strokeWidth + 4 : donutData.strokeWidth}
                      strokeDasharray={arc.strokeDasharray}
                      strokeDashoffset={arc.strokeDashoffset}
                      style={{
                        cursor: 'pointer',
                        transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
                        opacity: hoveredScore === null || hoveredScore === arc.score ? 1 : 0.45,
                      }}
                      onMouseEnter={() => setHoveredScore(arc.score)}
                      onMouseLeave={() => setHoveredScore(null)}
                    />
                  ))}
                </g>
              </svg>

              {/* Center Readout */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                {hoveredScore !== null ? (
                  <>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>
                      {hoveredScore} ดาว
                    </span>
                    <span style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-primary)' }}>
                      {scoreDistribution.segments.find((s) => s.score === hoveredScore)?.percent.toFixed(1)}%
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {scoreDistribution.segments.find((s) => s.score === hoveredScore)?.count} คน
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>
                      คะแนนเฉลี่ย
                    </span>
                    <span style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent-pink-hot)' }}>
                      {totalAvg}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>เต็ม 5 คะแนน</span>
                  </>
                )}
              </div>
            </div>

            {/* Legend Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '240px' }}>
              {scoreDistribution.segments.map((item) => (
                <div
                  key={item.score}
                  onMouseEnter={() => setHoveredScore(item.score)}
                  onMouseLeave={() => setHoveredScore(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 14px',
                    borderRadius: '12px',
                    backgroundColor: hoveredScore === item.score ? 'rgba(232, 70, 124, 0.08)' : 'rgba(255, 255, 255, 0.75)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {item.label}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{item.count}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '46px', textAlign: 'right' }}>
                      ({item.percent.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
