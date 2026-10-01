import { prisma } from '@/lib/prisma';
import SurveyClient from './SurveyClient';
import { notFound } from 'next/navigation';

export default async function SurveyPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      questions: { orderBy: { order: 'asc' } }
    }
  });

  if (!event) notFound();

  return <SurveyClient event={event} questions={event.questions} />;
}
