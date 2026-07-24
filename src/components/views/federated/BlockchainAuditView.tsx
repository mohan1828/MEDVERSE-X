import React, { useState } from 'react';
import { Database, ShieldCheck, Search } from 'lucide-react';
import { mockBlockchainAuditLedger, type BlockchainAuditBlock } from '../../../data/mockFederatedData';

export const BlockchainAuditView: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<BlockchainAuditBlock>(mockBlockchainAuditLedger[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBlocks = mockBlockchainAuditLedger.filter(
    b => b.hash.toLowerCase().includes(searchQuery.toLowerCase()) || b.eventType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-cyan-glow">
            <Database className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Blockchain Immutable Audit Ledger</h2>
            <p className="text-xs font-mono text-slate-300">
              Proof-of-Federated-Compliance (PoFC) • Decentralized SHA-256 Event & Consent Ledger
            </p>
          </div>
        </div>
      </div>

      {/* Ledger Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl glass-panel border border-[#00FFB2]/30 space-y-1">
          <div className="text-slate-400">Total Validated Blocks</div>
          <div className="text-2xl font-extrabold text-[#00FFB2]">1,048 Blocks</div>
          <div className="text-[10px] text-slate-500">100% Immutable Consensus</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-[#00E5FF]/30 space-y-1">
          <div className="text-slate-400">Consensus Engine</div>
          <div className="text-lg font-bold text-white">PoFC Standard</div>
          <div className="text-[10px] text-[#00E5FF]">Proof of Federated Compliance</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-purple-500/30 space-y-1">
          <div className="text-slate-400">Merkle Tree Root</div>
          <div className="text-sm font-bold text-purple-300 truncate">0x51c720a4b91730...</div>
          <div className="text-[10px] text-slate-500">Cryptographically Verifiable</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-[#00FFB2]/30 space-y-1">
          <div className="text-slate-400">Verification Status</div>
          <div className="text-sm font-bold text-[#00FFB2] flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#00FFB2]" /> 100% Verified
          </div>
          <div className="text-[10px] text-slate-500">Zero Tamper Risk</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-slate-800">
        <Search className="w-4 h-4 text-[#00E5FF]" />
        <input
          type="text"
          placeholder="Search blockchain blocks by event type or SHA-256 hash..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs font-mono text-white placeholder-slate-500 outline-none"
        />
      </div>

      {/* Block Explorer Table */}
      <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-[#00E5FF]" />
          Immutable Block Stream Explorer
        </h3>

        <div className="space-y-3">
          {filteredBlocks.map((block) => {
            const isSelected = selectedBlock.blockIndex === block.blockIndex;
            return (
              <div
                key={block.blockIndex}
                onClick={() => setSelectedBlock(block)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 border-[#00E5FF] shadow-cyan-glow'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
                      Block #{block.blockIndex}
                    </span>
                    <span className="font-bold text-white text-sm">{block.eventType}</span>
                  </div>
                  <span className="text-[10px] text-[#00FFB2] px-2.5 py-0.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30 font-bold">
                    {block.verificationStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-500 text-[9px] block">Block Hash</span>
                    <span className="font-bold text-[#00E5FF] truncate block">{block.hash}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] block">Previous Hash</span>
                    <span className="font-bold text-slate-300 truncate block">{block.previousHash}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] block">Merkle Root</span>
                    <span className="font-bold text-purple-300 truncate block">{block.merkleRoot}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] block">Validator Vault</span>
                    <span className="font-bold text-white truncate block">{block.validator}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
