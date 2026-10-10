'use client';

import { useState } from 'react';
import { FileText, FileSpreadsheet, Download, Printer, Check } from 'lucide-react';

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
  createdAt: Date | string;
  respondentIdentifier: string;
  answers: ResponseAnswer[];
  feedback?: { text: string } | null;
}

interface ExportSystemProps {
  eventTitle: string;
  eventDate: string | Date;
  eventLocation?: string | null;
  totalResponses: number;
  totalAvg: string;
  questions: Question[];
  responses: SurveyResponse[];
  insight?: {
    whyScore?: string | null;
    keep?: string | null;
    improve?: string | null;
    fix?: string | null;
  } | null;
}

export default function ExportSystem({
  eventTitle,
  eventDate,
  eventLocation,
  totalResponses,
  totalAvg,
  questions,
  responses,
  insight,
}: ExportSystemProps) {
  const [downloadingCsv, setDownloadingCsv] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // 1. Export as Excel / CSV with UTF-8 BOM for perfect Thai language display
  const handleExportCSV = () => {
    if (responses.length === 0) {
      alert('ยังไม่มีข้อมูลการตอบแบบสอบถามสำหรับส่งออก');
      return;
    }
    setDownloadingCsv(true);

    try {
      // Build CSV headers
      const headers = [
        'ลำดับ',
        'วันเวลาที่ตอบ',
        ...questions.map((q, idx) => `ข้อ ${idx + 1}: ${q.text}`),
        'ข้อเสนอแนะเพิ่มเติม',
      ];

      // Build CSV rows
      const rows = responses.map((res, index) => {
        const dateStr = new Date(res.createdAt).toLocaleString('th-TH');
        const scores = questions.map((q) => {
          const ans = res.answers.find((a) => a.questionId === q.id);
          return ans ? ans.score : '-';
        });
        const feedbackText = res.feedback?.text ? `"${res.feedback.text.replace(/"/g, '""')}"` : '""';

        return [index + 1, `"${dateStr}"`, ...scores, feedbackText].join(',');
      });

      // Include Summary Statistics at bottom
      const emptyCols = new Array(questions.length).fill('');
      const avgCols = questions.map((q) => q.avg || '0.0');

      rows.push('');
      rows.push(['---', '--- สรุปภาพรวม ---', ...emptyCols, '---'].join(','));
      rows.push(['คะแนนเฉลี่ยรายข้อ', '', ...avgCols, ''].join(','));
      rows.push(['คะแนนเฉลี่ยรวมทุกข้อ', totalAvg, ...emptyCols, `ผู้ตอบทั้งหมด ${totalResponses} คน`].join(','));

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const cleanFileName = eventTitle.replace(/[\\/:*?"<>|]/g, '_');
      link.setAttribute('href', url);
      link.setAttribute('download', `${cleanFileName}_รายงานฟีดแบ็ก.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export CSV error:', err);
      alert('เกิดข้อผิดพลาดในการส่งออกไฟล์ Excel/CSV');
    } finally {
      setTimeout(() => setDownloadingCsv(false), 800);
    }
  };

  // 2. Export as Official PDF Report via formatted Print View
  const handleExportPDF = () => {
    setDownloadingPdf(true);

    const formattedDate = new Date(eventDate).toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const questionsHtml = questions
      .map(
        (q, idx) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #E5E7EB; text-align: center; width: 40px; font-weight: bold; color: #E8467C;">${idx + 1}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #E5E7EB; color: #1F2937;">${q.text}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #E5E7EB; text-align: right; width: 90px; font-weight: bold; color: #E8467C; font-size: 15px;">⭐ ${q.avg || '0.0'}</td>
        </tr>
      `
      )
      .join('');

    const feedbacks = responses
      .filter((r) => r.feedback?.text && r.feedback.text.trim().length > 0)
      .map((r) => r.feedback!.text);

    const feedbacksHtml =
      feedbacks.length > 0
        ? feedbacks
            .map(
              (f) => `
            <li style="margin-bottom: 8px; color: #4B5563; line-height: 1.5; padding-left: 4px;">
              "${f}"
            </li>
          `
            )
            .join('')
        : '<p style="color: #9CA3AF; font-style: italic;">ยังไม่มีข้อเสนอแนะเพิ่มเติม</p>';

    const formatBulletsHtml = (text?: string | null) => {
      if (!text || text === '-') return '';
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      let items =
        lines.length > 1 || lines.some((l) => /^[•\-\*\d\.]/.test(l))
          ? lines.map((l) => l.replace(/^[•\-\*\d\.\s]+/, '').trim()).filter(Boolean)
          : text.split(/(?<=[^\s])(?:\s*(?:พร้อมทั้ง|รวมถึง|ทั้งนี้|นอกจากนี้|อย่างไรก็ตาม|อีกทั้ง)\s*|(?:\.\s+))/).map((s) => s.trim()).filter((s) => s.length > 4);
      if (items.length === 0) items = [text];
      return `<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #374151; line-height: 1.5;">${items
        .map((it) => `<li style="margin-bottom: 4px;">${it}</li>`)
        .join('')}</ul>`;
    };

    const insightHtml = insight
      ? `
      <div style="background: #FDF2F8; border: 1.5px solid #FBCFE8; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; color: #9D174D; font-size: 16px; font-weight: bold;">
          🤖 สรุปข้อมูลเชิงลึกจาก AI (AI Intelligence Summary)
        </h3>
        ${
          insight.whyScore
            ? `<div style="margin-bottom: 12px;"><strong style="color: #831843;">💡 ภาพรวมความคิดเห็น:</strong> ${formatBulletsHtml(insight.whyScore)}</div>`
            : ''
        }
        ${
          insight.keep
            ? `<div style="margin-bottom: 12px;"><strong style="color: #065F46;">✅ จุดแข็งที่ควรรักษาไว้ (Keep Doing):</strong> ${formatBulletsHtml(insight.keep)}</div>`
            : ''
        }
        ${
          insight.improve
            ? `<div style="margin-bottom: 12px;"><strong style="color: #92400E;">💡 จุดที่ควรพัฒนา (Areas for Improvement):</strong> ${formatBulletsHtml(insight.improve)}</div>`
            : ''
        }
        ${
          insight.fix
            ? `<div><strong style="color: #9E1C48;">⚠️ ปัญหาที่ต้องแก้ไขด่วน (Critical Fixes):</strong> ${formatBulletsHtml(insight.fix)}</div>`
            : ''
        }
      </div>
    `
      : '';

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('กรุณาอนุญาตให้เบราว์เซอร์เปิดหน้าต่าง Pop-up เพื่อพิมพ์รายงาน PDF');
      setDownloadingPdf(false);
      return;
    }

    const reportHtml = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="utf-8">
        <title>รายงานผลฟีดแบ็ก - ${eventTitle}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700;800&display=swap');
          body {
            font-family: 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 36px 48px;
            color: #1F2937;
            background: #FFFFFF;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            size: A4;
            margin: 15mm;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #F3F4F6;
            padding-bottom: 20px;
            margin-bottom: 24px;
          }
          .brand-logo {
            font-size: 20px;
            font-weight: 800;
            color: #E8467C;
            letter-spacing: -0.02em;
          }
          .event-title {
            font-size: 26px;
            font-weight: 800;
            margin: 8px 0;
            color: #111827;
          }
          .meta-info {
            font-size: 13px;
            color: #6B7280;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 24px;
          }
          .stat-card {
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
          }
          .stat-num {
            font-size: 28px;
            font-weight: 800;
            color: #E8467C;
            margin: 4px 0;
          }
          .stat-label {
            font-size: 12px;
            font-weight: 600;
            color: #4B5563;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          th {
            background: #F3F4F6;
            padding: 10px 12px;
            font-weight: 700;
            font-size: 13px;
            color: #374151;
            text-align: left;
            border-bottom: 2px solid #E5E7EB;
          }
          .feedback-section {
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            padding: 18px;
            margin-bottom: 24px;
          }
          .footer {
            margin-top: 40px;
            border-top: 1px solid #E5E7EB;
            padding-top: 12px;
            font-size: 11px;
            color: #9CA3AF;
            display: flex;
            justify-content: space-between;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand-logo">✨ Event Feedback Intelligence</div>
            <h1 class="event-title">${eventTitle}</h1>
            <div class="meta-info">
              📅 วันที่จัดกิจกรรม: ${formattedDate} ${eventLocation ? `• 📍 สถานที่: ${eventLocation}` : ''}
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 11px; color: #9CA3AF;">พิมพ์เมื่อ: ${new Date().toLocaleDateString('th-TH')}</span>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-label">คะแนนเฉลี่ยความพึงพอใจรวม</div>
            <div class="stat-num">${totalAvg} <span style="font-size: 14px; font-weight: normal; color: #6B7280;">/ 5.0</span></div>
            <div style="font-size: 12px; color: #10B981; font-weight: 600;">ประเมินจากทุกข้อคำถาม</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">จำนวนผู้ร่วมทำแบบสอบถาม</div>
            <div class="stat-num">${totalResponses} <span style="font-size: 14px; font-weight: normal; color: #6B7280;">คน</span></div>
            <div style="font-size: 12px; color: #6366F1; font-weight: 600;">การตอบกลับที่สมบูรณ์</div>
          </div>
        </div>

        ${insightHtml}

        <h3 style="font-size: 16px; font-weight: 800; margin: 0 0 10px 0; color: #111827;">
          📊 ผลคะแนนประเมินรายข้อคำถาม (${questions.length} ข้อ)
        </h3>
        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">ลำดับ</th>
              <th>หัวข้อการประเมิน</th>
              <th style="width: 90px; text-align: right;">คะแนนเฉลี่ย</th>
            </tr>
          </thead>
          <tbody>
            ${questionsHtml}
          </tbody>
        </table>

        <div class="feedback-section">
          <h3 style="font-size: 15px; font-weight: 800; margin: 0 0 10px 0; color: #111827;">
            💬 ข้อเสนอแนะเพิ่มเติมจากผู้เข้าร่วม (${feedbacks.length} ความคิดเห็น)
          </h3>
          <ul style="margin: 0; padding-left: 20px;">
            ${feedbacksHtml}
          </ul>
        </div>

        <div class="footer">
          <span>รายงานผลจัดทำโดยระบบ Event Feedback Intelligence</span>
          <span>เอกสารทางการสำหรับการประเมินผล</span>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();
    setDownloadingPdf(false);
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      {/* Export PDF Button */}
      <button
        onClick={handleExportPDF}
        disabled={downloadingPdf || totalResponses === 0}
        title="พิมพ์รายงานสรุปผล หรือบันทึกเป็น PDF สวยงาม"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '11px 22px',
          borderRadius: 'var(--radius-full)',
          border: '1.5px solid rgba(232, 70, 124, 0.3)',
          backgroundColor: '#FFFFFF',
          color: 'var(--accent-pink-hot)',
          fontSize: '15px',
          fontWeight: '700',
          cursor: totalResponses > 0 ? 'pointer' : 'not-allowed',
          opacity: totalResponses > 0 ? 1 : 0.55,
          boxShadow: '0 3px 12px rgba(232, 70, 124, 0.12)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (totalResponses > 0) {
            e.currentTarget.style.backgroundColor = 'var(--accent-pink-pastel)';
            e.currentTarget.style.borderColor = 'var(--accent-pink-hot)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          if (totalResponses > 0) {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = 'rgba(232, 70, 124, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        <FileText size={18} strokeWidth={2.2} />
        <span>{downloadingPdf ? 'กำลังเตรียมเอกสาร...' : 'ส่งออก PDF'}</span>
      </button>

      {/* Export Excel / CSV Button */}
      <button
        onClick={handleExportCSV}
        disabled={downloadingCsv || totalResponses === 0}
        title="ดาวน์โหลดข้อมูลดิบเป็นไฟล์ Excel (.csv) รองรับภาษาไทย 100%"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '11px 22px',
          borderRadius: 'var(--radius-full)',
          border: '1.5px solid rgba(16, 185, 129, 0.3)',
          backgroundColor: '#FFFFFF',
          color: '#059669',
          fontSize: '15px',
          fontWeight: '700',
          cursor: totalResponses > 0 ? 'pointer' : 'not-allowed',
          opacity: totalResponses > 0 ? 1 : 0.55,
          boxShadow: '0 3px 12px rgba(16, 185, 129, 0.12)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (totalResponses > 0) {
            e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            e.currentTarget.style.borderColor = '#10B981';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          if (totalResponses > 0) {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        <FileSpreadsheet size={18} strokeWidth={2.2} />
        <span>{downloadingCsv ? 'กำลังดาวน์โหลด...' : 'ส่งออก Excel / CSV'}</span>
      </button>
    </div>
  );
}
