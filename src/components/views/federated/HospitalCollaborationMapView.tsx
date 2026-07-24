import React, { useState } from 'react';
import { FederatedGlobeCanvas } from '../../3D/FederatedGlobeCanvas';
import { mockHospitalNodes, type HospitalNode } from '../../../data/mockFederatedData';
import { Globe, Building2, ShieldCheck } from 'lucide-react';

export const HospitalCollaborationMapView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<HospitalNode>(mockHospitalNodes[0]);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Global Hospital Collaboration Map</h2>
            <p className="text-xs font-mono text-slate-300">
              3D Interactive Network mapping 142 connected medical institutions and active gradient telemetry
            </p>
          </div>
        </div>
      </div>

      {/* 3D Globe Collaboration Canvas */}
      <div className="space-y-4">
        <FederatedGlobeCanvas onSelectNode={(node) => setSelectedNode(node)} />
      </div>

      {/* Hospital Nodes Table Grid */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <Building2 className="w-5 h-5 text-[#00E5FF]" />
            Connected Healthcare Institutions Topology
          </h3>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00FFB2]">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Raw Patient Data Transmitted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {mockHospitalNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 border-[#00FFB2] shadow-cyan-glow'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{node.type}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    node.status === 'Online' ? 'bg-[#00FFB2]/10 text-[#00FFB2]' : 'bg-[#00E5FF]/10 text-[#00E5FF]'
                  }`}>
                    {node.status}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-white text-sm leading-snug">{node.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{node.location}, {node.country}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <div>
                    <div className="text-slate-500 text-[9px]">Local Dataset</div>
                    <div className="font-bold text-[#00FFB2]">{(node.dataRecords / 1000000).toFixed(2)}M Records</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px]">Accuracy</div>
                    <div className="font-bold text-[#00E5FF]">{node.localAccuracy}%</div>
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 flex items-center justify-between pt-1">
                  <span>Hash: {node.gradientHash}</span>
                  <span>{node.latencyMs}ms</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
