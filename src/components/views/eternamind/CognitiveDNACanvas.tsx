import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Sparkles, BookOpen } from 'lucide-react';
import { mockEternaMindData } from '../../../data/mockEternaMindData';

export const CognitiveDNACanvas: React.FC = () => {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-purple-glow">
            <Dna className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Cognitive DNA Engine Profile</h2>
            <p className="text-xs text-slate-300 font-mono">
              Structured Neural Blueprint Derived Exclusively From User-Documented Decisions
            </p>
          </div>
        </div>

        <div className="text-right text-xs font-mono text-[#00FFB2]">
          <div>98% Neural Blueprint Precision</div>
          <div className="text-slate-400">342 Contributed Records</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEternaMindData.cognitiveDNA.map((dna, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="glass-panel p-6 rounded-3xl space-y-4 border border-purple-500/20 hover:border-purple-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase text-[#00E5FF] font-bold">
                  {dna.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30 text-[#00FFB2] text-[10px] font-mono font-bold">
                  {dna.confidence}% Confidence
                </span>
              </div>

              <h3 className="text-lg font-bold text-white leading-tight">
                {dna.trait}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {dna.description}
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00FFB2]" />
                  Documented Proof Examples
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {dna.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Derived from <strong className="text-slate-200">{dna.sourcesCount} Verified Sources</strong></span>
              <BookOpen className="w-3.5 h-3.5 text-[#00E5FF]" />
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
};
