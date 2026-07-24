import React, { useState } from 'react';
import { Sliders, Building2, Shield, Calendar, Key } from 'lucide-react';
import { mockHospitalNodes, type HospitalNode } from '../../../data/mockFederatedData';

export const AdminControlPanelView: React.FC = () => {
  const [nodes, setNodes] = useState<HospitalNode[]>(mockHospitalNodes);
  const [scheduleInterval, setScheduleInterval] = useState<string>('Every 6 Hours (Automated)');
  const [dpEpsilon, setDpEpsilon] = useState<number>(0.5);

  const toggleNodeStatus = (id: string) => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, status: n.status === 'Online' ? 'Idle' : 'Online' };
      }
      return n;
    }));
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Sliders className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Enterprise Admin & Institutional Governance</h2>
            <p className="text-xs font-mono text-slate-300">
              Manage Node Permissions, Automated FL Schedules, Security Policies & Differential Privacy Controls
            </p>
          </div>
        </div>
      </div>

      {/* Global Security Policy Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase text-[#00E5FF] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00FFB2]" /> Training Schedule
          </h3>
          <div className="space-y-3">
            <label className="text-slate-400 block">Automated Round Frequency</label>
            <select
              value={scheduleInterval}
              onChange={(e) => setScheduleInterval(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono outline-none"
            >
              <option>Every 6 Hours (Automated)</option>
              <option>Every 12 Hours</option>
              <option>Daily at 00:00 UTC</option>
              <option>Manual Trigger Only</option>
            </select>
            <div className="text-[10px] text-slate-500">Next Scheduled Round: Today at 06:00 UTC</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase text-[#00E5FF] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00FFB2]" /> Differential Privacy Policy
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-slate-400">
              <span>Privacy Noise Multiplier (ε)</span>
              <span className="font-bold text-[#00FFB2]">{dpEpsilon}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={dpEpsilon}
              onChange={(e) => setDpEpsilon(parseFloat(e.target.value))}
              className="w-full accent-[#00FFB2]"
            />
            <div className="text-[10px] text-slate-500">HIPAA & GDPR minimum threshold: ε ≤ 1.0</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase text-[#00E5FF] flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-400" /> Key Rotation & RBAC
          </h3>
          <div className="space-y-2">
            <button className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold text-xs">
              Rotate Paillier Keypair
            </button>
            <button className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-purple-400 hover:bg-purple-500/10 font-bold text-xs">
              Audit Node Access Tokens
            </button>
          </div>
        </div>

      </div>

      {/* Hospital Nodes Management Table */}
      <div className="glass-panel p-6 rounded-3xl space-y-4 font-mono text-xs">
        <h3 className="text-base font-bold text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#00E5FF]" />
            Manage Participating Institutional Nodes ({nodes.length})
          </span>
          <span className="text-[#00FFB2] text-xs">Admin Privilege Active</span>
        </h3>

        <div className="space-y-3">
          {nodes.map((n) => (
            <div key={n.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-white text-sm">{n.name}</div>
                <div className="text-slate-400 text-[11px]">{n.location}, {n.country} • {n.securityStatus}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                  n.status === 'Online' ? 'bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {n.status}
                </span>

                <button
                  onClick={() => toggleNodeStatus(n.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    n.status === 'Online'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
                      : 'bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30 hover:bg-[#00FFB2]/20'
                  }`}
                >
                  {n.status === 'Online' ? 'Pause Node' : 'Activate Node'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
