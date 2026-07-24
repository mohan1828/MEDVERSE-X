import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, ArrowRight, ShieldCheck } from 'lucide-react';

interface EternaHeroSectionProps {
  onStartLegacy: () => void;
  onExploreDemo: () => void;
}

export const EternaHeroSection: React.FC<EternaHeroSectionProps> = ({
  onStartLegacy,
  onExploreDemo,
}) => {
  return (
    <div className="relative overflow-hidden glass-panel-glow p-8 lg:p-12 rounded-3xl space-y-6">
      
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00E5FF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-6 text-left">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-mono text-purple-300 shadow-purple-glow"
        >
          <Brain className="w-4 h-4 text-[#00E5FF] animate-pulse" />
          <span>The World's First Living Cognitive Legacy Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
        >
          Your Knowledge Should <span className="text-gradient-purple">Never Disappear.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl"
        >
          Preserve the wisdom you choose to share through an AI-powered Cognitive Legacy that helps future generations learn from your experiences, values, and decision-making frameworks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onStartLegacy}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#00E5FF] to-[#00FFB2] text-white font-bold text-sm tracking-wide shadow-purple-glow flex items-center gap-2 group"
          >
            <Brain className="w-5 h-5" />
            <span>Create Cognitive Legacy</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onExploreDemo}
            className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm border border-purple-500/40 flex items-center gap-2 shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#00FFB2]" />
            <span>Explore Demo</span>
          </motion.button>
        </motion.div>

        <div className="pt-4 flex items-center gap-2 text-xs font-mono text-slate-400">
          <ShieldCheck className="w-4 h-4 text-[#00FFB2]" />
          <span>Voluntary & Sovereign • Built strictly from user-contributed records • Zero consciousness claims</span>
        </div>

      </div>

    </div>
  );
};
