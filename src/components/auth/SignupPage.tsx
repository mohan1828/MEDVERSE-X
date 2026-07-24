import React, { useState } from 'react';
import { Activity, Mail, Lock, User, Phone, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { type UserRole } from '../../types/auth';

export const SignupPage: React.FC = () => {
  const { signup, selectedRole, setSelectedRole, setScreen } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('United States');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const roles: { id: UserRole; label: string }[] = [
    { id: 'patient', label: 'Patient' },
    { id: 'doctor', label: 'Doctor' },
    { id: 'hospital_admin', label: 'Hospital Admin' },
    { id: 'researcher', label: 'Researcher' },
    { id: 'laboratory', label: 'Laboratory' },
    { id: 'responder', label: 'Emergency Responder' },
    { id: 'admin', label: 'System Admin' },
  ];

  const getPasswordStrength = () => {
    if (!password) return { label: 'None', score: 0, color: 'bg-slate-800' };
    if (password.length < 6) return { label: 'Weak', score: 25, color: 'bg-rose-500' };
    if (password.length < 10) return { label: 'Moderate', score: 60, color: 'bg-amber-400' };
    return { label: 'Strong (Enterprise Standard)', score: 100, color: 'bg-[#00FFB2]' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setErrorMsg('Please accept terms & conditions.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signup({ name, email, phone, password, country, role: selectedRole });
    } catch (err: any) {
      setErrorMsg('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl glass-panel p-6 sm:p-10 rounded-3xl border border-[#00E5FF]/30 space-y-6 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div
            onClick={() => setScreen('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] via-[#7C3AED] to-[#00FFB2] p-[2px] shadow-cyan-glow">
              <div className="w-full h-full bg-[#0B1220] rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#00E5FF] animate-pulse" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-wider text-gradient-cyan">MEDVERSE-X</span>
          </div>

          <button
            onClick={() => setScreen('login')}
            className="text-xs font-mono text-[#00E5FF] hover:underline"
          >
            Already registered? Sign In →
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white">Create Enterprise Account</h2>
          <p className="text-xs font-mono text-slate-300">
            Initialize your encrypted bio-identity & role access token
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          
          {/* Role Picker */}
          <div>
            <label className="text-slate-400 block mb-1">Select Account Role</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all text-center ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] text-black border-[#00E5FF] shadow-cyan-glow'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1">Full Legal Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alexander Vance"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Institutional Email</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@medverse.ai"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1">Phone Number (OTP Verification)</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2831"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Country / Jurisdiction</label>
              <div className="relative flex items-center">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                >
                  <option value="United States">United States</option>
                  <option value="Germany">Germany (EU)</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="India">India</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Confirm Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>
          </div>

          {/* Password Strength Bar */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Password Strength: <strong className="text-white">{strength.label}</strong></span>
                <span>{strength.score}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <div className={`h-full ${strength.color} transition-all`} style={{ width: `${strength.score}%` }} />
              </div>
            </div>
          )}

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="accent-[#00FFB2] rounded"
              />
              <span>I agree to HIPAA, GDPR & MEDVERSE-X Enterprise Terms of Service</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-mono font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black hover:opacity-90 shadow-cyan-glow'
            }`}
          >
            Create Account & Send OTP <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
