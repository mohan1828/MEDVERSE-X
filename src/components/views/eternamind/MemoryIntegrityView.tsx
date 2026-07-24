import React from 'react';
import { ShieldCheck, CheckCircle2, History } from 'lucide-react';
import { mockEternaMindData } from '../../../data/mockEternaMindData';

export const MemoryIntegrityView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00FFB2]/40 flex items-center justify-center text-[#00FFB2] shadow-mint-glow">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Memory Integrity Center & Trust Audit</h2>
            <p className="text-xs text-slate-300 font-mono">
              Cryptographic Verification, Permission Levels, and Immutable Audit Trail
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30 text-[#00FFB2] text-xs font-mono font-bold">
          100% Cryptographic Verification Nominal
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
          <History className="w-4 h-4 text-[#00FFB2]" />
          Immutably Signed Knowledge Audit Log
        </h3>

        <div className="space-y-3">
          {mockEternaMindData.auditTrail.map((rec) => (
            <div key={rec.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00FFB2]" />
                  <span className="font-bold text-white text-sm">{rec.action}</span>
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  Author: <strong className="text-slate-200">{rec.author}</strong> • {rec.timestamp}
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-700 text-slate-300">
                  {rec.permissionLevel}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30 text-[#00FFB2] uppercase font-bold">
                  {rec.verificationStatus}
                </span>
                <span className="text-slate-500 hidden lg:inline">{rec.hash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
