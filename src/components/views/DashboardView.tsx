import React from 'react';
import { HeartPulse, Cpu, Shield, Zap, Stethoscope, Navigation, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { GaugeChart } from '../ui/GaugeChart';
import type { NavTab } from '../Navbar';
import { mockPatient } from '../../data/mockPatientData';
import { mockAgents } from '../../data/mockAgents';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
  onTriggerEmergency: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onTriggerEmergency }) => {
  const quickActions = [
    { label: 'Healthcare Navigator', tab: 'health-intelligence' as NavTab, icon: <Navigation className="w-4 h-4 text-[#00E5FF] animate-pulse" /> },
    { label: 'Simulate Lifestyle Impact', tab: 'health-intelligence' as NavTab, icon: <Zap className="w-4 h-4 text-[#00FFB2]" /> },
    { label: 'Consult AI Doctor RAG', tab: 'ai-intelligence' as NavTab, icon: <Stethoscope className="w-4 h-4 text-[#00E5FF]" /> },
    { label: 'Trigger Emergency SOS', tab: 'emergency-center' as NavTab, icon: <Shield className="w-4 h-4 text-rose-400" />, action: onTriggerEmergency },
  ];

  const recentInsights = [
    { text: 'ApoB lipoprotein level stable at 52 mg/dL. 10-year cardiac risk remains low (3.2%).', time: '10 mins ago', type: 'optimal' },
    { text: 'Healthcare Navigator AI: Scanned 4 nearby English-speaking hospitals in Tokyo, Japan.', time: '25 mins ago', type: 'location' },
    { text: 'EternaMind X ingested new audio note: Surgical Residency Decision Framework.', time: '1 hour ago', type: 'legacy' },
  ];

  const dailyTasks = [
    { task: 'Complete 30-min Zone 2 Aerobic Session', status: 'Completed', time: '07:30 AM' },
    { task: 'Ingest Evening EPA/DHA & CoQ10 Supplement Stack', status: 'Pending', time: '08:00 PM' },
    { task: 'Perform 5-min Parasympathetic Sleep Breathwork', status: 'Scheduled', time: '10:00 PM' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
              Welcome back, {mockPatient.name}
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30 text-[#00FFB2] text-xs font-mono font-bold">
              Prime Condition
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono mt-1">
            Twin ID: {mockPatient.twinId} • Biological Age: <strong className="text-[#00FFB2]">{mockPatient.bodyAge} yrs</strong> (Chronological: {mockPatient.age})
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <div className="text-slate-400">Emergency Watchdog</div>
            <div className="font-bold text-[#00FFB2]">Sub-millisecond Active</div>
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#00FFB2] animate-ping" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((qa, i) => (
          <button
            key={i}
            onClick={() => {
              if (qa.action) qa.action();
              else onNavigate(qa.tab);
            }}
            className="p-4 rounded-2xl glass-panel hover:border-[#00E5FF]/40 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                {qa.icon}
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                {qa.label}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-[#00E5FF] transition-all" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#00FFB2]" />
              Super AI Bio-Score Index
            </h2>
            <GaugeChart score={mockPatient.healthScore} label="Excellent" size={220} />
            <p className="text-xs text-slate-400 text-center mt-2 font-mono">
              Performing in top 1% of digital twin health benchmarks.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[#00FFB2]" />
                Digital Twin Organ Telemetry
              </h3>
              <button 
                onClick={() => onNavigate('health-intelligence')}
                className="text-[11px] font-mono text-[#00E5FF] hover:underline"
              >
                View 3D Model →
              </button>
            </div>

            <div className="space-y-2">
              {Object.entries(mockPatient.organs).map(([id, organ]) => (
                <div key={id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2 capitalize">
                    <span className="w-2 h-2 rounded-full bg-[#00FFB2]" />
                    <span className="font-bold text-white">{organ.name}</span>
                  </div>
                  <span className="font-bold text-[#00FFB2]">{organ.score}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="text-base font-bold text-white">Autonomous AI Swarm Status</h3>
              </div>
              <span className="text-xs font-mono text-[#00FFB2] px-3 py-1 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
                9 / 9 Active
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {mockAgents.slice(0, 4).map((ag) => (
                <div key={ag.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400">{ag.name}</div>
                  <div className="font-bold text-[#00FFB2] truncate">{ag.role}</div>
                  <div className="text-[9px] text-emerald-400 mt-1">{ag.confidence}% Confidence</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00FFB2]" />
              Recent AI Clinical & Memory Insights
            </h3>

            <div className="space-y-3">
              {recentInsights.map((ins, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#00E5FF] font-bold">AI Diagnostic Engine</span>
                    <span className="text-slate-400">{ins.time}</span>
                  </div>
                  <p className="text-slate-200">{ins.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Daily Longevity Protocol Schedule
            </h3>

            <div className="space-y-2">
              {dailyTasks.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-4 h-4 ${t.status === 'Completed' ? 'text-[#00FFB2]' : 'text-slate-500'}`} />
                    <span className="text-slate-200">{t.task}</span>
                  </div>
                  <span className="text-slate-400">{t.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
