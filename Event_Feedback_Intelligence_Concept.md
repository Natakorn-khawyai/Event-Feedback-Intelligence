# Event Feedback Intelligence Platform

## แนวคิดหลัก

เปลี่ยนจากระบบ **Event Feedback & Satisfaction System** ที่เน้นการสร้างแบบสอบถามและสรุปคะแนน  
เป็น **Event Feedback Intelligence Platform** ที่เปลี่ยนความคิดเห็นของผู้เข้าร่วมงานให้กลายเป็น **Insight และ Action** ที่ผู้จัดสามารถนำไปใช้พัฒนางานครั้งต่อไปได้

> **Collect Feedback. Understand People. Improve Events.**  
> เก็บความคิดเห็น → เข้าใจผู้เข้าร่วม → พัฒนางาน

---

# 1. Concept หลัก: Feedback → Insight → Action

ระบบทำงาน 3 ขั้นตอนหลัก

```text
COLLECT
เก็บความคิดเห็น
     ↓
UNDERSTAND
วิเคราะห์ความคิดเห็น
     ↓
ACT
แนะนำสิ่งที่ควรปรับปรุง
```

หรือ

```text
📱 RESPONDENT
     │
     │ คะแนน + ความคิดเห็น
     ↓
📊 DATA
     │
     ├── คะแนน
     ├── ความคิดเห็น
     ├── Topic
     └── Sentiment
     ↓
🧠 AI INSIGHT
     │
     ├── สิ่งที่คนชอบ
     ├── ปัญหาที่พบ
     └── ประเด็นสำคัญ
     ↓
🎯 ACTION
     │
     ├── สิ่งที่ควรรักษา
     ├── สิ่งที่ควรแก้
     └── สิ่งที่ควรทำครั้งหน้า
```

---

# 2. Feature ที่สร้างความแตกต่าง

## 2.1 Why Score?

แทนที่จะบอกเพียงว่า

> การจัดงานได้คะแนนเฉลี่ย 4.2/5

ระบบสามารถตอบต่อว่า

> **ทำไมถึงได้ 4.2/5?**

ตัวอย่าง:

```text
Overall Satisfaction
━━━━━━━━━━━━━━━━━━
⭐ 4.2 / 5

Why?
──────────────────
😊 สถานที่             4.6
😊 วิทยากร             4.5
😐 อาหาร               3.8
☹️ การลงทะเบียน        3.2
```

ระบบนำความคิดเห็นมาวิเคราะห์เพิ่มเติม เช่น

```text
🔴 ประเด็นที่พบมากที่สุด

ผู้เข้าร่วมหลายคนกล่าวถึง
"การลงทะเบียนใช้เวลานาน"

ความคิดเห็นที่พบ:
- รอคิวนาน
- QR ลงทะเบียนช้า
- จุดลงทะเบียนมีน้อย
```

### จุดเด่น

ทำให้ผู้จัดไม่ได้เห็นเพียง "คะแนน" แต่เข้าใจ **สาเหตุที่อยู่เบื้องหลังคะแนน**

---

# 3. AI Insight

เปลี่ยนจาก Feedback Summary แบบธรรมดา เป็นการวิเคราะห์

- Sentiment
- Topic
- Frequency
- Positive Feedback
- Negative Feedback

ตัวอย่าง:

```text
ความคิดเห็นทั้งหมด 500 รายการ
              ↓
         AI วิเคราะห์
              ↓
 ┌────────────┬────────────┐
 │  Positive  │  Negative  │
 │    68%     │    32%     │
 └────────────┴────────────┘
              ↓
        Topic Detection
              ↓
 ┌──────────────────────────┐
 │ วิทยากร       35% 👍     │
 │ สถานที่        27% 👍     │
 │ อาหาร          18% 😐     │
 │ ลงทะเบียน      42% 👎     │
 │ เวลา           25% 👎     │
 └──────────────────────────┘
```

---

# 4. Feedback Priority

ระบบไม่ควรเพียงบอกว่า "มีคนบ่นเรื่องลงทะเบียน"

แต่ควรช่วยจัดลำดับประเด็นที่ควรให้ความสำคัญ

```text
🔴 HIGH PRIORITY
ลงทะเบียนหน้างาน
42% ของความคิดเห็นเชิงลบ

🟠 MEDIUM PRIORITY
อาหาร
23% ของความคิดเห็นเชิงลบ

🟢 LOW PRIORITY
ที่นั่ง
8% ของความคิดเห็นเชิงลบ
```

