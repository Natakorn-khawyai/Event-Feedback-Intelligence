'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const CUTE_PHRASES = [
  'ยินดีที่ได้พบกันนะคับ! ✨',
  'พร้อมสรุปข้อมูลให้ทุกเมื่อเลยนะ! 📝',
  'กดปุ่ม "วิเคราะห์ AI" ได้เลยคับ! 💡',
  'กำลังรอฟีดแบ็กจากทุกคนอยู่น้า~ 💖',
  'แตะผมอีกทีสิ สนุกจัง! 😆',
  'วันนี้งานต้องออกมาดีแน่นอนคับ! 🌟',
  'AI ตัวจิ๋วพร้อมประมวลผลแล้ว! 🤖',
  'เก็บทุกคะแนน ทุกข้อเสนอแนะครบ! 📊',
];

const THINKING_PHRASES = [
  'กำลังอ่านทุกข้อคิดเห็นอย่างตั้งใจ... 🔍',
  'กำลังสังเคราะห์ใจความสำคัญให้อยู่นะคับ... 🧠',
  'ใกล้เสร็จแล้ว เตรียมพบกับข้อมูลเชิงลึกได้เลย! 💡',
  'กำลังตรวจจับความรู้สึกและคะแนนเฉลี่ย... ✨',
];

interface SparkleParticle {
  id: number;
  emoji: string;
  dx: string;
  dy: string;
  rot: string;
}

export default function InteractiveMascot({
  isThinking = false,
  hasResponses = false,
  onTriggerGenerate,
}: {
  isThinking?: boolean;
  hasResponses?: boolean;
  onTriggerGenerate?: () => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isJelly, setIsJelly] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Play subtle cute chime
  const playCutePop = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Audio permission or unsupported - ignore silently
    }
  }, []);

  // Cycle thinking phrases when thinking
  useEffect(() => {
    if (!isThinking) return;
    setShowSpeech(true);
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % THINKING_PHRASES.length;
      setSpeechIndex(idx);
    }, 2800);
    return () => clearInterval(interval);
  }, [isThinking]);

  // Handle 3D mouse parallax tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || isThinking) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({
      x: Math.max(-1, Math.min(1, x)) * 14,
      y: Math.max(-1, Math.min(1, y)) * -14,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Click interaction: Jelly Bounce + Sparkles + Speech Bubble
  const handleClick = () => {
    if (isThinking) return;

    // Trigger jelly physics
    setIsJelly(true);
    setTimeout(() => setIsJelly(false), 550);

    // Play chime sound
    playCutePop();

    // Spawn sparkles
    const emojis = ['✨', '💖', '⭐', '✦', '🌸', '💫'];
    const newSparkles: SparkleParticle[] = Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * (360 / 6) + Math.random() * 30) * (Math.PI / 180);
      const dist = 45 + Math.random() * 35;
      return {
        id: Date.now() + i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        dx: `${Math.cos(angle) * dist}px`,
        dy: `${Math.sin(angle) * dist - 15}px`,
        rot: `${(Math.random() - 0.5) * 60}deg`,
      };
    });

    setSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((p) => !newSparkles.find((n) => n.id === p.id)));
    }, 900);

    // Show Speech Bubble
    setSpeechIndex((prev) => (prev + 1) % CUTE_PHRASES.length);
    setShowSpeech(true);

    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setShowSpeech(false);
    }, 3500);

    // If has responses, can also nudge or call trigger
    if (hasResponses && onTriggerGenerate) {
      // Optional subtle trigger callback
    }
  };

  const currentSpeech = isThinking
    ? THINKING_PHRASES[speechIndex % THINKING_PHRASES.length]
    : CUTE_PHRASES[speechIndex % CUTE_PHRASES.length];

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isThinking ? 'wait' : 'pointer',
        padding: '16px',
        userSelect: 'none',
        perspective: '800px',
      }}
      title={isThinking ? 'น้อง AI กำลังประมวลผล...' : 'คลิกเพื่อทักทายและเล่นกับน้อง AI! ✨'}
    >
      {/* Speech Bubble */}
      {showSpeech && (
        <div className="mascot-speech-bubble" style={{ transformOrigin: 'bottom center' }}>
          {currentSpeech}
        </div>
      )}

      {/* Sparkle burst particles */}
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="mascot-sparkle"
          style={
            {
              top: '50%',
              left: '50%',
              fontSize: '16px',
              '--dx': sparkle.dx,
              '--dy': sparkle.dy,
              '--rot': sparkle.rot,
            } as React.CSSProperties
          }
        >
          {sparkle.emoji}
        </span>
      ))}

      {/* Halo glow when thinking */}
      {isThinking && <div className="mascot-halo" />}

      {/* 3D Tilt Wrapper */}
      <div
        style={{
          transform: isThinking
            ? 'none'
            : `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: isJelly ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)',
          transformStyle: 'preserve-3d',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Mascot Main Container */}
        <div
          className={
            isThinking
              ? 'mascot-thinking-bounce'
              : isJelly
              ? 'mascot-jelly-active'
              : 'mascot-organic-float'
          }
          style={{
            width: '125px',
            height: '140px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: isThinking
              ? 'drop-shadow(0 12px 24px rgba(232, 70, 124, 0.45)) drop-shadow(0 0 16px rgba(155, 135, 245, 0.5))'
              : 'drop-shadow(0 10px 20px rgba(232, 70, 124, 0.22))',
            transition: 'filter 0.3s ease',
          }}
        >
          {/* Holographic scanner beam during thinking */}
          {isThinking && <div className="mascot-scanner-line" />}

          {/* SVG Mascot */}
          <img
            src="/images/presentation-deck-mascot.svg"
            alt="น้อง AI มารอคำตอบ"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Dynamic Ground Shadow that reacts to height & breathing */}
        <div
          className={isThinking ? 'mascot-thinking-bounce' : 'mascot-shadow-pulse'}
          style={{
            width: '85px',
            height: '12px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(160, 110, 140, 0.45) 0%, rgba(200, 150, 180, 0.15) 55%, transparent 75%)',
            marginTop: '-6px',
            filter: 'blur(1.5px)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Subtle Hint badge when hover */}
      {!isThinking && !showSpeech && (
        <span
          style={{
            marginTop: '8px',
            fontSize: '11px',
            fontWeight: '700',
            color: 'var(--text-tertiary, #998FA0)',
            opacity: 0.75,
            transition: 'opacity 0.2s ease',
          }}
        >
          ✨ แตะน้องเพื่อทักทาย
        </span>
      )}
    </div>
  );
}
