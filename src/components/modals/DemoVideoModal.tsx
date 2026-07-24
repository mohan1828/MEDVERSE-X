import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Sparkles } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl glass-panel-glow p-6 lg:p-8 rounded-3xl space-y-6 overflow-hidden border border-[#00E5FF]/40 shadow-cyan-glow"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF]">
                <Play className="w-5 h-5 fill-[#00E5FF]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">MEDVERSE-X Platform Showcase</h2>
                <p className="text-xs text-slate-400 font-mono">
                  Autonomous Digital Twin Healthcare Super Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col items-center justify-center space-y-4 p-6">
            <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] shadow-cyan-glow animate-pulse">
              <Sparkles className="w-8 h-8 text-[#00FFB2]" />
            </div>

            <div className="text-center space-y-1">
              <div className="text-lg font-bold text-white tracking-wide">
                Interactive Bio-Twin Simulation Active
              </div>
              <p className="text-xs text-slate-300 max-w-md font-mono">
                MEDVERSE-X continuously predicts disease onset 15 years prior to clinical symptoms using sub-cellular AI multi-omics streams.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-[#00E5FF]">
                ✓ 3D Holographic Globe
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-[#00FFB2]">
                ✓ What-If Outcome Engine
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-purple-400">
                ✓ Medical RAG Citations
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] text-black font-bold text-xs uppercase tracking-wider shadow-cyan-glow"
            >
              Close Showcase
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
