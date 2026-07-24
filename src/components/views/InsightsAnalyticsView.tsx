import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Sparkles, Activity } from 'lucide-react';
import { AnalyticsView } from './AnalyticsView';

export type InsightsSubTab = 'biometrics' | 'forecast' | 'legacy-stats' | 'export';

export const InsightsAnalyticsView: React.FC = () => {
  const [subTab, setSubTab] = useState<InsightsSubTab>('biometrics');
  const [isExporting, setIsExporting] = useState(false);

  const subNavItems: { id: InsightsSubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'biometrics', label: 'Biometric Telemetry', icon: <Activity className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'forecast', label: 'Disease Forecast', icon: <TrendingUp className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'legacy-stats', label: 'Legacy Analytics', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { id: 'export', label: 'Data Export & Reports', icon: <Download className="w-4 h-4 text-[#00E5FF]" /> },
  ];

  return (
    <div className="app-container space-y-8 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <BarChart3 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Insights & Analytics Workspace</h1>
            <p className="text-xs text-slate-300 font-mono">
              Biometric Telemetry Trends, Disease Risk Forecasting & Encrypted PDF/ZIP Export
            </p>
          </div>
        </div>

        <div className="text-right text-xs font-mono text-[#00FFB2]">
          <div>250 Hz Continuous Telemetry</div>
          <div className="text-slate-400">Zero Signal Distortion</div>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-[#00E5FF]/20 scrollbar-none">
        {subNavItems.map((item) => {
          const isActive = subTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] text-black shadow-cyan-glow'
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
        {subTab === 'biometrics' && <AnalyticsView />}

        {subTab === 'forecast' && (
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">10-Year Disease Risk Vector Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400">Cardiovascular Remodeling</div>
                <div className="text-2xl font-bold text-[#00FFB2]">3.2% Low Risk</div>
                <div className="text-[10px] text-slate-500">Trend: Stable (-0.8%)</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400">Ischemic Cerebrovascular</div>
                <div className="text-2xl font-bold text-[#00FFB2]">1.8% Low Risk</div>
                <div className="text-[10px] text-slate-500">Trend: Stable (0.0%)</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400">Metabolic Pancreatic Risk</div>
                <div className="text-2xl font-bold text-[#00FFB2]">6.1% Low Risk</div>
                <div className="text-[10px] text-slate-500">Trend: Stable (0.0%)</div>
              </div>
            </div>
          </div>
        )}

        {subTab === 'legacy-stats' && (
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-purple-400 font-bold">EternaMind X Wisdom Coverage Analytics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400">Cognitive DNA Depth</div>
                <div className="text-2xl font-bold text-[#00FFB2]">98%</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400">Contributed Records</div>
                <div className="text-2xl font-bold text-[#00E5FF]">342</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400">Time Capsules</div>
                <div className="text-2xl font-bold text-purple-400">2 Active</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400">Lineage Generations</div>
                <div className="text-2xl font-bold text-[#00FFB2]">5 Nodes</div>
              </div>
            </div>
          </div>
        )}

        {subTab === 'export' && (
          <div className="glass-panel p-6 rounded-3xl space-y-4 max-w-xl">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">Comprehensive Patient Report Generator</h3>
            <p className="text-xs text-slate-300 font-mono">
              Download encrypted PDF medical summaries, biometrics CSV streams, or EternaMind legacy archives.
            </p>
            <button
              onClick={() => {
                setIsExporting(true);
                setTimeout(() => setIsExporting(false), 2000);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] text-black font-bold text-xs font-mono uppercase tracking-wider shadow-cyan-glow"
            >
              {isExporting ? 'Generating Report PDF...' : 'Download Full Medical Report (PDF)'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
