import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, HeartPulse, Shield, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { DigitalTwinCanvas } from '../3D/DigitalTwinCanvas';
import { GaugeChart } from '../ui/GaugeChart';
import type { PatientProfile } from '../../data/mockPatientData';

interface DigitalTwinViewProps {
  patient: PatientProfile;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({ patient }) => {
  const [selectedOrganId, setSelectedOrganId] = useState<string>('heart');
  const [expandedRiskId, setExpandedRiskId] = useState<string | null>('heart-disease');

  const vitals = [
    { label: 'Body Age', value: `${patient.bodyAge} yrs`, detail: `Chronological: ${patient.age} yrs (-4.6 yrs)`, color: 'text-[#00FFB2]' },
    { label: 'Heart Rate', value: `${patient.heartRate} bpm`, detail: 'Resting pulse baseline', color: 'text-[#00E5FF]' },
    { label: 'Blood Pressure', value: `${patient.bloodPressure}`, detail: 'Systolic / Diastolic mmHg', color: 'text-[#00E5FF]' },
    { label: 'Stress Score', value: `${patient.stressScore} / 100`, detail: 'Low parasympathetic strain', color: 'text-[#00FFB2]' },
    { label: 'Sleep Score', value: `${patient.sleepScore} %`, detail: '94% REM/Slow-wave quality', color: 'text-[#00FFB2]' },
    { label: 'Blood Oxygen (SpO2)', value: `${patient.spO2} %`, detail: 'Optimal tissue oxygenation', color: 'text-[#00E5FF]' },
    { label: 'Hydration', value: `${patient.hydration} %`, detail: 'Intracellular water ratio', color: 'text-[#00E5FF]' },
    { label: 'Body Mass Index', value: `${patient.bmi}`, detail: 'Normal lean composition', color: 'text-[#00FFB2]' },
    { label: 'Body Temperature', value: `${patient.temperature} °C`, detail: 'Standard homeostatic core', color: 'text-slate-200' },
    { label: 'Daily Steps', value: `${patient.activitySteps.toLocaleString()}`, detail: 'Active physical volume', color: 'text-[#00FFB2]' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
              Digital Twin Holographic Telemetry
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-mono text-xs">
              Live Neural Sync
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono mt-1">
            Patient: {patient.name} • ID: {patient.twinId} • Last Synced: {patient.lastSynced}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Overall Status</div>
            <div className="text-sm font-bold text-[#00FFB2]">97/100 Prime Condition</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#00FFB2]/10 border border-[#00FFB2]/30 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-[#00FFB2] animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8">
          <DigitalTwinCanvas
            organs={patient.organs}
            selectedOrganId={selectedOrganId}
            onSelectOrgan={setSelectedOrganId}
          />
        </div>

        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#00FFB2]" />
              Super AI Bio-Score
            </h3>
            <GaugeChart score={patient.healthScore} label="Excellent" size={230} showConfettiOnMount={true} />
            <p className="text-xs text-slate-400 text-center mt-3 font-mono">
              Biological age is 4.6 years younger than chronological age.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-3xl space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              Real-Time Biometric Streams
            </h3>

            <div className="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {vitals.map((v, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-mono">{v.label}</div>
                  <div className={`text-sm font-bold font-mono ${v.color}`}>{v.value}</div>
                  <div className="text-[9px] text-slate-500 truncate">{v.detail}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00E5FF]" />
              Predictive Disease Risk Stratification
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              AI multi-factor predictive models with Explainable AI (XAI) breakdown.
            </p>
          </div>
          <span className="text-xs font-mono text-[#00FFB2] px-3 py-1 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
            6 Vector Models Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patient.risks.map((risk) => {
            const isExpanded = expandedRiskId === risk.id;
            return (
              <motion.div
                key={risk.id}
                layout
                className="glass-panel p-5 rounded-2xl space-y-4 border border-[#00E5FF]/20 hover:border-[#00E5FF]/40 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{risk.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-mono mt-1">
                      <span className="text-slate-400">Confidence:</span>
                      <span className="text-[#00FFB2] font-semibold">{risk.confidence}%</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-extrabold font-mono ${
                      risk.riskPercent > 10 ? 'text-amber-400' : 'text-[#00FFB2]'
                    }`}>
                      {risk.riskPercent}%
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Trend: <span className="text-emerald-400">{risk.trendValue}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${Math.min(100, risk.riskPercent * 4)}%` }}
                    className={`h-full rounded-full ${
                      risk.riskPercent > 10 ? 'bg-amber-400' : 'bg-gradient-to-r from-[#00E5FF] to-[#00FFB2]'
                    }`}
                  />
                </div>

                <button
                  onClick={() => setExpandedRiskId(isExpanded ? null : risk.id)}
                  className="w-full flex items-center justify-between text-xs font-mono text-[#00E5FF] pt-2 border-t border-slate-800 hover:text-white transition-colors"
                >
                  <span>{isExpanded ? 'Hide XAI Explainability' : 'Explain WHY (XAI Factor Breakdown)'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 pt-2 text-xs"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#00FFB2] font-bold">
                          Protective Biomarkers (-Risk)
                        </span>
                        {risk.explainability.positiveContributors.map((c, idx) => (
                          <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-slate-200">
                            <span className="truncate pr-2">{c.factor}</span>
                            <span className="font-mono text-[#00FFB2] font-bold">{c.percentage}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                          Risk Driver Biomarkers (+Risk)
                        </span>
                        {risk.explainability.negativeContributors.map((c, idx) => (
                          <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-amber-950/30 border border-amber-500/20 text-slate-200">
                            <span className="truncate pr-2">{c.factor}</span>
                            <span className="font-mono text-amber-400 font-bold">{c.percentage}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-800 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-purple-300 font-bold">
                          RAG Peer-Reviewed Evidence
                        </span>
                        {risk.ragCitations.map((cit, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-slate-900/90 border border-purple-500/30 text-[10px]">
                            <div className="font-semibold text-slate-200">{cit.title}</div>
                            <div className="text-slate-400 font-mono mt-0.5">{cit.source} ({cit.year})</div>
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
