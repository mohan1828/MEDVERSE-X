import React, { useState } from 'react';
import { Shield, Lock, Eye, Database, FileCheck, Key } from 'lucide-react';

export const SecurityConsentView: React.FC = () => {
  const [researchConsent, setResearchConsent] = useState(true);
  const [emergencySharing, setEmergencySharing] = useState(true);
  const [eternaMindBackup, setEternaMindBackup] = useState(true);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border border-emerald-500/30 shadow-emerald-glow">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Shield className="w-4 h-4" /> Zero-Trust Security & Consent Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Security Dashboard & Consent Management
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Manage your HIPAA-compliant cryptographic permissions, data sharing policies, emergency tele-access rules, and EternaMind X digital identity encryption keys.
          </p>
        </div>
      </div>

      {/* Security Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <Lock className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase">256-Bit AES</span>
          </div>
          <div className="text-2xl font-extrabold text-white">Encrypted</div>
          <div className="text-xs text-slate-400">End-to-End Cryptographic Ledger</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#00E5FF]/30 space-y-2">
          <div className="flex items-center justify-between text-[#00E5FF]">
            <FileCheck className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase">HIPAA / GDPR</span>
          </div>
          <div className="text-2xl font-extrabold text-white">100% Compliant</div>
          <div className="text-xs text-slate-400">Zero Speculation Privacy Guard</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <Key className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase">Public/Private</span>
          </div>
          <div className="text-2xl font-extrabold text-white">Self-Sovereign</div>
          <div className="text-xs text-slate-400">Owner Holds Identity Keys</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase">Audit Trail</span>
          </div>
          <div className="text-2xl font-extrabold text-white">Immutable</div>
          <div className="text-xs text-slate-400">142 Data Access Events Logged</div>
        </div>
      </div>

      {/* Consent Toggles */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-extrabold text-white font-mono flex items-center gap-2">
          <Eye className="w-5 h-5 text-emerald-400" /> Active Consent Permissions
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <h4 className="font-bold text-white text-sm">Emergency Tele-ICU Access</h4>
              <p className="text-xs text-slate-400">Allow verified emergency response teams to read your QR profile during SOS alerts.</p>
            </div>
            <button
              onClick={() => setEmergencySharing(!emergencySharing)}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                emergencySharing ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <h4 className="font-bold text-white text-sm">EternaMind X Blockchain Vault Backup</h4>
              <p className="text-xs text-slate-400">Encrypt cognitive DNA and family lineage graph across decentralized vaults.</p>
            </div>
            <button
              onClick={() => setEternaMindBackup(!eternaMindBackup)}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                eternaMindBackup ? 'bg-purple-600 justify-end' : 'bg-slate-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <h4 className="font-bold text-white text-sm">AI Research & Epidemiological Insights</h4>
              <p className="text-xs text-slate-400">Contribute anonymized vital trends to advance precision medicine models.</p>
            </div>
            <button
              onClick={() => setResearchConsent(!researchConsent)}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                researchConsent ? 'bg-[#00E5FF] justify-end' : 'bg-slate-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
