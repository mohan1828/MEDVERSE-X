import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface GaugeChartProps {
  score: number;
  label?: string;
  size?: number;
  showConfettiOnMount?: boolean;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  score = 97,
  label = 'Excellent',
  size = 240,
  showConfettiOnMount = false,
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Smooth score animation count-up
    let current = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
        if (showConfettiOnMount) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#00E5FF', '#00FFB2', '#7C3AED'],
          });
        }
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score, showConfettiOnMount]);

  const radius = size * 0.38;
  const strokeWidth = size * 0.08;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      
      {/* Outer Rotating Ambient Glow Ring */}
      <div 
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center"
      >
        <svg className="w-full h-full transform -rotate-90">
          
          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(15, 23, 42, 0.9)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Background Track Border line */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(0, 229, 255, 0.15)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Animated Gradient Gauge Progress Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gauge-gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />

          {/* SVG Gradient Definition */}
          <defs>
            <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="50%" stopColor="#00FFB2" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
            Health Score
          </span>
          <span className="text-5xl lg:text-6xl font-extrabold font-mono text-gradient-cyan tracking-tight my-0.5">
            {displayScore}
          </span>
          <span className="px-3 py-0.5 rounded-full text-xs font-bold font-mono bg-[#00FFB2]/10 border border-[#00FFB2]/40 text-[#00FFB2] uppercase shadow-[0_0_10px_rgba(0,255,178,0.3)]">
            {label}
          </span>
        </div>
      </div>

    </div>
  );
};
