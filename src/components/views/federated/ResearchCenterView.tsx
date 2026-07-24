import React, { useState } from 'react';
import { FlaskConical, Award, BookOpen } from 'lucide-react';
import { mockSupportedModels } from '../../../data/mockFederatedData';

export const ResearchCenterView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'benchmark' | 'publish'>('marketplace');

  const researchPapers = [
    { title: 'Privacy-Preserving FedAvg for Multi-Center Cardiac Risk Stratification', authors: 'Mayo Clinic & Johns Hopkins Consortium', journal: 'Lancet Digital Health (2026)', citations: 142 },
    { title: 'Homomorphic Encryption Latency Minimization in Federated Neural Networks', authors: 'Charité Berlin & Imperial College AI', journal: 'Nature Medicine AI (2026)', citations: 98 },
    { title: 'Differential Privacy Epsilon Tuning in Heterogeneous Healthcare Nodes', authors: 'AIIMS & Singapore General AI Core', journal: 'IEEE Trans. Biomedical Engineering', citations: 84 },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <FlaskConical className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Research Collaboration & Clinical Model Center</h2>
            <p className="text-xs font-mono text-slate-300">
              Cross-institutional model sharing, benchmarking, research pre-prints & accuracy verification
            </p>
          </div>
        </div>
      </div>

      {/* Sub-tab selection */}
      <div className="flex gap-2 font-mono text-xs p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'marketplace' ? 'bg-[#00E5FF] text-black shadow-cyan-glow' : 'text-slate-300 hover:text-white'
          }`}
        >
          Model Hub Marketplace
        </button>
        <button
          onClick={() => setActiveTab('benchmark')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'benchmark' ? 'bg-[#00E5FF] text-black shadow-cyan-glow' : 'text-slate-300 hover:text-white'
          }`}
        >
          Cross-Institutional Benchmarks
        </button>
        <button
          onClick={() => setActiveTab('publish')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'publish' ? 'bg-[#00E5FF] text-black shadow-cyan-glow' : 'text-slate-300 hover:text-white'
          }`}
        >
          Research Papers & Pre-prints
        </button>
      </div>

      {/* Main Content Areas */}
      {activeTab === 'marketplace' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {mockSupportedModels.slice(0, 4).map((model) => (
            <div key={model.id} className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">{model.name}</span>
                <span className="text-[#00FFB2] font-bold">{model.accuracy}% Accuracy</span>
              </div>
              <p className="text-slate-400 text-[11px]">{model.tagline}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                <span className="text-slate-500">Weight Package: {model.weightVectorSizeMB} MB</span>
                <button className="px-3 py-1.5 rounded-xl bg-slate-900 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/10 font-bold">
                  Deploy Weights →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'benchmark' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#00FFB2]" />
            Global Clinical Benchmark Matrix
          </h3>
          <div className="space-y-3">
            {mockSupportedModels.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{m.name}</div>
                  <div className="text-slate-400 text-[11px]">{m.category} • {m.totalSamples.toLocaleString()} Training Cohorts</div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-[10px] text-slate-400">Global Acc</div>
                    <div className="font-bold text-[#00FFB2]">{m.accuracy}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">F1 Score</div>
                    <div className="font-bold text-[#00E5FF]">{m.f1Score}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'publish' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            Peer-Reviewed Research Pre-Prints & Publications
          </h3>
          <div className="space-y-3">
            {researchPapers.map((paper, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm">{paper.title}</div>
                <div className="text-slate-400 text-[11px]">{paper.authors}</div>
                <div className="flex items-center justify-between text-[10px] pt-1 text-slate-500">
                  <span className="text-[#00E5FF]">{paper.journal}</span>
                  <span className="text-[#00FFB2]">{paper.citations} Citations</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
