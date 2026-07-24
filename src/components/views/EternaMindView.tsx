import React, { useState } from 'react';
import { Brain, Dna, Calendar, Gift, Bot, Network, Play, ShieldCheck, Mic, Lock } from 'lucide-react';
import { EternaHeroSection } from './eternamind/EternaHeroSection';
import { CognitiveDNACanvas } from './eternamind/CognitiveDNACanvas';
import { LifeTimelineView } from './eternamind/LifeTimelineView';
import { TimeCapsulesView } from './eternamind/TimeCapsulesView';
import { AIMentorChatView } from './eternamind/AIMentorChatView';
import { MultiGenGraphView } from './eternamind/MultiGenGraphView';
import { LifeSimulationView } from './eternamind/LifeSimulationView';
import { MemoryIntegrityView } from './eternamind/MemoryIntegrityView';
import { VoiceMediaIntakeView } from './eternamind/VoiceMediaIntakeView';
import { EthicalAICenterView } from './eternamind/EthicalAICenterView';
import { mockEternaMindData } from '../../data/mockEternaMindData';

export type EternaSubTab = 
  | 'overview'
  | 'dna'
  | 'timeline'
  | 'capsules'
  | 'mentor'
  | 'multigen'
  | 'simulations'
  | 'integrity'
  | 'intake'
  | 'ethical';

export const EternaMindView: React.FC = () => {
  const [subTab, setSubTab] = useState<EternaSubTab>('overview');

  const subNavItems: { id: EternaSubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Brain className="w-4 h-4" /> },
    { id: 'dna', label: 'Cognitive DNA', icon: <Dna className="w-4 h-4" /> },
    { id: 'timeline', label: 'Life Timeline', icon: <Calendar className="w-4 h-4" /> },
    { id: 'capsules', label: 'Time Capsules', icon: <Gift className="w-4 h-4" /> },
    { id: 'mentor', label: 'AI Mentor', icon: <Bot className="w-4 h-4" /> },
    { id: 'multigen', label: 'Multi-Gen Graph', icon: <Network className="w-4 h-4" /> },
    { id: 'simulations', label: 'Life Simulations', icon: <Play className="w-4 h-4" /> },
    { id: 'integrity', label: 'Memory Integrity', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'intake', label: 'Voice & Media', icon: <Mic className="w-4 h-4" /> },
    { id: 'ethical', label: 'Ethical AI', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="app-container space-y-8 pb-16">
      
      <div className="glass-panel p-6 rounded-3xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-extrabold font-mono text-gradient-purple">
            {mockEternaMindData.legacyScore}%
          </div>
          <div className="text-[11px] font-semibold text-slate-200">Legacy Score</div>
          <div className="text-[9px] text-slate-400 font-mono">Prime Completeness</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-extrabold font-mono text-gradient-cyan">
            {mockEternaMindData.knowledgeCompleteness}%
          </div>
          <div className="text-[11px] font-semibold text-slate-200">Knowledge Depth</div>
          <div className="text-[9px] text-slate-400 font-mono">342 Contributed Records</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-extrabold font-mono text-[#00FFB2]">
            {mockEternaMindData.timelineProgress}
          </div>
          <div className="text-[11px] font-semibold text-slate-200">Timeline Events</div>
          <div className="text-[9px] text-slate-400 font-mono">Verified Life Milestones</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-extrabold font-mono text-purple-400">
            {mockEternaMindData.expertiseDomainsCount}
          </div>
          <div className="text-[11px] font-semibold text-slate-200">Expertise Domains</div>
          <div className="text-[9px] text-slate-400 font-mono">Cognitive Blueprint</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-extrabold font-mono text-[#00E5FF]">
            {mockEternaMindData.familyConnectionsCount}
          </div>
          <div className="text-[11px] font-semibold text-slate-200">Family Lineage</div>
          <div className="text-[9px] text-slate-400 font-mono">5 Generations Sync</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-extrabold font-mono text-[#00FFB2]">
            {mockEternaMindData.aiMentorReadiness}%
          </div>
          <div className="text-[11px] font-semibold text-slate-200">AI Mentor Readiness</div>
          <div className="text-[9px] text-slate-400 font-mono">Zero Speculation Engine</div>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/30 scrollbar-none">
        {subNavItems.map((item) => {
          const isActive = subTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-[#00E5FF] text-white shadow-purple-glow'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div>
        {subTab === 'overview' && (
          <div className="space-y-8">
            <EternaHeroSection
              onStartLegacy={() => setSubTab('dna')}
              onExploreDemo={() => setSubTab('mentor')}
            />
            <CognitiveDNACanvas />
            <LifeTimelineView />
          </div>
        )}

        {subTab === 'dna' && <CognitiveDNACanvas />}
        {subTab === 'timeline' && <LifeTimelineView />}
        {subTab === 'capsules' && <TimeCapsulesView />}
        {subTab === 'mentor' && <AIMentorChatView />}
        {subTab === 'multigen' && <MultiGenGraphView />}
        {subTab === 'simulations' && <LifeSimulationView />}
        {subTab === 'integrity' && <MemoryIntegrityView />}
        {subTab === 'intake' && <VoiceMediaIntakeView />}
        {subTab === 'ethical' && <EthicalAICenterView />}
      </div>

    </div>
  );
};
