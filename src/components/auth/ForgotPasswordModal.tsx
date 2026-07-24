import React, { useState } from 'react';
import { Key, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ForgotPasswordModal: React.FC = () => {
  const { pendingEmail, setScreen } = useAuth();
  const [email, setEmail] = useState(pendingEmail || 'alexander.vance@medverse.ai');
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [newPassword, setNewPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('reset');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setScreen('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-[#00E5FF]/30 space-y-6 text-center shadow-2xl">
        
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-400 mx-auto shadow-cyan-glow">
          <Key className="w-7 h-7 animate-pulse" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-white">Reset Account Password</h2>
          <p className="text-xs font-mono text-slate-300">
            {step === 'email' ? 'Enter registered institutional email' : 'Set your new high-entropy password'}
          </p>
        </div>

        {isSuccess ? (
          <div className="p-4 rounded-2xl bg-[#00FFB2]/10 border border-[#00FFB2]/30 text-[#00FFB2] font-mono text-xs space-y-2">
            <CheckCircle2 className="w-6 h-6 mx-auto" />
            <div className="font-bold">Password Reset Successfully!</div>
            <div className="text-[10px] text-slate-400">Redirecting to login workspace...</div>
          </div>
        ) : step === 'email' ? (
          <form onSubmit={handleSendReset} className="space-y-4 font-mono text-xs">
            <div className="text-left">
              <label className="text-slate-400 block mb-1">Institutional Email</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2"
            >
              Dispatch Reset Token <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4 font-mono text-xs">
            <div className="text-left">
              <label className="text-slate-400 block mb-1">New Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow"
            >
              Update Password & Sign In
            </button>
          </form>
        )}

        <div className="text-xs font-mono text-slate-400">
          <button
            onClick={() => setScreen('login')}
            className="text-[#00E5FF] hover:underline"
          >
            ← Back to Login
          </button>
        </div>

      </div>
    </div>
  );
};
