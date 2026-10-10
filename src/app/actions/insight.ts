'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.TYPHOON_API_KEY || '',
  baseURL: 'https://api.opentyphoon.ai/v1',
});

export async function generateInsight(eventId: string) {
  const session = await getSession();
  if (!session) return { error: 'กรุณาเข้าสู่ระบบ' };

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        responses: {
          include: { feedback: true, answers: true }
        },
        questions: { orderBy: { order: 'asc' } }
      }
    });

    if (!event) return { error: 'ไม่พบข้อมูลงาน' };

    const feedbacks = event.responses
      .map(r => r.feedback?.text)
      .filter(t => t && t.trim().length > 0);

    if (feedbacks.length === 0) {
      return { error: 'ยังไม่มีข้อเสนอแนะแบบข้อความให้วิเคราะห์' };
    }

    if (!process.env.TYPHOON_API_KEY) {
      return { error: 'กรุณาตั้งค่า TYPHOON_API_KEY ในไฟล์ .env' };
    }

    // Calculate averages for context
    const questionAverages = event.questions.map(q => {
      const answersForQ = event.responses.flatMap(r => r.answers.filter(a => a.questionId === q.id));
      const avg = answersForQ.length > 0 
        ? (answersForQ.reduce((sum, a) => sum + a.score, 0) / answersForQ.length).toFixed(1)
        : '0.0';
      return `${q.text}: ${avg}/5`;
    });

    const allAnswers = await prisma.answer.findMany({
      where: { response: { eventId } }
    });
    const avgScore = allAnswers.length > 0 ? (allAnswers.reduce((sum, a) => sum + a.score, 0) / allAnswers.length).toFixed(1) : '0';
    const totalResp = event.responses.length;

    const systemPrompt = `You are an expert AI Event Analytics Specialist. Analyze event feedback accurately and objectively.`;
    
    const userPrompt = `
    วิเคราะห์ข้อมูลประเมินผลงานกิจกรรมต่อไปนี้:
    
    [ข้อมูลงาน]
    - ชื่องาน: ${event.title}
    - คะแนนเฉลี่ยรวม: ${avgScore} / 5.0
    - จำนวนผู้ตอบทั้งหมด: ${totalResp} คน
    
    [ชุดข้อมูลคะแนนเฉลี่ยแยกหมวด]
    ${questionAverages.join('\n')}
    
    [ข้อเสนอแนะแบบข้อความจากผู้เข้าร่วมงานทั้งหมด]
    ${feedbacks.map((f, i) => `${i + 1}. ${f}`).join('\n')}
    
    กรุณาวิเคราะห์และส่งกลับผลลัพธ์เป็น JSON โครงสร้างดังนี้เท่านั้น (ไม่ต้องมีฟิลด์อื่น):
    {
      "keep": "สรุปสิ่งที่ทำได้ดีและควรคงไว้ในครั้งหน้า โดยแยกเป็นข้อๆ (bullet points 2-3 ข้อ เริ่มต้นแต่ละข้อด้วย • และขึ้นบรรทัดใหม่ เช่น • ข้อ 1\\n• ข้อ 2)",
      "improve": "สรุปสิ่งที่ควรปรับปรุง โดยแยกเป็นข้อๆ (bullet points 2-3 ข้อ เริ่มต้นแต่ละข้อด้วย • และขึ้นบรรทัดใหม่ เช่น • ข้อ 1\\n• ข้อ 2)",
      "fix": "สรุปปัญหาหลักที่ต้องแก้ไขอย่างเร่งด่วน โดยแยกเป็นข้อๆ (bullet points 1-3 ข้อ เริ่มต้นแต่ละข้อด้วย • และขึ้นบรรทัดใหม่ เช่น • ข้อ 1\\n• ข้อ 2)"
    }
    `;

    const response = await openai.chat.completions.create({
      model: 'typhoon-v2.5-30b-a3b-instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const text = response.choices[0].message.content || '{}';
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error:", e, "Text:", text);
      return { error: 'ข้อความตอบกลับจาก AI ยาวเกินไป (โดนตัดกลางคัน) กรุณาลองใหม่อีกครั้ง' };
    }

    const formatField = (val: any) => {
      if (Array.isArray(val)) {
        return val.map((v) => `• ${v.replace(/^[•\-\*\d\.\s]+/, '')}`).join('\n');
      }
      return typeof val === 'string' ? val : '-';
    };

    const keepStr = formatField(result.keep);
    const improveStr = formatField(result.improve);
    const fixStr = formatField(result.fix);

    await prisma.eventInsight.upsert({
      where: { eventId },
      update: {
        keep: keepStr,
        improve: improveStr,
        fix: fixStr,
        whyScore: `ได้คะแนนเฉลี่ย ${avgScore}/5 จากผู้ตอบทั้งหมด ${totalResp} คน`
      },
      create: {
        eventId,
        keep: keepStr,
        improve: improveStr,
        fix: fixStr,
        whyScore: `ได้คะแนนเฉลี่ย ${avgScore}/5 จากผู้ตอบทั้งหมด ${totalResp} คน`
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error('Insight Generation Error:', error);
    return { error: `เกิดข้อผิดพลาดจาก AI: ${error?.message || 'ไม่ทราบสาเหตุ'}` };
  }
}
