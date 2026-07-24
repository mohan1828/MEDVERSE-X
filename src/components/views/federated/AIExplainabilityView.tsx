import React from 'react';
import { Cpu, ShieldCheck, BarChart2, Building2 } from 'lucide-react';
import { mockSHAPExplanation } from '../../../data/mockFederatedData';

export const AIExplainabilityView: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Federated AI Explainability (XAI) & SHAP Waterfall</h2>
            <p className="text-xs font-mono text-slate-300">
              Interpretable Clinical Reasoning, SHAP Feature Attribution & Training Node Lineage
            </p>
          </div>
        </div>
      </div>

      {/* Prediction Summary Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#00E5FF]/30 space-y-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30 text-[10px] font-bold">
                Prediction ID: {mockSHAPExplanation.predictionId}
              </span>
              <span className="text-slate-400">Model: {mockSHAPExplanation.modelName}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {mockSHAPExplanation.predictedCondition}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Predicted Risk Score</div>
              <div className="text-2xl font-extrabold text-[#00FFB2]">{mockSHAPExplanation.riskScore}</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Model Confidence</div>
              <div className="text-2xl font-extrabold text-[#00E5FF]">{mockSHAPExplanation.confidence}%</div>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-between">
          <span className="text-slate-400">Participating Model Version:</span>
          <span className="font-bold text-[#00FFB2]">{mockSHAPExplanation.participatingModelVersion}</span>
        </div>
      </div>

      {/* SHAP Waterfall Chart & Feature Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SHAP Feature Contribution Waterfall */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
            <h3 className="text-xs uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#00FFB2]" />
              SHAP Feature Attribution Waterfall (Clinical Biomarkers)
            </h3>

            <div className="space-y-4">
              {mockSHAPExplanation.shapValues.map((item, idx) => {
                const widthPercent = Math.min(100, item.importance * 220);
                return (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{item.feature}</span>
                      <span className="text-[#00FFB2] font-bold">{item.value}</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.direction === 'positive'
                            ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FFB2]'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Impact: {item.impact}</span>
                      <span>Weight: {(item.importance * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Training Source Node Attribution */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
            <h3 className="text-xs uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" />
              Institutional Training Source Attribution
            </h3>

            <div className="space-y-3">
              {mockSHAPExplanation.trainingSources.map((src, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{src.institution}</div>
                    <div className="text-[10px] text-slate-400">{src.location} Node</div>
                  </div>
                  <span className="font-bold text-[#00E5FF] text-sm">{src.contributionWeight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-3xl glass-panel border border-[#00FFB2]/40 space-y-2 font-mono text-xs">
            <div className="text-[#00FFB2] font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Cryptographic Guarantee
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {mockSHAPExplanation.privacyGuarantee}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
