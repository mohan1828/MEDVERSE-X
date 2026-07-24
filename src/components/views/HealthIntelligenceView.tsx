import React, { useState } from 'react';
import { HeartPulse, Shield, Zap, Clock, Activity, Sparkles, Navigation } from 'lucide-react';
import { DigitalTwinCanvas } from '../3D/DigitalTwinCanvas';
import { WhatIfSimulatorView } from './WhatIfSimulatorView';
import { HealthTimelineView } from './HealthTimelineView';
import { HealthcareNavigatorView } from './HealthcareNavigatorView';
import { mockPatient } from '../../data/mockPatientData';

export type HealthSubTab = 'digital-twin' | 'navigator' | 'risk-analysis' | 'what-if' | 'timeline' | 'vitals';

export const HealthIntelligenceView: React.FC = () => {
  const [subTab, setSubTab] = useState<HealthSubTab>('digital-twin');
  const [selectedOrganId, setSelectedOrganId] = useState<string>('heart');

  const subNavItems: { id: HealthSubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'digital-twin', label: 'Digital Twin & Organs', icon: <HeartPulse className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'navigator', label: 'Nearby Care Navigator', icon: <Navigation className="w-4 h-4 text-[#00E5FF] animate-pulse" /> },
    { id: 'risk-analysis', label: 'Risk Analysis & XAI', icon: <Shield className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'what-if', label: 'What-If Simulator', icon: <Zap className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'timeline', label: 'Health Timeline', icon: <Clock className="w-4 h-4 text-purple-400" /> },
    { id: 'vitals', label: 'Vitals & Telemetry', icon: <Activity className="w-4 h-4 text-[#00E5FF]" /> },
  ];

  const vitals = [
    { label: 'Body Age', value: `${mockPatient.bodyAge} yrs`, detail: `Chronological: ${mockPatient.age} yrs (-4.6 yrs)`, color: 'text-[#00FFB2]' },
    { label: 'Heart Rate', value: `${mockPatient.heartRate} bpm`, detail: 'Resting pulse baseline', color: 'text-[#00E5FF]' },
    { label: 'Blood Pressure', value: `${mockPatient.bloodPressure}`, detail: 'Systolic / Diastolic mmHg', color: 'text-[#00E5FF]' },
    { label: 'Stress Score', value: `${mockPatient.stressScore} / 100`, detail: 'Low parasympathetic strain', color: 'text-[#00FFB2]' },
    { label: 'Sleep Score', value: `${mockPatient.sleepScore} %`, detail: '94% REM/Slow-wave quality', color: 'text-[#00FFB2]' },
    { label: 'Blood Oxygen (SpO2)', value: `${mockPatient.spO2} %`, detail: 'Optimal tissue oxygenation', color: 'text-[#00E5FF]' },
    { label: 'Hydration', value: `${mockPatient.hydration} %`, detail: 'Intracellular water ratio', color: 'text-[#00E5FF]' },
    { label: 'Body Mass Index', value: `${mockPatient.bmi}`, detail: 'Normal lean composition', color: 'text-[#00FFB2]' },
  ];

  return (
    <div className="app-container space-y-8 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Health Intelligence Workspace</h1>
            <p className="text-xs text-slate-300 font-mono">
              Unified Bio-Twin Telemetry, Risk Stratification & Smart Healthcare Navigator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00FFB2] px-3 py-1.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
          <Sparkles className="w-4 h-4" />
          <span>Real-time Sub-cellular Data Stream</span>
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
        {subTab === 'digital-twin' && (
          <div className="space-y-8">
            <DigitalTwinCanvas
              organs={mockPatient.organs}
              selectedOrganId={selectedOrganId}
              onSelectOrgan={setSelectedOrganId}
            />
          </div>
        )}

        {subTab === 'navigator' && <HealthcareNavigatorView />}

        {subTab === 'risk-analysis' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPatient.risks.map((risk) => (
              <div key={risk.id} className="glass-panel p-5 rounded-2xl space-y-4 border border-[#00E5FF]/20">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{risk.name}</h3>
                    <div className="text-xs font-mono text-[#00FFB2]">Confidence: {risk.confidence}%</div>
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-[#00FFB2]">
                    {risk.riskPercent}%
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="font-mono text-[#00FFB2] uppercase font-bold">Protective Factors</div>
                  {risk.explainability.positiveContributors.map((c, i) => (
                    <div key={i} className="flex justify-between text-[11px] p-1.5 rounded bg-slate-900/80">
                      <span>{c.factor}</span>
                      <span className="font-bold text-[#00FFB2]">{c.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {subTab === 'what-if' && <WhatIfSimulatorView />}
        {subTab === 'timeline' && <HealthTimelineView />}

        {subTab === 'vitals' && (
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">Live Biometric Stream Matrix</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {vitals.map((v, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-mono">{v.label}</div>
                  <div className={`text-xl font-bold font-mono ${v.color}`}>{v.value}</div>
                  <div className="text-[10px] text-slate-500">{v.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
