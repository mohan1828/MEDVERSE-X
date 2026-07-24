import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Zap } from 'lucide-react';
import type { OrganData } from '../../data/mockPatientData';

interface DigitalTwinCanvasProps {
  organs: Record<string, OrganData>;
  selectedOrganId: string;
  onSelectOrgan: (id: string) => void;
}

export const DigitalTwinCanvas: React.FC<DigitalTwinCanvasProps> = ({
  organs,
  selectedOrganId,
  onSelectOrgan,
}) => {
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  const organCoordinates: Record<string, { top: string; left: string; icon: string }> = {
    brain: { top: '14%', left: '50%', icon: '🧠' },
    lungs: { top: '32%', left: '50%', icon: '🫁' },
    heart: { top: '36%', left: '44%', icon: '❤️' },
    liver: { top: '47%', left: '56%', icon: '🧪' },
    kidney: { top: '56%', left: '46%', icon: '💧' },
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-emerald-500',
          border: 'border-emerald-400',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.8)]',
          text: 'text-emerald-400',
          badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        };
      case 'yellow':
        return {
          bg: 'bg-amber-400',
          border: 'border-amber-300',
          glow: 'shadow-[0_0_20px_rgba(251,191,36,0.8)]',
          text: 'text-amber-400',
          badge: 'bg-amber-400/10 border-amber-400/30 text-amber-300',
        };
      case 'orange':
        return {
          bg: 'bg-orange-500',
          border: 'border-orange-400',
          glow: 'shadow-[0_0_25px_rgba(249,115,22,0.8)]',
          text: 'text-orange-400',
          badge: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
        };
      case 'red':
        return {
          bg: 'bg-rose-600',
          border: 'border-rose-400',
          glow: 'shadow-[0_0_30px_rgba(225,29,72,0.9)] animate-pulse',
          text: 'text-rose-400',
          badge: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
        };
      default:
        return {
          bg: 'bg-[#00E5FF]',
          border: 'border-[#00E5FF]',
          glow: 'shadow-cyan-glow',
          text: 'text-[#00E5FF]',
          badge: 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00E5FF]',
        };
    }
  };

  const selectedOrgan = organs[selectedOrganId] || organs['heart'];
  const activeColor = getStatusColor(selectedOrgan.color);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      
      {/* 3D Human Hologram Display Column */}
      <div className="lg:col-span-7 relative flex items-center justify-center p-6 glass-panel rounded-3xl min-h-[520px] overflow-hidden">
        
        {/* Holographic scanning laser line */}
        <motion.div
          animate={{ y: [0, 420, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_15px_#00E5FF] z-10 pointer-events-none opacity-70"
        />

        {/* Outer Cyber Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Human Silhouette Wireframe Vector */}
        <div className="relative w-[280px] h-[480px] flex items-center justify-center">
          <svg viewBox="0 0 200 400" className="w-full h-full text-[#00E5FF]/30 drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
            <path d="M 100,20 C 120,20 135,35 135,55 C 135,75 120,85 100,88 C 80,85 65,75 65,55 C 65,35 80,20 100,20 Z" fill="rgba(0, 229, 255, 0.03)" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1.5" />
            <path d="M 90,88 L 90,105 L 110,105 L 110,88" fill="none" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1.5" />
            
            <path d="M 90,105 L 45,120 L 35,210 L 55,210 L 65,145 L 75,250 L 65,370 L 85,370 L 95,270 L 105,270 L 115,370 L 135,370 L 125,250 L 135,145 L 145,210 L 165,210 L 155,120 L 110,105 Z" 
                  fill="rgba(0, 229, 255, 0.04)" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="1.5" strokeDasharray="4 2" />

            <line x1="100" y1="105" x2="100" y2="270" stroke="rgba(0, 255, 178, 0.5)" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 75,135 Q 100,145 125,135" fill="none" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1" />
            <path d="M 72,155 Q 100,165 128,155" fill="none" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1" />
            <path d="M 74,175 Q 100,185 126,175" fill="none" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1" />
          </svg>

          {/* Clickable Organ Hotspots */}
          {Object.entries(organs).map(([id, organ]) => {
            const pos = organCoordinates[id] || { top: '50%', left: '50%', icon: '✨' };
            const isSelected = selectedOrganId === id;
            const isHovered = hoveredOrgan === id;
            const colors = getStatusColor(organ.color);

            return (
              <div
                key={id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => onSelectOrgan(id)}
                onMouseEnter={() => setHoveredOrgan(id)}
                onMouseLeave={() => setHoveredOrgan(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              >
                <motion.div
                  animate={{ scale: isSelected ? [1, 1.4, 1] : 1 }}
                  transition={{ duration: 1.5, repeat: isSelected ? Infinity : 0 }}
                  className={`w-10 h-10 rounded-full border-2 ${colors.border} ${colors.bg}/20 flex items-center justify-center ${colors.glow} transition-all duration-300`}
                >
                  <span className="text-sm select-none">{pos.icon}</span>
                </motion.div>

                <AnimatePresence>
                  {(isHovered || isSelected) && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.9 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-3 py-1 rounded-lg bg-slate-900/95 border border-[#00E5FF]/40 text-xs font-mono shadow-cyan-glow flex items-center gap-1.5 z-30"
                    >
                      <span className={`w-2 h-2 rounded-full ${colors.bg}`} />
                      <span className="text-white font-semibold">{organ.name}</span>
                      <span className={`font-bold ${colors.text}`}>{organ.score}%</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Organ Selector Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 overflow-x-auto py-2">
          {Object.entries(organs).map(([id, organ]) => {
            const isSelected = selectedOrganId === id;
            const colors = getStatusColor(organ.color);
            return (
              <button
                key={id}
                onClick={() => onSelectOrgan(id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all border ${
                  isSelected
                    ? `${colors.bg} text-black font-bold border-white shadow-lg`
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-[#00E5FF]/40'
                }`}
              >
                <span>{organCoordinates[id]?.icon}</span>
                <span className="capitalize">{id}</span>
                <span className="opacity-80">({organ.score}%)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Organ Detail Drawer */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        
        <motion.div
          key={selectedOrgan.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel-glow p-6 rounded-3xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-[#00E5FF]/30 flex items-center justify-center text-2xl shadow-cyan-glow">
                {organCoordinates[selectedOrgan.id]?.icon || '🧬'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                  {selectedOrgan.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border uppercase font-semibold ${activeColor.badge}`}>
                    Status: {selectedOrgan.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className={`text-3xl font-extrabold font-mono tracking-tight ${activeColor.text}`}>
                {selectedOrgan.score}
                <span className="text-sm text-slate-400 font-normal">/100</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Health Index</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
            {selectedOrgan.summary}
          </p>

          <div className="space-y-2.5 mb-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Cellular Telemetry Metrics
            </h4>
            {selectedOrgan.metrics.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#00E5FF]/30 transition-colors">
                <div>
                  <div className="text-xs font-medium text-slate-200">{m.label}</div>
                  <div className="text-[10px] text-slate-400">{m.detail}</div>
                </div>
                <div className="text-sm font-bold font-mono text-[#00FFB2]">{m.value}</div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold mb-1">
              <Info className="w-3.5 h-3.5 text-[#00E5FF]" />
              Explainable AI (XAI) Reasoning
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedOrgan.xaiReasoning}
            </p>
          </div>
        </motion.div>

      </div>

    </div>
  );
};
