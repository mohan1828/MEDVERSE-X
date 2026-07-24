import React from 'react';
import { AlertCircle, Pill, FileCheck, Phone } from 'lucide-react';
import type { PatientProfile } from '../../data/mockPatientData';

interface ProfileViewProps {
  patient: PatientProfile;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ patient }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      <div className="glass-panel p-6 lg:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00E5FF] via-[#7C3AED] to-[#00FFB2] p-[2px] shadow-cyan-glow">
            <div className="w-full h-full bg-[#0B1220] rounded-[22px] flex items-center justify-center text-3xl font-extrabold text-white">
              AV
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white">{patient.name}</h1>
              <span className="px-3 py-1 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30 text-[#00FFB2] text-xs font-mono font-bold">
                EHR Verified
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mt-1">
              Twin ID: {patient.twinId} • Age: {patient.age} yrs • Blood Type: {patient.bloodType}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-right">
          <div>
            <div className="text-slate-400">Insurance Status</div>
            <div className="font-bold text-[#00FFB2]">Apex Bio-Security Premier</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
            <Pill className="w-4 h-4 text-[#00FFB2]" />
            Active Supplement & Drug Stack
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="font-bold text-white">Omega-3 Ethyl Esters (EPA/DHA)</div>
              <div className="text-slate-400 font-mono text-[10px]">2,000 mg / Daily • High Purity Marine</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="font-bold text-white">Coenzyme Q10 (Ubiquinol)</div>
              <div className="text-slate-400 font-mono text-[10px]">200 mg / Daily • Mitochondrial Support</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="font-bold text-white">Vitamin D3 / K2 MK-7</div>
              <div className="text-slate-400 font-mono text-[10px]">5,000 IU / Daily • Bone & Immunity</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            Verified Bio-Allergies & Risks
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-slate-200">
              <div className="font-bold text-amber-300">Penicillin Antibiotics</div>
              <div className="text-[10px] text-slate-400 font-mono">Reaction: Mild Urticaria Rash (Documented 2016)</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
              <div className="font-bold text-white">Zero Known Food Allergies</div>
              <div className="text-[10px] text-slate-400 font-mono">Full IgG & IgE Blood Assay Clear</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#00FFB2]" />
            Vaccination & Epigenetic Record
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="font-bold text-white">mRNA COVID-19 Bivalent</div>
              <div className="text-[10px] text-slate-400 font-mono">Completed Oct 2024 • Robust T-cell Index</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="font-bold text-white">Tetanus, Diphtheria, Pertussis (Tdap)</div>
              <div className="text-[10px] text-slate-400 font-mono">Updated June 2024</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4 lg:col-span-3">
          <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#00FFB2]" />
            Satellite Emergency Contact Network
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">Elena Vance (Spouse)</div>
                <div className="text-slate-400">Primary Emergency Contact • Satellite Push Priority</div>
              </div>
              <span className="font-bold text-[#00FFB2]">+1 (415) 555-0192</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">Dr. Marcus Vance (Physician)</div>
                <div className="text-slate-400">Personal Primary Care Physician</div>
              </div>
              <span className="font-bold text-[#00E5FF]">+1 (415) 555-0144</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