สามารถออกแบบเป็นแนวคิดของ Priority Score เช่น

```text
Priority Score
=
Frequency × Negative Sentiment × Impact
```

> หมายเหตุ: Priority Score เป็นดัชนีที่ระบบออกแบบขึ้นเพื่อช่วยสรุปข้อมูล ไม่ใช่มาตรฐานสากล

---

# 5. Live Feedback

จุดเด่นอีกอย่างคือการรับ Feedback ระหว่างที่งานกำลังดำเนินอยู่

## ระบบทั่วไป

```text
จัดงาน
 ↓
จบงาน
 ↓
ส่งแบบประเมิน
 ↓
วิเคราะห์
```

## แนวคิดของระบบนี้

```text
จัดงาน
 ↓
📱 Feedback แบบ Real-time
 ↓
🧠 วิเคราะห์
 ↓
🚨 พบปัญหา
 ↓
Organizer เห็นทันที
```

ตัวอย่าง:

> 🚨 Feedback Alert
>
> ช่วง 13:00–14:00  
> มีความคิดเห็นเชิงลบเกี่ยวกับ  
> **"อาหารกลางวัน" เพิ่มขึ้น 32%**

ผู้จัดสามารถรับรู้ปัญหาได้ระหว่างงาน แทนที่จะรอวิเคราะห์หลังจบงาน

---

# 6. Event Health Score

สร้าง Dashboard ที่แสดง "สุขภาพของงาน"

ตัวอย่าง:

```text
        EVENT HEALTH

          82 / 100
             🟢

Satisfaction     88
Engagement       79
Organization     84
Venue            91
Food             67
```

สามารถแสดง Trend ได้

```text
Event Health

100 ┤
 90 ┤       ●
 80 ┤   ●       ●
 70 ┤ ●
 60 ┤
    └────────────────
      Start  Mid  End
```

> Event Health Score เป็นดัชนีที่ระบบคำนวณจากข้อมูลของงานเพื่อช่วยให้ผู้จัดมองภาพรวม ไม่ใช่มาตรฐานหรือคะแนนรับรองคุณภาพงาน

---

# 7. Compare Events

หากผู้จัดมีการจัด Event หลายครั้ง ระบบสามารถเปรียบเทียบผลลัพธ์ระหว่างงานได้

ตัวอย่าง:

```text
            Event #1     Event #2

Overall       3.8          4.4 ↑

Speaker       4.3          4.5
Venue         3.5          4.6 ↑
Food          3.2          3.8 ↑
Registration  3.1          4.2 ↑
```

ระบบสามารถแสดง Insight เช่น

> 💡 คะแนนด้าน Registration เพิ่มขึ้นหลังจากปรับรูปแบบการลงทะเบียน

จุดนี้ช่วยให้ระบบไม่ได้เก็บข้อมูลเพียง Event เดียว แต่สามารถสร้าง **Historical Intelligence**

---

# 8. Smart Question Generation

จากเดิม:

> ผู้จัดระบุจำนวนข้อ → ระบบ Generate คำถาม

สามารถพัฒนาเป็น

> **ประเภทงาน → ระบบสร้างคำถามที่เหมาะกับงาน**

ตัวอย่างประเภทงาน:

```text
ประเภทงาน

○ Seminar
○ Workshop
○ Concert
○ Exhibition
○ Sports Event
○ University Event
○ Conference
○ Other
```

ถ้าเลือก `Workshop` ระบบอาจสร้างคำถาม เช่น

```text
1. ความเหมาะสมของเนื้อหาการอบรม
2. ความชัดเจนของวิทยากร
3. ความเหมาะสมของระยะเวลา
4. ความเหมาะสมของกิจกรรม Workshop
5. ประโยชน์ที่ได้รับจากกิจกรรม
```

ทำให้คำถามมีความเกี่ยวข้องกับบริบทของงานมากกว่าการ Generate แบบทั่วไป

---

# 9. Next Event Recommendations

หลังจากระบบวิเคราะห์ Feedback แล้ว ควรมีส่วนที่ตอบคำถามว่า

> **"ครั้งหน้าควรทำอะไร?"**

ตัวอย่าง:

