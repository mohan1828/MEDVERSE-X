import React from 'react';
import { LineChart, Globe, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { mockHealthcareInsights } from '../../../data/mockFederatedData';

export const HealthcareInsightsView: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <LineChart className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Healthcare Insights & Population Analytics</h2>
            <p className="text-xs font-mono text-slate-300">
              Regional Disease Risk, Epidemiological Trends, Model Drift & Demographic Fairness Metrics
            </p>
          </div>
        </div>
      </div>

      {/* Disease Trends & Regional Risk Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
        {mockHealthcareInsights.diseaseTrends.map((item, i) => (
          <div key={i} className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase">{item.region}</span>
              <Globe className="w-4 h-4 text-[#00E5FF]" />
            </div>
            <div>
              <div className="font-extrabold text-white text-base leading-snug">{item.disease}</div>
              <div className="text-xs font-bold text-[#00FFB2] mt-1">{item.trend}</div>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Risk Profile:</span>
              <span className="font-bold text-[#00FFB2] px-2 py-0.5 rounded bg-[#00FFB2]/10">{item.riskLevel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Model Drift & Bias Fairness Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Model Drift Detection */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Model Drift & Sensor Sensor Calibration Detection
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">Concept Drift Score</div>
                <div className="text-2xl font-extrabold text-[#00FFB2]">
                  {mockHealthcareInsights.modelDrift.conceptDriftScore} (Optimal)
                </div>
                <div className="text-[11px] text-slate-400">Zero statistical weight degradation across rounds</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">Sensor Calibration Shift</div>
                <div className="text-xl font-bold text-[#00E5FF]">
                  {mockHealthcareInsights.modelDrift.sensorCalibrationShift}
                </div>
                <div className="text-[11px] text-slate-400">Last recalibrated in Round #{mockHealthcareInsights.modelDrift.lastRecalibratedRound}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-[#00FFB2] font-bold text-center">
                {mockHealthcareInsights.modelDrift.status}
              </div>
            </div>
          </div>
        </div>

        {/* Bias Detection & Fairness Metrics */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00FFB2]" />
              Algorithmic Fairness & Bias Verification
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[10px]">Demographic Parity Ratio</div>
                  <div className="text-xl font-extrabold text-[#00FFB2]">{mockHealthcareInsights.fairnessMetrics.demographicParityRatio}</div>
                  <div className="text-[10px] text-slate-400">Equalized prediction rates across cohorts</div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-[#00FFB2]" />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[10px]">Equalized Odds Difference</div>
                  <div className="text-xl font-extrabold text-[#00E5FF]">{mockHealthcareInsights.fairnessMetrics.equalizedOddsDifference}</div>
                  <div className="text-[10px] text-slate-400">Zero demographic bias variance</div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-[#00E5FF]" />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-[#00FFB2]/30 text-[#00FFB2] font-bold text-center">
                {mockHealthcareInsights.fairnessMetrics.auditCompliance}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
