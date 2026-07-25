import React from 'react';
import { type UserRole } from '../../types/auth';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onSelectRole }) => {
  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'patient', label: 'Patient', desc: 'Digital Twin & Vitals' },
    { id: 'doctor', label: 'Doctor', desc: 'AI Clinical Workspace' },
    { id: 'hospital_admin', label: 'Hospital Admin', desc: 'Enterprise Control' },
    { id: 'researcher', label: 'Researcher', desc: 'Federated Models' },
    { id: 'laboratory', label: 'Laboratory', desc: 'Diagnostics Node' },
    { id: 'responder', label: 'Emergency SOS', desc: 'Ambulance & ICU' },
    { id: 'admin', label: 'System Admin', desc: 'Platform Security' },
  ];

  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-slate-400 block">Select Access Role</label>
      <div className="flex overflow-x-auto gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 scrollbar-none">
        {roles.map((r) => {
          const isSelected = selectedRole === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onSelectRole(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] text-black shadow-cyan-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
