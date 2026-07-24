import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal } from 'lucide-react';
import { mockAgents, type AIAgent } from '../../data/mockAgents';

export const AIAgentsView: React.FC = () => {
  const [agents] = useState<AIAgent[]>(mockAgents);
  const [logs, setLogs] = useState<string[]>([
    '[11:42:01.042] [Athena AI] Executing 42 variant genomic cross-reference against 2026 Lancet trial corpus...',
    '[11:42:01.088] [Apollo AI] Cardiac ventricular elastance vector projected stable for next 120 months.',
    '[11:42:01.120] [Nova AI] Synthesized 140 PubMed Central papers on mitochondrial NAD+ longevity.',
    '[11:42:01.190] [Hermes AI] Sub-second watchdog link verified with Level-1 Trauma Center. Latency: 0.4ms.',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomAgent = mockAgents[Math.floor(Math.random() * mockAgents.length)];
      const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);
      const newLog = `[${timestamp}] [${randomAgent.name}] ${randomAgent.currentTask}`;
      setLogs((prev) => [newLog, ...prev.slice(0, 12)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: AIAgent['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase font-bold">Active</span>;
      case 'analyzing':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-mono uppercase font-bold animate-pulse">Analyzing</span>;
      case 'standby':
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono uppercase font-bold">Watchdog</span>;
      case 'syncing':
        return <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-mono uppercase font-bold">Syncing</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Autonomous AI Swarm Hub</h1>
            <p className="text-xs text-slate-300 font-mono">
              8 Specialized Clinical Agents Monitoring Your Digital Twin 24/7
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs font-mono">
            <div className="text-slate-400">Swarm Confidence</div>
            <div className="font-bold text-[#00FFB2]">99.2% Nominal</div>
          </div>
          <div className="w-3 h-3 rounded-full bg-[#00FFB2] animate-ping" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            whileHover={{ y: -5 }}
            className="glass-panel p-5 rounded-2xl space-y-4 border border-[#00E5FF]/15 hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{agent.avatar}</span>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">{agent.name}</h3>
                    <div className="text-[10px] font-mono text-[#00E5FF]">{agent.role}</div>
                  </div>
                </div>
                {getStatusBadge(agent.status)}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                {agent.description}
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Task Confidence:</span>
                  <span className="font-bold text-[#00FFB2]">{agent.confidence}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div style={{ width: `${agent.confidence}%` }} className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] rounded-full" />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] space-y-1">
                <div className="text-[9px] font-mono text-[#00E5FF] uppercase font-bold">Current Automated Task</div>
                <div className="text-slate-300 line-clamp-2 leading-snug">{agent.currentTask}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Processed: <strong className="text-slate-200">{agent.metricsProcessed}</strong></span>
              <span>{agent.lastExecution}</span>
            </div>

          </motion.div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00FFB2]" />
            Live Inter-Agent Execution Feed (Real-Time Stream)
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Sub-millisecond Swarm Bus</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2 max-h-[220px] overflow-y-auto">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2 hover:bg-slate-900/60 p-1 rounded transition-colors">
              <span className="text-[#00FFB2]">›</span>
              <span className="text-slate-300">{log}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
