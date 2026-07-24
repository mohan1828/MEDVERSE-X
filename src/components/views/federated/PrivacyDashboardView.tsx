import React from 'react';
import { ShieldCheck, Lock, EyeOff, CheckCircle2, FileCheck, Activity, Key } from 'lucide-react';
import { mockFederatedMetrics } from '../../../data/mockFederatedData';
import { GaugeChart } from '../../ui/GaugeChart';

export const PrivacyDashboardView: React.FC = () => {
  const complianceChecklist = [
    { title: 'HIPAA Security & Privacy Rule', status: 'Compliant & Certified', detail: 'Zero Protected Health Information (PHI) leaves local hospital firewall' },
    { title: 'EU GDPR Article 9 Compliance', status: 'Compliant & Certified', detail: 'Special Category Data Protection with Differential Privacy Guarantees' },
    { title: 'HITECH Act Encryption Standards', status: 'Compliant & Certified', detail: 'AES-256-GCM in transit & Paillier Homomorphic at rest' },
    { title: 'ISO/IEC 27001 Security Audit', status: 'Passed - 100% Score', detail: 'Independent annual third-party zero-knowledge audit' },
    { title: 'SOC 2 Type II Enterprise Trust', status: 'Certified', detail: 'Continuous automated trust & privacy monitoring' },
  ];

  const liveAuditLogs = [
    { time: '23:58:12 UTC', node: 'Mayo Clinic Node', action: 'Differential Privacy noise verification (ε = 0.5)', result: 'PASSED' },
    { time: '23:45:00 UTC', node: 'Johns Hopkins Lab', action: 'Paillier Homomorphic Cipher Validation', result: 'PASSED' },
    { time: '23:30:45 UTC', node: 'Charité Berlin Unit', action: 'Patient Consent Token Verification', result: 'PASSED' },
    { time: '23:15:10 UTC', node: 'AIIMS New Delhi', action: 'Zero Knowledge Proof (zk-SNARK) Verification', result: 'PASSED' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00FFB2]/40 flex items-center justify-center text-[#00FFB2] shadow-cyan-glow">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Enterprise Privacy & Compliance Control Center</h2>
            <p className="text-xs font-mono text-slate-300">
              Zero Raw Data Sharing, End-to-End Encryption, Patient Consent & Real-time Audit Stream
            </p>
          </div>
        </div>
      </div>

      {/* Top 6 Privacy Guarantee Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
        
        <div className="p-4 rounded-2xl glass-panel border border-[#00FFB2]/30 space-y-2 text-center">
          <EyeOff className="w-5 h-5 text-[#00FFB2] mx-auto" />
          <div className="font-bold text-white">No Raw Data Sharing</div>
          <div className="text-[10px] text-slate-400">100% In-situ Training</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-[#00E5FF]/30 space-y-2 text-center">
          <Lock className="w-5 h-5 text-[#00E5FF] mx-auto" />
          <div className="font-bold text-white">End-to-End Encryption</div>
          <div className="text-[10px] text-slate-400">Paillier + AES-256</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-purple-500/30 space-y-2 text-center">
          <Key className="w-5 h-5 text-purple-400 mx-auto" />
          <div className="font-bold text-white">Secure Aggregation</div>
          <div className="text-[10px] text-slate-400">FedAvg Cipher Math</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-[#00FFB2]/30 space-y-2 text-center">
          <CheckCircle2 className="w-5 h-5 text-[#00FFB2] mx-auto" />
          <div className="font-bold text-white">Local Training Only</div>
          <div className="text-[10px] text-slate-400">Isolated GPU Enclaves</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-[#00E5FF]/30 space-y-2 text-center">
          <FileCheck className="w-5 h-5 text-[#00E5FF] mx-auto" />
          <div className="font-bold text-white">Consent Verification</div>
          <div className="text-[10px] text-slate-400">Smart Contract Tokens</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-purple-500/30 space-y-2 text-center">
          <ShieldCheck className="w-5 h-5 text-purple-400 mx-auto" />
          <div className="font-bold text-white">Compliance Status</div>
          <div className="text-[10px] text-[#00FFB2]">100% Certified</div>
        </div>

      </div>

      {/* Main Grid: Gauge Scores & Compliance Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Privacy & Trust Score Gauges */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">
              Institutional Privacy & Trust Metric
            </h3>
            <GaugeChart score={mockFederatedMetrics.privacyScore} label="Differential Privacy ε=0.5" size={210} />
            <div className="grid grid-cols-2 gap-3 w-full font-mono text-xs pt-2">
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] text-slate-400">Privacy Score</div>
                <div className="font-bold text-[#00FFB2] text-lg">{mockFederatedMetrics.privacyScore} / 100</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] text-slate-400">Trust Score</div>
                <div className="font-bold text-[#00E5FF] text-lg">99.9 / 100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Compliance Checklist & Live Audit Stream */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#00FFB2]" />
              Regulatory Compliance Status Matrix
            </h3>

            <div className="space-y-3">
              {complianceChecklist.map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00FFB2]" />
                      {c.title}
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1">{c.detail}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30 text-[10px] font-bold whitespace-nowrap">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
            <h3 className="text-xs uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00FFB2]" />
              Live Audit Log Stream
            </h3>

            <div className="space-y-2">
              {liveAuditLogs.map((log, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{log.time}</span>
                    <span className="text-white font-bold">{log.node}</span>
                    <span className="text-slate-400">{log.action}</span>
                  </div>
                  <span className="text-[#00FFB2] font-bold">{log.result}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
