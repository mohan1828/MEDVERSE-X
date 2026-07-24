import React from 'react';
import { Lock, ShieldCheck, Server, RefreshCw, Key, CheckCircle2, EyeOff } from 'lucide-react';

export const SecureAggregationView: React.FC = () => {

  const gradientHashes = [
    { hospital: 'Mayo Clinic Node', hash: '0x8f9a21b0981e4c1a2d', status: 'Paillier Cipher Valid', noise: 'ε = 0.5 DP' },
    { hospital: 'Johns Hopkins Lab', hash: '0x3c7e1908d2b77190f8', status: 'Paillier Cipher Valid', noise: 'ε = 0.5 DP' },
    { hospital: 'Charité Berlin Unit', hash: '0x9a10fc419e52001a44', status: 'Paillier Cipher Valid', noise: 'ε = 0.5 DP' },
    { hospital: 'AIIMS New Delhi', hash: '0x5b8a12e99c43810f99', status: 'Paillier Cipher Valid', noise: 'ε = 0.5 DP' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-cyan-glow">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Secure Model Aggregation & Zero-Knowledge Vault</h2>
            <p className="text-xs font-mono text-slate-300">
              Homomorphic Encryption (Paillier) & Secure Multiparty Computation (SMPC) Visualizer
            </p>
          </div>
        </div>
      </div>

      {/* Animated Workflow Diagram */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#00E5FF]/20 space-y-6">
        <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold tracking-wider">
          Homomorphic Encrypted Aggregation Flow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-purple-400 font-bold flex items-center gap-1.5">
              <EyeOff className="w-4 h-4" /> 1. Encrypted Gradients
            </div>
            <p className="text-slate-400 text-[11px]">Local weights hashed & encrypted with Paillier public key.</p>
            <div className="text-[10px] text-[#00FFB2] pt-1">100% Zero Raw Data</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-[#00E5FF] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 2. Privacy Verification
            </div>
            <p className="text-slate-400 text-[11px]">Differential Privacy noise added (ε = 0.5, δ = 1e-5).</p>
            <div className="text-[10px] text-[#00E5FF] pt-1">HIPAA & GDPR Certified</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-[#00FFB2]/50 space-y-2 text-xs font-mono shadow-cyan-glow">
            <div className="text-[#00FFB2] font-bold flex items-center gap-1.5">
              <Server className="w-4 h-4" /> 3. Secure Aggregation
            </div>
            <p className="text-slate-400 text-[11px]">Server computes sum E(W_1) * E(W_2) without decryption.</p>
            <div className="text-[10px] text-[#00FFB2] pt-1">FedAvg Cipher Math</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-purple-400 font-bold flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 animate-spin-slow" /> 4. Global Update
            </div>
            <p className="text-slate-400 text-[11px]">New global weight vector decrypted using consensus key.</p>
            <div className="text-[10px] text-purple-300 pt-1">Model Accuracy +0.3%</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-[#00E5FF] font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00FFB2]" /> 5. Model Distribution
            </div>
            <p className="text-slate-400 text-[11px]">Improved model broadcasted back to all 142 hospitals.</p>
            <div className="text-[10px] text-[#00FFB2] pt-1">Real-time Synced</div>
          </div>

        </div>
      </div>

      {/* Encrypted Gradient Inspection Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center justify-between">
              <span>Live Encrypted Gradient Payload Stream</span>
              <span className="text-[#00FFB2]">4 Active Ingest Nodes</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {gradientHashes.map((g, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{g.hospital}</span>
                    <span className="text-xs text-[#00FFB2] px-2 py-0.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
                      {g.status}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span>Ciphertext Payload: <strong className="text-[#00E5FF]">{g.hash}</strong></span>
                    <span className="text-purple-300">{g.noise}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mathematical Security Specs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
            <h3 className="text-xs uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <Key className="w-4 h-4 text-[#00FFB2]" /> Cryptographic Security Guarantees
            </h3>

            <div className="space-y-3 text-slate-300">
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">Paillier Homomorphic Encryption</div>
                <div className="font-bold text-[#00FFB2]">Additive Homomorphism Active</div>
                <div className="text-[11px] text-slate-400">E(m_1 + m_2) = E(m_1) * E(m_2) mod n^2</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">Differential Privacy Parameter</div>
                <div className="font-bold text-[#00E5FF]">Epsilon ε = 0.5 • Delta δ = 1e-5</div>
                <div className="text-[11px] text-slate-400">Guarantees zero individual record leakage</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">Zero Knowledge Proofs (ZKP)</div>
                <div className="font-bold text-purple-400">zk-SNARKs Gradient Verification</div>
                <div className="text-[11px] text-slate-400">Validates model integrity without inspecting data</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
