import React, { useState } from 'react';
import { ShieldCheck, Lock, Download, Trash2, CheckCircle2 } from 'lucide-react';

export const EthicalAICenterView: React.FC = () => {
  const [consentGranted, setConsentGranted] = useState(true);
  const [isExported, setIsExported] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-purple-glow">
            <ShieldCheck className="w-6 h-6 text-[#00FFB2]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Ethical AI & Data Sovereignty Center</h2>
            <p className="text-xs text-slate-300 font-mono">
              Consent Management, Privacy Controls, Export & Permanence Safeguards
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            Voluntary Consent & Family Access
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div>
                <div className="font-bold text-white">Cognitive Legacy Data Processing</div>
                <div className="text-slate-400 text-[10px]">Allow AI mentor queries for designated heirs</div>
              </div>
              <button
                onClick={() => setConsentGranted(!consentGranted)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  consentGranted ? 'bg-[#00FFB2]' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-black absolute top-0.5 transition-transform ${
                  consentGranted ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
              <div className="font-bold text-white">Zero Consciousness Claim Notice</div>
              <div className="text-[10px] text-slate-400 font-mono">Platform operates purely as an educational archival system.</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
            <Download className="w-4 h-4 text-[#00FFB2]" />
            Sovereign Data Export & Deletion
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => setIsExported(true)}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-white flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-[#00FFB2]" />
              <span>Export Full Encrypted Legacy Archive (.ZIP)</span>
            </button>

            <button
              onClick={() => alert('Permanently purge request initiated. Confirmation required via email.')}
              className="w-full py-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/40 text-xs font-mono text-rose-300 hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span>Permanently Delete Legacy Record</span>
            </button>

            {isExported && (
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-[#00FFB2] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Legacy Archive package generated successfully.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
