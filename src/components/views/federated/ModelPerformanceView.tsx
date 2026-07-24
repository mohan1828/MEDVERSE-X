import React, { useState } from 'react';
import { BarChart3, GitBranch } from 'lucide-react';
import { mockLossHistory, mockConfusionMatrix } from '../../../data/mockFederatedData';

export const ModelPerformanceView: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>('v2.4.0 (FedAvg)');

  const versionHistory = [
    { version: 'v2.4.0 (FedAvg)', date: '2026-07-24', accuracy: '97.4%', loss: '0.046', notes: 'Added Paillier Homomorphic Cipher & 142 Node Aggregation' },
    { version: 'v2.3.0 (FedProx)', date: '2026-07-15', accuracy: '96.8%', loss: '0.058', notes: 'Optimized heterogenous local node learning rates' },
    { version: 'v2.0.0 (Baseline)', date: '2026-06-01', accuracy: '94.2%', loss: '0.098', notes: 'Initial 50 hospital node baseline release' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <BarChart3 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">AI Model Performance & Convergence Analytics</h2>
            <p className="text-xs font-mono text-slate-300">
              Interactive Loss/Accuracy Curves, ROC Analysis, Confusion Matrix & Version History
            </p>
          </div>
        </div>
      </div>

      {/* Top 4 Performance Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono">
        <div className="p-5 rounded-2xl glass-panel border border-[#00FFB2]/30 space-y-1">
          <div className="text-xs text-slate-400">Training Loss</div>
          <div className="text-2xl font-extrabold text-[#00FFB2]">0.046</div>
          <div className="text-[10px] text-slate-500">Converged at Round #48</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/30 space-y-1">
          <div className="text-xs text-slate-400">Validation Accuracy</div>
          <div className="text-2xl font-extrabold text-[#00E5FF]">97.4%</div>
          <div className="text-[10px] text-slate-500">Global cross-validation</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-purple-500/30 space-y-1">
          <div className="text-xs text-slate-400">Area Under ROC (AUC)</div>
          <div className="text-2xl font-extrabold text-purple-400">0.987</div>
          <div className="text-[10px] text-slate-500">Optimal clinical discriminator</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#00FFB2]/30 space-y-1">
          <div className="text-xs text-slate-400">Precision / Recall</div>
          <div className="text-2xl font-extrabold text-[#00FFB2]">96.8% / 98.1%</div>
          <div className="text-[10px] text-slate-500">Minimal false positive/negative</div>
        </div>
      </div>

      {/* Interactive Charts: Training Curves & ROC Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Loss & Accuracy History Curve */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center justify-between">
              <span>Federated Training Loss & Accuracy Curve (Rounds 1 - 48)</span>
              <span className="text-[#00FFB2]">Convergence Achieved</span>
            </h3>

            {/* Custom SVG Line Chart for Training Loss & Accuracy */}
            <div className="h-64 w-full relative bg-slate-950/80 rounded-2xl p-4 border border-slate-800 flex items-end justify-between gap-1">
              {mockLossHistory.map((item, idx) => {
                const lossHeightPercent = Math.max(10, Math.min(100, item.loss * 180));
                const accHeightPercent = Math.max(10, (item.accuracy - 70) * 3.3);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 px-2 py-1 rounded bg-slate-900 border border-[#00E5FF] text-[9px] font-mono text-white whitespace-nowrap shadow-lg">
                      Round #{item.round}: Acc {item.accuracy}% | Loss {item.loss}
                    </div>

                    <div className="w-full flex justify-center items-end gap-1 h-44">
                      {/* Loss Bar */}
                      <div
                        className="w-2.5 rounded-t bg-rose-500/80 group-hover:bg-rose-400 transition-all"
                        style={{ height: `${lossHeightPercent}%` }}
                      />
                      {/* Accuracy Bar */}
                      <div
                        className="w-2.5 rounded-t bg-gradient-to-t from-[#00E5FF] to-[#00FFB2] group-hover:brightness-125 transition-all"
                        style={{ height: `${accHeightPercent}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">R{item.round}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-6 text-xs font-mono pt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-gradient-to-r from-[#00E5FF] to-[#00FFB2]" />
                <span className="text-slate-300">Validation Accuracy (%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-rose-500" />
                <span className="text-slate-300">Training Loss</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Confusion Matrix & ROC Curve */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Interactive Confusion Matrix */}
          <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
            <h3 className="text-xs uppercase text-[#00E5FF] font-bold">
              Interactive Clinical Confusion Matrix (20,000 Validation Cohorts)
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold">True Positive (TP)</div>
                <div className="text-xl font-extrabold text-[#00FFB2]">{mockConfusionMatrix.truePositive.toLocaleString()}</div>
                <div className="text-[9px] text-slate-400">Correct disease identification</div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-1">
                <div className="text-[10px] text-rose-400 font-bold">False Positive (FP)</div>
                <div className="text-xl font-extrabold text-rose-400">{mockConfusionMatrix.falsePositive.toLocaleString()}</div>
                <div className="text-[9px] text-slate-400">Type I error margin</div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-1">
                <div className="text-[10px] text-rose-400 font-bold">False Negative (FN)</div>
                <div className="text-xl font-extrabold text-rose-400">{mockConfusionMatrix.falseNegative.toLocaleString()}</div>
                <div className="text-[9px] text-slate-400">Type II error margin</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold">True Negative (TN)</div>
                <div className="text-xl font-extrabold text-[#00FFB2]">{mockConfusionMatrix.trueNegative.toLocaleString()}</div>
                <div className="text-[9px] text-slate-400">Correct non-disease classification</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Version History Table */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
          <GitBranch className="w-5 h-5 text-[#00E5FF]" />
          Model Version Release History & Weights
        </h3>

        <div className="space-y-3 font-mono text-xs">
          {versionHistory.map((v, i) => {
            const isSelected = selectedVersion === v.version;
            return (
              <div
                key={i}
                onClick={() => setSelectedVersion(v.version)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected ? 'bg-slate-900 border-[#00E5FF] shadow-cyan-glow' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{v.version}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30">
                      {v.accuracy}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1">{v.notes}</div>
                </div>

                <div className="text-right">
                  <div className="text-slate-400">{v.date}</div>
                  <div className="text-slate-500 text-[10px]">Loss: {v.loss}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
