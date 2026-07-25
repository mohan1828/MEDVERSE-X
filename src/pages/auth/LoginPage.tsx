import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { RoleSelector } from '../../components/auth/RoleSelector';
import { SocialLogin } from '../../components/auth/SocialLogin';

export const LoginPage: React.FC = () => {
  const { login, selectedRole, setSelectedRole, setScreen } = useAuth();
  const [email, setEmail] = useState('alexander.vance@medverse.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
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
    <AuthLayout
      badgeTitle="Institutional Gateway"
      heroHeadline="Enterprise Role Authentication"
      heroSubtitle="Select your role tier to access the Autonomous Digital Twin OS, PubMed RAG, and Federated AI Nodes."
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Sign In to MEDVERSE-X</h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Access your bio-twin telemetry or enterprise clinical node
          </p>
        </div>

        <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs font-mono text-rose-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <label className="text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => setScreen('forgot-password')}
                className="text-[#00E5FF] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-800 bg-slate-900 text-[#00E5FF] focus:ring-0"
              />
              <span>Remember Session (30 Days)</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2 hover:opacity-95 transition-all"
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In as {selectedRole.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <SocialLogin onSSOClick={() => handleSubmit({ preventDefault: () => {} } as any)} />

        <div className="text-center font-mono text-xs text-slate-400">
          Don't have an enterprise account?{' '}
          <button onClick={() => setScreen('signup')} className="text-[#00E5FF] font-bold hover:underline">
            Create Account
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
