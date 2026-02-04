"use client";

import { useMemo } from "react";

export default function Home() {
  // สุ่มตำแหน่ง/ดีเลย์ของหัวใจลอย
  const hearts = useMemo(
    () =>
      Array.from({ length: 22 }).map(() => ({
        left: Math.random() * 100, // %
        size: 16 + Math.random() * 26, // px
        delay: Math.random() * 6, // s
        duration: 6 + Math.random() * 8, // s
        opacity: 0.4 + Math.random() * 0.6,
        rotate: Math.random() * 40 - 20, // deg
      })),
    []
  );

  // สุ่มจุดวิ้ง
  const sparkles = useMemo(
    () =>
      Array.from({ length: 28 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.7,
      })),
    []
  );

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[radial-gradient(1200px_800px_at_50%_-10%,rgba(255,0,153,0.25),transparent),radial-gradient(1000px_600px_at_100%_110%,rgba(255,255,255,0.08),transparent),#0b0b10] text-white">
      {/* glow พื้นหลัง */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]">
        <div className="absolute -top-1/4 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[100px]" />
        <div className="absolute -bottom-1/4 right-0 h-[60vmax] w-[60vmax] rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      {/* หัวใจลอย (SVG) */}
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((h, idx) => (
          <div
            key={idx}
            className="absolute will-change-transform animate-float"
            style={{
              left: `${h.left}%`,
              bottom: -40,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              opacity: h.opacity,
              transform: `rotate(${h.rotate}deg)`,
              filter: "drop-shadow(0 0 10px rgba(255,120,170,0.45))",
              width: h.size,
              height: h.size,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                {/* ให้ id ไม่ชนกันโดยอิงจาก index */}
                <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6fa9" />
                  <stop offset="100%" stopColor="#ff3366" />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                   C13.09 3.81 14.76 3 16.5 3
                   19.58 3 22 5.42 22 8.5
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`url(#grad-${idx})`}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* วิ้ง/ประกาย */}
      <div className="pointer-events-none absolute inset-0">
        {sparkles.map((s, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white/80 animate-twinkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              boxShadow: "0 0 12px 3px rgba(255,255,255,0.25)",
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* เนื้อหากลางจอ */}
      <main className="relative z-10 grid min-h-dvh place-items-center px-6">
        <div className="text-center">
          <h1 className="select-none text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-transparent bg-clip-text bg-[linear-gradient(120deg,#fff,75%,#ff8bd5)] drop-shadow-[0_6px_24px_rgba(255,120,170,0.20)] animate-shine">
            นอทรักรันม่าง้าบ
          </h1>

        <p className="mt-6 text-base sm:text-lg text-white/70">
            รักงับอ้วงงง 💜
          </p>
        </div>
      </main>

      {/* CSS สำหรับเอฟเฟกต์ */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.9) rotate(0deg);
          }
          50% {
            transform: translateY(-50vh) scale(1.05) rotate(5deg);
          }
          100% {
            transform: translateY(-100vh) scale(0.9) rotate(0deg);
          }
        }
        .animate-float {
          animation-name: floatUp;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            transform: scale(0.7);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        .animate-twinkle {
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        /* แอนิเมชันเงาวาวไหลผ่านตัวอักษร */
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shine {
          background-size: 200% 100%;
          animation: shine 3.2s linear infinite;
          text-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
