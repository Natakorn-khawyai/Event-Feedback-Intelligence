'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function submitSurvey(eventId: string, respondentIdentifier: string, scores: { [key: string]: number }, feedbackText: string) {
  try {
    const existing = await prisma.surveyResponse.findFirst({
      where: { eventId, respondentIdentifier }
    });
    
    if (existing) {
      return { error: 'คุณได้ทำแบบประเมินนี้ไปแล้วในเครื่องนี้' };
    }

    const answersData = Object.entries(scores).map(([qId, score]) => ({
      questionId: qId,
      score: score
    }));

    await prisma.surveyResponse.create({
      data: {
        eventId,
        respondentIdentifier,
        answers: {
          create: answersData
        },
        feedback: feedbackText ? {
          create: {
            eventId,
            text: feedbackText
          }
        } : undefined
      }
    });

  } catch (error) {
    console.error('Survey Submission Error:', error);
    return { error: 'ไม่สามารถบันทึกข้อมูลได้' };
  }

  redirect('/thankyou');
}
