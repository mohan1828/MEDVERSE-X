import React, { useState } from 'react';
import { User, Stethoscope, ShieldAlert, LayoutDashboard, Database } from 'lucide-react';
import { DashboardView } from './DashboardView';
import { AnalyticsView } from './AnalyticsView';
import { EmergencyCenterView } from './EmergencyCenterView';

export type UserRole = 'patient' | 'doctor' | 'admin' | 'emergency';

export const RoleDashboardSwitcher: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('patient');

  return (
    <div className="space-y-6">
      
      {/* Role Toggle Selector Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass-panel p-2 rounded-2xl flex flex-wrap items-center justify-between gap-2 border border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 px-3">
            <LayoutDashboard className="w-4 h-4 text-[#00E5FF]" />
            <span>Active Dashboard Perspective:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveRole('patient')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                activeRole === 'patient' ? 'bg-[#00E5FF] text-black shadow-cyan-glow' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Patient Dashboard</span>
            </button>

            <button
              onClick={() => setActiveRole('doctor')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                activeRole === 'doctor' ? 'bg-purple-600 text-white shadow-purple-glow' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor Console</span>
            </button>

            <button
              onClick={() => setActiveRole('emergency')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                activeRole === 'emergency' ? 'bg-rose-600 text-white shadow-rose-glow' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Emergency Command</span>
            </button>

            <button
              onClick={() => setActiveRole('admin')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                activeRole === 'admin' ? 'bg-emerald-600 text-white shadow-emerald-glow' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Admin & Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Active View */}
      <div>
        {activeRole === 'patient' && <DashboardView onNavigate={() => {}} onTriggerEmergency={() => {}} />}
        {activeRole === 'doctor' && <DashboardView onNavigate={() => {}} onTriggerEmergency={() => {}} />}
        {activeRole === 'emergency' && <EmergencyCenterView />}
        {activeRole === 'admin' && <AnalyticsView />}
      </div>

    </div>
  );
};
