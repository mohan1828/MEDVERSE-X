import React, { useState } from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { mockSupportedModels, type SupportedAIModel } from '../../../data/mockFederatedData';

export const SupportedModelsView: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<SupportedAIModel>(mockSupportedModels[0]);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Supported Federated AI Models (8 Modules)</h2>
            <p className="text-xs font-mono text-slate-300">
              Cross-institutional neural models trained across 42.8M clinical records
            </p>
          </div>
        </div>
      </div>

      {/* 8 Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockSupportedModels.map((model) => {
          const isSelected = selectedModel.id === model.id;
          return (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`p-5 rounded-2xl glass-panel transition-all cursor-pointer space-y-4 border ${
                isSelected
                  ? 'border-[#00E5FF] shadow-cyan-glow bg-slate-900/90'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 uppercase font-bold">
                  {model.category}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  model.trainingStatus === 'Converged' ? 'bg-[#00FFB2]/10 text-[#00FFB2]' : 'bg-purple-500/10 text-purple-400'
                }`}>
                  {model.trainingStatus}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-white text-base leading-tight">{model.name}</h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{model.tagline}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-slate-500">Accuracy</div>
                  <div className="font-bold text-[#00FFB2] text-sm">{model.accuracy}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">F1 Score</div>
                  <div className="font-bold text-[#00E5FF] text-sm">{model.f1Score}%</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Training Progress</span>
                  <span>{model.trainingProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] rounded-full"
                    style={{ width: `${model.trainingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Model Deep Dive Detail Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#00E5FF]/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#00FFB2] uppercase font-bold">Selected Model Deep Dive</span>
              <span className="text-xs text-slate-500">• Round #{selectedModel.roundCount}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">{selectedModel.name}</h3>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400">Total Patient Samples</div>
              <div className="font-bold text-[#00FFB2]">{(selectedModel.totalSamples / 1000000).toFixed(2)}M Profiles</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400">Weight Matrix Size</div>
              <div className="font-bold text-[#00E5FF]">{selectedModel.weightVectorSizeMB} MB</div>
            </div>
          </div>
        </div>

        {/* 4 Performance Metrics Widgets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Model Accuracy</div>
            <div className="text-2xl font-extrabold text-[#00FFB2]">{selectedModel.accuracy}%</div>
            <div className="text-[10px] text-slate-500">Cross-validated global benchmark</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Precision</div>
            <div className="text-2xl font-extrabold text-[#00E5FF]">{selectedModel.precision}%</div>
            <div className="text-[10px] text-slate-500">Low false positive rate</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Recall (Sensitivity)</div>
            <div className="text-2xl font-extrabold text-purple-400">{selectedModel.recall}%</div>
            <div className="text-[10px] text-slate-500">Optimal clinical sensitivity</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">F1 Score Metric</div>
            <div className="text-2xl font-extrabold text-[#00FFB2]">{selectedModel.f1Score}%</div>
            <div className="text-[10px] text-slate-500">Harmonic mean balance</div>
          </div>
        </div>

        {/* Supported Clinical Feature Vectors */}
        <div className="space-y-3 pt-2 font-mono">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Federated Neural Input Feature Vectors
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedModel.supportedFeatures.map((feat, i) => (
              <span key={i} className="px-3 py-1 rounded-xl bg-slate-900 border border-[#00E5FF]/20 text-slate-200 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFB2]" />
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