```text
🎯 RECOMMENDATIONS

1️⃣ ปรับปรุงระบบลงทะเบียน
   เหตุผล: พบ Negative Feedback 42%

2️⃣ เพิ่มจำนวนจุดลงทะเบียน
   เหตุผล: พบคำว่า "รอ", "คิว", "ช้า" บ่อย

3️⃣ รักษาคุณภาพวิทยากร
   เหตุผล: คะแนนเฉลี่ย 4.7/5
```

สามารถแบ่งเป็น

```text
🟢 KEEP
สิ่งที่ควรรักษา

🟡 IMPROVE
สิ่งที่ควรปรับปรุง

🔴 FIX
ปัญหาที่ควรแก้ก่อน
```

---

# 10. Flow ใหม่ของระบบ

```text
                 ORGANIZER
                     │
                     ▼
              Create Event
                     │
                     ▼
             Smart Question
               Generation
                     │
                     ▼
                QR / URL
                     │
                     ▼
               RESPONDENT
                     │
              ┌──────┴──────┐
              │             │
           Rating        Feedback
              │             │
              └──────┬──────┘
                     ▼
                  DATABASE
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Score      Sentiment    Topics
      Analysis     Analysis   Analysis
          │          │          │
          └──────────┼──────────┘
                     ▼
               🧠 AI INSIGHT
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Positive   Problems   Priorities
          │          │          │
          └──────────┼──────────┘
                     ▼
             🎯 ACTION PLAN
                     │
                     ▼
          "ครั้งหน้าควรทำอะไร?"
```

---

# 11. Feature เปรียบเทียบกับระบบทั่วไป

| Feature | ระบบ Survey ทั่วไป | โปรเจคนี้ |
|---|---|---|
| สร้างแบบสอบถาม | ✅ | ✅ |
| QR Code | ✅ | ✅ |
| คะแนน 1–5 | ✅ | ✅ |
| Dashboard | ✅ | ✅ |
| AI สรุป Feedback | บางระบบ | ✅ |
| **Why Score?** | ❌ | ⭐ |
| **Topic Analysis** | ❌ / บางระบบ | ⭐ |
| **Feedback Priority** | ❌ | ⭐ |
| **Live Feedback Alert** | ❌ | ⭐ |
| **Compare Events** | ❌ / บางระบบ | ⭐ |
| **Next Event Recommendation** | ❌ | ⭐ |

---

# 12. จุดขายของ Project

ไม่ควรนำเสนอว่า

> ❌ "เว็บของเราสร้างแบบประเมินความพึงพอใจ"

ควรนำเสนอว่า

> **"เว็บของเราเปลี่ยน Feedback จากผู้เข้าร่วมงานให้กลายเป็น Insight และ Action ที่ผู้จัดสามารถนำไปพัฒนางานครั้งต่อไปได้"**

---

# 13. Product Positioning

## จาก

**Survey System**

```text
สร้างแบบสอบถาม
      ↓
เก็บคำตอบ
      ↓
ดูคะแนน
```

## เป็น

**Feedback Intelligence Platform**

```text
สร้างแบบสอบถาม
      ↓
เก็บ Feedback
      ↓
AI วิเคราะห์
      ↓
หา Insight
      ↓
จัดลำดับปัญหา
      ↓
แนะนำ Action
      ↓
นำไปพัฒนางานครั้งต่อไป
      ↓
Compare Event
      ↺
```

---

# 14. Recommended Core Features

หากมีเวลาพัฒนาไม่มาก แนะนำให้เลือก 5 จุดเป็น Feature หลัก:

1. **Smart Question Generation**
2. **Why Score?**
3. **AI Topic + Sentiment Analysis**
4. **Feedback Priority**
5. **Next Event Recommendations**

ส่วน `Live Feedback`, `Event Health Score` และ `Compare Events` สามารถเป็น Feature ระดับถัดไปได้

---

# 15. Tagline

### English

> **Collect Feedback. Understand People. Improve Events.**

### Thai

> **เก็บความคิดเห็น เข้าใจผู้เข้าร่วม และพัฒนางานครั้งต่อไป**

### Short Pitch

> **From Feedback to Action.**

หรือ

> **ไม่ใช่แค่รู้ว่าคนรู้สึกอย่างไร แต่ช่วยให้รู้ว่าควรทำอะไรต่อ**
