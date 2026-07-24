import React from 'react';
import { Network, Building2, FlaskConical, Cpu, Activity, ShieldCheck, Lock, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { mockFederatedMetrics, mockHospitalNodes } from '../../../data/mockFederatedData';
import { GaugeChart } from '../../ui/GaugeChart';

export const FederatedEnterpriseDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Enterprise Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-[#00E5FF]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00E5FF]/10 via-[#7C3AED]/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30 text-[#00FFB2] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Enterprise Federated Core
              </span>
              <span className="text-xs font-mono text-slate-400">
                Current FL Round: <strong className="text-[#00E5FF]">#{mockFederatedMetrics.currentFederatedRound}</strong>
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Federated Intelligence Network Dashboard
            </h1>
            
            <p className="text-sm text-slate-300 max-w-2xl">
              Collaboratively train disease prediction models across global hospital networks. Raw patient records remain 100% inside local hospital firewalls.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-right font-mono">
              <div className="text-[10px] text-slate-400 uppercase">Privacy Guarantee</div>
              <div className="text-sm font-bold text-[#00FFB2] flex items-center gap-1 justify-end">
                <Lock className="w-4 h-4" /> Zero Raw Data
              </div>
              <div className="text-[10px] text-slate-500">ε = 0.5 • Differential Privacy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary 12-Card Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        
        <div className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Connected Hospitals</span>
            <Building2 className="w-4 h-4 text-[#00E5FF]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {mockFederatedMetrics.connectedHospitals}
          </div>
          <div className="text-[11px] text-[#00FFB2] font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Global Health Nodes
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Connected Laboratories</span>
            <FlaskConical className="w-4 h-4 text-[#00FFB2]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {mockFederatedMetrics.connectedLaboratories}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Diagnostic & Bio-Labs
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Connected AI Nodes</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {mockFederatedMetrics.connectedAINodes}
          </div>
          <div className="text-[11px] text-[#00FFB2] font-mono">
            Active Gradient Compute
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Global Model Accuracy</span>
            <Activity className="w-4 h-4 text-[#00E5FF]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-[#00FFB2]">
            {mockFederatedMetrics.globalModelAccuracy}%
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Across 8 Clinical Models
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Local Accuracy Range</span>
            <Sparkles className="w-4 h-4 text-[#00FFB2]" />
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {mockFederatedMetrics.localModelAccuracyMin}% - {mockFederatedMetrics.localModelAccuracyMax}%
          </div>
          <div className="text-[11px] text-[#00FFB2] font-mono">
            Zero Overfitting Variance
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Current FL Round</span>
            <RefreshCw className="w-4 h-4 text-[#00E5FF] animate-spin-slow" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-[#00E5FF]">
            Round #{mockFederatedMetrics.currentFederatedRound}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            FedAvg Weight Convergence
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Privacy Score</span>
            <ShieldCheck className="w-4 h-4 text-[#00FFB2]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-[#00FFB2]">
            {mockFederatedMetrics.privacyScore} / 100
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Differential Privacy Certified
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Security Score</span>
            <Lock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-purple-400">
            {mockFederatedMetrics.securityScore}%
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Paillier Homomorphic Cipher
          </div>
        </div>

      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Privacy & Model Training Progress */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] font-bold">
              Enterprise Privacy & Security Index
            </h3>
            <GaugeChart score={mockFederatedMetrics.privacyScore} label="Top Tier Secure" size={210} />
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 w-full space-y-1">
              <div className="text-[#00FFB2] font-bold">42.8 Million Patient Profiles Protected</div>
              <div className="text-[11px] text-slate-400">No raw records ever leave local hospital servers.</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center justify-between">
              <span>Federated Synchronization Status</span>
              <span className="text-[#00FFB2]">{mockFederatedMetrics.synchronizationStatus}</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Current FL Round #48 Progress</span>
                  <span className="font-bold text-[#00FFB2]">94%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] rounded-full transition-all duration-500 w-[94%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Total Patient Cohort</div>
                  <div className="font-bold text-white text-sm">{mockFederatedMetrics.totalPatientRecordsProtected}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Active Institutions</div>
                  <div className="font-bold text-[#00E5FF] text-sm">{mockFederatedMetrics.participatingInstitutionsCount} Nodes</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Participating Institutions Grid */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#00E5FF]" />
                Participating Healthcare Institutions
              </h3>
              <span className="text-xs font-mono text-[#00FFB2] px-3 py-1 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
                142 Hospitals Connected
              </span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
              {mockHospitalNodes.map((hospital) => (
                <div key={hospital.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#00E5FF]/40 transition-all flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{hospital.name}</div>
                      <div className="text-[10px] text-slate-400">{hospital.location}, {hospital.country} • {(hospital.dataRecords / 1000000).toFixed(2)}M records</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[#00FFB2] font-bold">{hospital.localAccuracy}% Accuracy</div>
                    <div className="text-[10px] text-slate-400">{hospital.latencyMs}ms Latency</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
