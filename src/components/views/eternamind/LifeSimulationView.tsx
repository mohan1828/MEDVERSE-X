import React, { useState } from 'react';
import { Play, ShieldAlert } from 'lucide-react';
import { mockEternaMindData } from '../../../data/mockEternaMindData';

export const LifeSimulationView: React.FC = () => {
  const [activeSim, setActiveSim] = useState(mockEternaMindData.simulations[0]);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-purple-glow">
            <Play className="w-6 h-6 text-[#00FFB2]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Educational Life Decision Simulations</h2>
            <p className="text-xs text-slate-300 font-mono">
              Simulated Decision Models Reconstructed Exclusively From Preserved Historical Records
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-xs text-slate-200">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300 uppercase font-mono">Ethical AI Disclosure & Educational Notice</span>
          <p className="mt-0.5 leading-relaxed text-slate-300">
            These simulations are AI-generated educational reconstructions built strictly from information intentionally preserved by the user. They do not claim to recreate consciousness, replace individuals, or make non-documented historical claims.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">
            Available Educational Scenarios
          </h3>
          {mockEternaMindData.simulations.map((sim) => {
            const isSelected = activeSim.id === sim.id;
            return (
              <div
                key={sim.id}
                onClick={() => setActiveSim(sim)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-400 shadow-purple-glow'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-white text-base">{sim.title}</div>
                <div className="text-xs text-slate-400 font-mono mt-1">{sim.historicalContext}</div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-7 glass-panel-glow p-6 rounded-3xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-mono uppercase text-[#00E5FF]">Simulation Target</span>
            <h3 className="text-2xl font-bold text-white">{activeSim.title}</h3>
            <p className="text-xs text-slate-300 font-mono mt-1">{activeSim.historicalContext}</p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
              <span className="font-mono text-amber-400 font-bold uppercase">Key Challenge Encountered</span>
              <p className="text-slate-200">{activeSim.keyChallenge}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs space-y-1">
              <span className="font-mono text-purple-300 font-bold uppercase">Preserved Decision Approach</span>
              <p className="text-slate-200">{activeSim.preservedApproach}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-1">
              <span className="font-mono text-[#00FFB2] font-bold uppercase">Educational Takeaway for Heirs</span>
              <p className="text-slate-200">{activeSim.educationalTakeaway}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between text-xs font-mono text-slate-400">
            <span>Verified Source Count: <strong className="text-[#00FFB2]">{activeSim.verifiedSourceCount} Documents</strong></span>
            <span className="text-slate-400">AI Confidence: 99.1%</span>
          </div>

        </div>

      </div>

    </div>
  );
};
