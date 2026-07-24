import React, { useState } from 'react';
import { Stethoscope, Cpu, Network, Bot, ShieldCheck } from 'lucide-react';
import { AIDoctorView } from './AIDoctorView';
import { AIAgentsView } from './AIAgentsView';
import { KnowledgeGraphView } from './KnowledgeGraphView';

export type AISubTab = 'ai-doctor' | 'ai-swarm' | 'knowledge-graph' | 'clinical-support';

export const AIIntelligenceView: React.FC = () => {
  const [subTab, setSubTab] = useState<AISubTab>('ai-doctor');

  const subNavItems: { id: AISubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'ai-doctor', label: 'AI Doctor & RAG', icon: <Stethoscope className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'ai-swarm', label: 'Autonomous Swarm Agents', icon: <Cpu className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'knowledge-graph', label: 'Medical Knowledge Graph', icon: <Network className="w-4 h-4 text-purple-400" /> },
    { id: 'clinical-support', label: 'Clinical Decision Support', icon: <Bot className="w-4 h-4 text-[#00E5FF]" /> },
  ];

  return (
    <div className="app-container space-y-12 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">AI Intelligence Workspace</h1>
            <p className="text-xs text-slate-300 font-mono">
              Medical RAG Super-Intelligence, Autonomous Bio-Swarm, and Neural Knowledge Graph
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00FFB2] px-3 py-1.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
          <ShieldCheck className="w-4 h-4" />
          <span>3.4M PubMed RAG Papers Ingested</span>
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap overflow-x-auto gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-[#00E5FF]/20">
        {subNavItems.map((item) => {
          const isActive = subTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-white shadow-cyan-glow'
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
        {subTab === 'ai-doctor' && <AIDoctorView />}
        {subTab === 'ai-swarm' && <AIAgentsView />}
        {subTab === 'knowledge-graph' && <KnowledgeGraphView />}

        {subTab === 'clinical-support' && (
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">Multi-Agent Workflow & Reasoning Engine</h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-[#00FFB2]">› [Athena AI] Evaluated 42 multi-omics genomic variants against 2026 Lancet dataset.</div>
              <div className="text-[#00E5FF]">› [Apollo AI] 10-year cardiac ventricular remodeling vector projected stable.</div>
              <div className="text-purple-300">› [Hermes AI] Sub-millisecond watchdog alert pipeline standing by. Latency: 0.4ms.</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
