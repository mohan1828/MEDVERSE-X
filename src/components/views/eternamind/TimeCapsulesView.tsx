import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Gift, Video, Volume2, Sparkles } from 'lucide-react';
import { mockEternaMindData } from '../../../data/mockEternaMindData';

export const TimeCapsulesView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-400" />
            Future Knowledge & Time Capsules
          </h2>
          <p className="text-xs text-slate-300 font-mono mt-0.5">
            Scheduled Wisdom & Legacy Messages Released Upon Specified Future Life Milestones
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
          2 Active Scheduled Capsules
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockEternaMindData.timeCapsules.map((tc) => (
          <motion.div
            key={tc.id}
            whileHover={{ y: -4 }}
            className="glass-panel p-6 rounded-3xl space-y-4 border border-purple-500/20 hover:border-purple-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold">
                  <Lock className="w-4 h-4 text-[#00E5FF]" />
                  <span>Release: {tc.targetEvent}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-mono">
                  {tc.scheduledUnlock}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{tc.title}</h3>
              <p className="text-xs text-slate-300 font-mono">Recipient: <strong className="text-[#00FFB2]">{tc.recipient}</strong></p>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono uppercase text-[#00E5FF] font-bold">Encrypted Letter Excerpt</div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{tc.letterExcerpt}"
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono space-y-1">
                <div className="text-purple-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00FFB2]" />
                  Key Wisdom Principle
                </div>
                <p className="text-slate-200">{tc.keyAdvice}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                {tc.hasVideo && <span className="text-[#00E5FF] flex items-center gap-1"><Video className="w-3.5 h-3.5" /> Video</span>}
                {tc.hasVoice && <span className="text-[#00FFB2] flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> Audio</span>}
              </div>
              <span className="text-slate-400">Status: <strong className="text-amber-400 uppercase">{tc.status}</strong></span>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
};
