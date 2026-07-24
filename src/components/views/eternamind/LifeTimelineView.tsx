import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Heart, Lightbulb, ArrowUpRight, Volume2, Image, ShieldCheck } from 'lucide-react';
import { mockEternaMindData } from '../../../data/mockEternaMindData';

export const LifeTimelineView: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredEvents = mockEternaMindData.lifeTimeline.filter((ev) => {
    if (filter === 'all') return true;
    return ev.category === filter;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00E5FF]" />
            Interactive Life & Wisdom Timeline
          </h2>
          <p className="text-xs text-slate-300 font-mono mt-0.5">
            Chronological Archive of Key Life Decisions, Emotional Context, and Learned Principles
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {['all', 'career', 'family', 'crisis', 'innovation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-xl uppercase font-bold transition-all border ${
                filter === cat
                  ? 'bg-purple-600 text-white border-purple-400 shadow-purple-glow'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-purple-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 relative pl-6 border-l-2 border-purple-500/30">
        {filteredEvents.map((ev) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 rounded-3xl space-y-4 relative border border-purple-500/20 hover:border-purple-500/50 transition-all"
          >
            <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-purple-500 border-2 border-white shadow-purple-glow" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-[#00E5FF] font-bold">
                  {ev.date} • {ev.location}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{ev.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                {ev.hasAudio && (
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-mono flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-[#00FFB2]" /> Audio Note
                  </span>
                )}
                {ev.hasMedia && (
                  <span className="px-2.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-mono flex items-center gap-1">
                    <Image className="w-3 h-3 text-[#00E5FF]" /> Photo Record
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-4 h-4 text-purple-400" />
                <span>People: <strong>{ev.people.join(', ')}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Emotions: <strong>{ev.emotions.join(', ')}</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1">
              <div className="text-xs font-mono uppercase text-purple-300 font-bold flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#00FFB2]" />
                Primary Lesson Learned
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                "{ev.lessonLearned}"
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-xs">
              <div className="font-mono text-[#00E5FF] font-bold flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-[#00E5FF]" />
                Influence on Subsequent Life Choices
              </div>
              <p className="text-slate-300 leading-relaxed">
                {ev.impactOnLaterChoices}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00FFB2]" />
                Cryptographic Integrity Hash: {ev.verificationHash}
              </span>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
};
