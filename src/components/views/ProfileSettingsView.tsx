import React, { useState } from 'react';
import { User, Pill, Phone, Lock, ShieldCheck } from 'lucide-react';
import { ProfileView } from './ProfileView';
import { EthicalAICenterView } from './eternamind/EthicalAICenterView';
import { mockPatient } from '../../data/mockPatientData';

export type SettingsSubTab = 'profile' | 'prescriptions' | 'contacts' | 'privacy';

export const ProfileSettingsView: React.FC = () => {
  const [subTab, setSubTab] = useState<SettingsSubTab>('profile');

  const subNavItems: { id: SettingsSubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'User & EHR Profile', icon: <User className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'prescriptions', label: 'Prescriptions & Stack', icon: <Pill className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'contacts', label: 'Emergency Contacts', icon: <Phone className="w-4 h-4 text-purple-400" /> },
    { id: 'privacy', label: 'Privacy & Consent Controls', icon: <Lock className="w-4 h-4 text-[#00E5FF]" /> },
  ];

  return (
    <div className="app-container space-y-12 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <User className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Profile & Settings Workspace</h1>
            <p className="text-xs text-slate-300 font-mono">
              EHR Health Records, Active Supplement Stack, Satellite Contacts & Privacy Controls
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00FFB2] px-3 py-1.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
          <ShieldCheck className="w-4 h-4" />
          <span>EHR Verified • End-to-End Encrypted</span>
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap overflow-x-auto gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-[#00E5FF]/20">
        {subNavItems.map((item) => {
          const isActive = subTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] text-black shadow-cyan-glow'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div>
        {subTab === 'profile' && <ProfileView patient={mockPatient} />}

        {subTab === 'prescriptions' && (
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">Active Bio-Supplement & Medication Stack</h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-sm">Omega-3 Ethyl Esters (EPA/DHA)</div>
                  <div className="text-slate-400 text-[10px]">2,000 mg / Daily • High Purity Marine EPA/DHA</div>
                </div>
                <span className="text-[#00FFB2] font-bold">Active</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-sm">Coenzyme Q10 (Ubiquinol)</div>
                  <div className="text-slate-400 text-[10px]">200 mg / Daily • Mitochondrial ETC Booster</div>
                </div>
                <span className="text-[#00FFB2] font-bold">Active</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-sm">Vitamin D3 / K2 MK-7</div>
                  <div className="text-slate-400 text-[10px]">5,000 IU / Daily • Bone & Vascular Integrity</div>
                </div>
                <span className="text-[#00FFB2] font-bold">Active</span>
              </div>
            </div>
          </div>
        )}

        {subTab === 'contacts' && (
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">Satellite Emergency Contact Network</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-sm">Elena Vance (Spouse)</div>
                <div className="text-slate-400">Primary Emergency Contact • Satellite Push Priority</div>
                <div className="font-bold text-[#00FFB2] pt-1">+1 (415) 555-0192</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-sm">Dr. Marcus Vance (Physician)</div>
                <div className="text-slate-400">Personal Primary Care Physician</div>
                <div className="font-bold text-[#00E5FF] pt-1">+1 (415) 555-0144</div>
              </div>
            </div>
          </div>
        )}

        {subTab === 'privacy' && <EthicalAICenterView />}
      </div>

    </div>
  );
};
