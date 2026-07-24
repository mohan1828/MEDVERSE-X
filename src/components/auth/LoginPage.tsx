import React, { useState } from 'react';
import { Activity, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { type UserRole } from '../../types/auth';
import { HealthGlobeCanvas } from '../3D/HealthGlobeCanvas';

export const LoginPage: React.FC = () => {
  const { login, selectedRole, setSelectedRole, setScreen, setPendingEmail } = useAuth();
  const [email, setEmail] = useState('alexander.vance@medverse.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'patient', label: 'Patient', desc: 'Digital Twin & Vitals' },
    { id: 'doctor', label: 'Doctor', desc: 'AI Clinical Workspace' },
    { id: 'hospital_admin', label: 'Hospital Admin', desc: 'Enterprise Control' },
    { id: 'researcher', label: 'Researcher', desc: 'Federated Models' },
    { id: 'laboratory', label: 'Laboratory', desc: 'Diagnostics Node' },
    { id: 'responder', label: 'Emergency SOS', desc: 'Ambulance & ICU' },
    { id: 'admin', label: 'System Admin', desc: 'Platform Security' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      await login({ email, password, role: selectedRole, rememberMe });
    } catch (err: any) {
      setErrorMsg('Invalid login credentials or session timeout.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-5xl glass-panel rounded-3xl overflow-hidden border border-[#00E5FF]/30 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        
        {/* Left Side: 3D Visualizer & Brand Highlights (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950/80 p-8 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="space-y-4">
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

            <div>
              <h2 className="text-xl font-extrabold text-white">Healthcare SaaS Gateway</h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Zero-Knowledge Cryptographic Authentication & Role Verification
              </p>
            </div>
          </div>

          {/* 3D Telemetry Canvas */}
          <div className="my-6 h-56 relative flex items-center justify-center">
            <HealthGlobeCanvas />
          </div>

          <div className="space-y-2 font-mono text-[11px] text-slate-400 border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2 text-[#00FFB2]">
              <ShieldCheck className="w-4 h-4" /> 100% Encrypted & HIPAA Compliant
            </div>
            <div>Sub-millisecond Emergency Dispatch System Active</div>
          </div>
        </div>

        {/* Right Side: Enterprise Login Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white">Sign In to MEDVERSE-X</h2>
            <p className="text-xs font-mono text-slate-300">
              Select your user role and enter your institutional credentials
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 block">Select Access Role</label>
            <div className="flex overflow-x-auto gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 scrollbar-none">
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
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

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Institutional Email Address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@medverse.ai"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Password</span>
                <button
                  type="button"
                  onClick={() => {
                    setPendingEmail(email);
                    setScreen('forgot-password');
                  }}
                  className="text-[#00E5FF] hover:underline text-[11px]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono outline-none focus:border-[#00E5FF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#00E5FF] rounded"
                />
                <span>Remember this device for 30 days</span>
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
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  Sign In to Workspace <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social SSO Integration */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="text-[10px] text-slate-500 font-mono text-center uppercase">Or Continue With SSO</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={handleSubmit}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-center truncate"
              >
                Google
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-center truncate"
              >
                Microsoft
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-center truncate"
              >
                Apple ID
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="p-2.5 rounded-xl bg-slate-900 border border-[#00E5FF]/30 text-[#00E5FF] text-center truncate font-bold"
              >
                Hospital SSO
              </button>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-slate-400 pt-2">
            Don't have an account?{' '}
            <button
              onClick={() => setScreen('signup')}
              className="text-[#00FFB2] font-bold hover:underline"
            >
              Create Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
