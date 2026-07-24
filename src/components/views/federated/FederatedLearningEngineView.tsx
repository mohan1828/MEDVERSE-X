import React, { useState } from 'react';
import { Cpu, Play, Lock, RefreshCw, Zap, Server, Database, Sparkles } from 'lucide-react';
import { mockFederatedMetrics } from '../../../data/mockFederatedData';
import { federatedService } from '../../../services/federatedService';

export const FederatedLearningEngineView: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<string>('FedAvg');
  const [epsilon, setEpsilon] = useState<number>(0.5);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(4);
  const [simulationLog, setSimulationLog] = useState<string[]>([
    '› [Round #48] FedAvg aggregation verified across 142 hospital nodes.',
    '› [Privacy Guard] Differential privacy noise addition (ε = 0.5, δ = 1e-5) active.',
    '› [Encryption Engine] Paillier homomorphic cipher keys verified. Zero raw records exposed.'
  ]);
  const [latestRoundResult, setLatestRoundResult] = useState<any>(null);

  const workflowSteps = [
    { step: 1, name: 'Local Model Training', desc: 'Hospitals A, B, C train local AI on private patient data', icon: <Database className="w-5 h-5 text-[#00E5FF]" /> },
    { step: 2, name: 'Gradient Encryption', desc: 'Local weights encrypted using Paillier & DP noise added', icon: <Lock className="w-5 h-5 text-purple-400" /> },
    { step: 3, name: 'Secure Aggregation', desc: 'Zero-Knowledge aggregation server computes FedAvg weight vector', icon: <Server className="w-5 h-5 text-[#00FFB2]" /> },
    { step: 4, name: 'Global Model Update', desc: 'Enhanced global neural model version published to network', icon: <Sparkles className="w-5 h-5 text-[#00E5FF]" /> },
  ];

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    setActiveStep(1);
    
    setSimulationLog(prev => [`› Starting Federated Learning Round #${mockFederatedMetrics.currentFederatedRound + 1} (${algorithm})...`, ...prev]);

    setTimeout(() => {
      setActiveStep(2);
      setSimulationLog(prev => ['› [Step 2/4] Encrypting gradients with Paillier Homomorphic Encryption...', ...prev]);
    }, 1000);

    setTimeout(() => {
      setActiveStep(3);
      setSimulationLog(prev => ['› [Step 3/4] Secure Aggregation Server executing FedAvg on encrypted weight matrix...', ...prev]);
    }, 2200);

    setTimeout(async () => {
      setActiveStep(4);
      const res = await federatedService.simulateRound('heart-disease', algorithm, epsilon);
      setLatestRoundResult(res);
      setSimulationLog(prev => [
        `› [SUCCESS] Global Model Accuracy improved to ${res.globalAccuracy}% (+${res.accuracyGain}%)!`,
        `› Encrypted Gradient Hash: ${res.encryptedGradientHash}`,
        ...prev
      ]);
      setIsSimulating(false);
    }, 3400);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Federated Collaborative Learning Engine</h2>
            <p className="text-xs font-mono text-slate-300">
              Interactive simulation of privacy-preserving multi-institutional neural model training
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Workflow Diagram */}
      <div className="glass-panel p-6 rounded-3xl space-y-6">
        <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold tracking-wider flex items-center justify-between">
          <span>Federated Learning Execution Pipeline</span>
          <span className="text-[#00FFB2] font-normal">Active Protocol: {algorithm}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {workflowSteps.map((s) => {
            const isActive = activeStep === s.step;
            const isCompleted = activeStep > s.step;
            return (
              <div
                key={s.step}
                className={`p-5 rounded-2xl border transition-all duration-300 relative space-y-3 ${
                  isActive
                    ? 'bg-slate-900 border-[#00E5FF] shadow-cyan-glow'
                    : isCompleted
                    ? 'bg-slate-900/60 border-[#00FFB2]/50'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Step {s.step}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm">{s.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{s.desc}</p>
                </div>

                {isActive && isSimulating && (
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#00FFB2] animate-pulse pt-1">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Processing step...
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Engine Controls & Live Simulation Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl space-y-5">
            <h3 className="text-sm font-bold text-white uppercase font-mono text-[#00E5FF]">
              Federated Training Parameters
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Aggregation Algorithm</label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-[#00E5FF] outline-none"
                >
                  <option value="FedAvg">FedAvg (Federated Averaging)</option>
                  <option value="FedProx">FedProx (Heterogeneous Systems)</option>
                  <option value="FedOpt">FedOpt (Adaptive Federated Optimizer)</option>
                  <option value="SMPC-Fed">SMPC-Fed (Secure Multiparty Computation)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Differential Privacy Budget (Epsilon ε)</span>
                  <span className="font-bold text-[#00FFB2]">{epsilon}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={epsilon}
                  onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                  className="w-full accent-[#00FFB2] cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Lower ε provides stronger privacy protection.</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400">Participating Nodes</div>
                <div className="font-bold text-white">142 Hospitals & Labs Connected</div>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className={`w-full py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isSimulating
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black hover:opacity-90 shadow-cyan-glow'
                }`}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Executing Round #{mockFederatedMetrics.currentFederatedRound + 1}...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Simulate Federated FL Round #{mockFederatedMetrics.currentFederatedRound + 1}
                  </>
                )}
              </button>
            </div>
          </div>

          {latestRoundResult && (
            <div className="p-5 rounded-2xl glass-panel border border-[#00FFB2]/40 space-y-2 font-mono text-xs animate-fade-in">
              <div className="flex items-center justify-between text-[#00FFB2] font-bold">
                <span>Latest Round #{latestRoundResult.roundNumber} Result</span>
                <span>+{latestRoundResult.accuracyGain}% Accuracy</span>
              </div>
              <div className="text-slate-300">Global Model Accuracy: <strong className="text-[#00FFB2]">{latestRoundResult.globalAccuracy}%</strong></div>
              <div className="text-slate-400 text-[10px]">Encrypted Hash: {latestRoundResult.encryptedGradientHash}</div>
            </div>
          )}

        </div>

        {/* Live Terminal Log */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00FFB2]" />
              Live FL Execution Terminal Stream
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 h-[290px] overflow-y-auto scrollbar-thin">
              {simulationLog.map((log, i) => (
                <div key={i} className={`p-1.5 rounded ${i === 0 ? 'text-[#00FFB2] font-bold bg-slate-900/60' : 'text-slate-300'}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
