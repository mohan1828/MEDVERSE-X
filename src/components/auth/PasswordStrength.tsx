import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  if (!password) return null;

  const getStrength = () => {
    if (password.length < 6) return { label: 'Weak', score: 25, color: 'bg-rose-500' };
    if (password.length < 10) return { label: 'Moderate', score: 60, color: 'bg-amber-400' };
    return { label: 'Strong (Enterprise Standard)', score: 100, color: 'bg-[#00FFB2]' };
  };

  const strength = getStrength();

  return (
    <div className="space-y-1 font-mono text-xs">
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>Password Strength: <strong className="text-white">{strength.label}</strong></span>
        <span>{strength.score}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
        <div className={`h-full ${strength.color} transition-all`} style={{ width: `${strength.score}%` }} />
      </div>
    </div>
  );
};
