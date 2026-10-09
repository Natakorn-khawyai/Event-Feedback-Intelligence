import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for "งานเดินชมปลากินหิ้งห้อย"...');

  // 1. Create a Tester User
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'tester@example.com' },
    update: {},
    create: {
      email: 'tester@example.com',
      name: 'Event Tester',
      passwordHash,
    },
  });
  console.log(`✅ User created: ${user.email} (password: password123)`);

  // 2. Create the Event
  const event = await prisma.event.create({
    data: {
      userId: user.id,
      title: 'งานเดินชมปลากินหิ้งห้อย (รอบค่ำ)',
      date: new Date('2026-10-15T19:00:00Z'),
      time: '19:00 - 21:00',
      location: 'สวนพฤกษศาสตร์ริมน้ำ',
      eventType: 'other',
    },
  });
  console.log(`✅ Event created: ${event.title}`);

  // 3. Create Questions
  const questionsList = [
    'ความพึงพอใจโดยรวมต่อการจัด "งานเดินชมปลากินหิ้งห้อย"',
    'ความสวยงามและประสบการณ์ที่ได้รับจากเส้นทางเดินชมธรรมชาติ',
    'ความสะดวกสบายและความปลอดภัยของสถานที่จัดงาน (เช่น การเดินทาง ห้องน้ำ ทางเดิน)',
    'ความชัดเจนของข้อมูลและการให้ความช่วยเหลือจากเจ้าหน้าที่',
    'ความสนใจที่จะกลับมาเข้าร่วมงานลักษณะนี้อีกในอนาคต'
  ];

  const questions = [];
  for (let i = 0; i < questionsList.length; i++) {
    const q = await prisma.question.create({
      data: {
        eventId: event.id,
        text: questionsList[i],
        order: i + 1,
      },
    });
    questions.push(q);
  }
  console.log(`✅ Created ${questions.length} questions`);

  // 4. Generate Mock Responses
  // We'll generate 12 responses (mix of good and bad)
  const feedbacks = [
    { text: "ประทับใจมากครับ บรรยากาศดีมาก เห็นปลากินหิ้งห้อยชัดเจน", scoreBase: 5 },
    { text: "ทางเดินค่อนข้างมืดและแฉะไปหน่อยครับ เกือบสะดุดล้ม แต่กิจกรรมน่าสนใจดี", scoreBase: 3 },
    { text: "สวยมากค่ะ วิทยากรให้ความรู้เรื่องระบบนิเวศดีมาก ได้เห็นของแปลกตาแบบนี้เป็นครั้งแรก", scoreBase: 5 },
    { text: "ยุงเยอะมากกกก และคนแน่นเกินไปทำให้เข้าไปดูใกล้ๆ ไม่ได้เลย ควรจำกัดคนเข้าชมต่อรอบ", scoreBase: 2 },
    { text: "งานจัดได้ดี เจ้าหน้าที่ดูแลตามจุดต่างๆ ทั่วถึง รู้สึกปลอดภัยดีครับ", scoreBase: 4 },
    { text: "หาที่จอดรถยากมากค่ะ ป้ายบอกทางก็ไม่ชัดเจน หลงอยู่ตั้งนาน", scoreBase: 3 },
    { text: "ปลาแอบกินหิ้งห้อยเร็วมาก ถ่ายรูปไม่ค่อยทัน แต่โดยรวมก็สนุกดีครับ", scoreBase: 4 },
    { text: "อยากให้มีไฟส่องสว่างตามทางเดินมากกว่านี้ และเพิ่มจุดพักเหนื่อย", scoreBase: 3 },
    { text: "สุดยอดประสบการณ์เลย! ไม่เคยคิดว่าจะมีกิจกรรมแบบนี้ในเมืองไทย คุ้มค่าตั๋วมาก", scoreBase: 5 },
    { text: "ห้องน้ำอยู่ไกลจากจุดชมวิวมากไปหน่อยค่ะ แต่การจัดงานถือว่าโอเค", scoreBase: 4 },
    { text: "ผิดหวังนิดหน่อย เพราะหิ้งห้อยมีน้อยกว่าที่คิด น่าจะเกิดจากฝนตกก่อนหน้านี้", scoreBase: 2 },
    { text: "เป็นกิจกรรมครอบครัวที่ดีมากครับ เด็กๆ ชอบมาก แนะนำเลย", scoreBase: 5 },
  ];

  let responseCount = 0;
  for (const fb of feedbacks) {
    const response = await prisma.surveyResponse.create({
      data: {
        eventId: event.id,
        respondentIdentifier: `mock-user-${Date.now()}-${Math.random()}`,
        feedback: {
          create: {
            eventId: event.id,
            text: fb.text,
          }
        },
      }
    });

    // Create answers for this response
    for (const q of questions) {
      // Fluctuate score slightly based on the scoreBase
      let actualScore = fb.scoreBase;
      if (Math.random() > 0.5) {
         // +- 1 randomly, but keep between 1 and 5
         actualScore = Math.max(1, Math.min(5, actualScore + (Math.random() > 0.5 ? 1 : -1)));
      }
      
      await prisma.answer.create({
        data: {
          responseId: response.id,
          questionId: q.id,
          score: actualScore,
        }
      });
    }
    responseCount++;
  }
  
  console.log(`✅ Created ${responseCount} mock survey responses with feedback`);
  console.log(`\n🎉 Seed completed successfully!`);
  console.log(`\n👉 TEST INSTRUCTIONS:`);
  console.log(`1. Go to: /auth`);
  console.log(`2. Login with Email: tester@example.com / Password: password123`);
  console.log(`3. Click on the event: "งานเดินชมปลากินหิ้งห้อย"`);
  console.log(`4. Test the AI Insights Generator!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });