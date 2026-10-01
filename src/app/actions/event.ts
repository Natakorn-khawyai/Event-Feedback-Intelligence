'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.TYPHOON_API_KEY || '',
  baseURL: 'https://api.opentyphoon.ai/v1',
});

// Step 1: Generate Questions via AI
export async function generateEventQuestions(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'กรุณาเข้าสู่ระบบ' };

  const title = formData.get('title') as string;
  const eventType = formData.get('eventType') as string;
  const numQuestions = parseInt(formData.get('numQuestions') as string) || 5;

  if (!title || !eventType) {
    return { error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' };
  }

  let questionsArray: string[] = [];

  try {
    if (!process.env.TYPHOON_API_KEY) {
      throw new Error('No API Key');
    }

    const systemPrompt = `You are an expert event organizer creating a post-event satisfaction survey.
Output ONLY a valid JSON object containing a "questions" array of strings. 
Example: { "questions": ["ความพึงพอใจโดยรวม", "ความเหมาะสมของสถานที่"] }`;
    
    const userPrompt = `Event Title: "${title}"
Event Type: "${eventType}"
Generate exactly ${numQuestions} satisfaction survey questions for this event. 
The questions must be in Thai.
The questions should be rated on a 1-5 scale.`;

    const response = await openai.chat.completions.create({
      model: 'typhoon-v2.5-30b-a3b-instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' }
    });

    const text = response.choices[0].message.content;
    const parsed = JSON.parse(text || '{}');
    questionsArray = parsed.questions || [];
    
    if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
      throw new Error('AI generated invalid format');
    }
  } catch (error) {
    console.error('AI Generation Error:', error);
    // Fallback default questions if AI fails or no key
    questionsArray = [
      'ความพึงพอใจในภาพรวมของการจัดงาน',
      'ความเหมาะสมของสถานที่และสิ่งอำนวยความสะดวก',
      'ความชัดเจนของการสื่อสารและประชาสัมพันธ์',
      'คุณภาพของเนื้อหาหรือกิจกรรมในงาน',
      'โอกาสที่คุณจะแนะนำงานนี้ให้คนรู้จัก',
      'การจัดการระยะเวลาของงาน',
      'คุณภาพของการลงทะเบียนหน้างาน'
    ].slice(0, numQuestions);
  }

  return { questions: questionsArray };
}

// Step 2: Save Event Data and Finalized Questions
export async function saveEvent(eventData: any, questionsArray: string[]) {
  const session = await getSession();
  if (!session) return { error: 'กรุณาเข้าสู่ระบบ' };

  try {
    await prisma.event.create({
      data: {
        userId: session.userId,
        title: eventData.title,
        date: new Date(eventData.date),
        time: eventData.time,
        location: eventData.location,
        eventType: eventData.eventType,
        questions: {
          create: questionsArray.map((qText, index) => ({
            text: qText,
            order: index
          }))
        }
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่' };
  }

  redirect('/dashboard');
}
