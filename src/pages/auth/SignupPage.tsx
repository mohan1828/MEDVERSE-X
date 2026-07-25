import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { RoleSelector } from '../../components/auth/RoleSelector';
import { PasswordStrength } from '../../components/auth/PasswordStrength';

export const SignupPage: React.FC = () => {
  const { signup, selectedRole, setSelectedRole, setScreen } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!acceptTerms) {
      setErrorMsg('Please accept the HIPAA & GDPR Privacy Terms.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signup({ name, email, phone, country, password, role: selectedRole });
    } catch (err: any) {
      setErrorMsg('Signup failed. Email may already be registered.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      badgeTitle="Enterprise Onboarding"
      heroHeadline="Create Your Super-Intelligence Profile"
      heroSubtitle="Join 142 connected medical institutions and 250,000+ patients managing bio-twins safely."
    >
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Create Account</h1>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Initialize your encrypted digital twin container
          </p>
        </div>

        <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs font-mono text-rose-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alexander Vance"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@medverse.ai"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Country / Jurisdiction</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>
          </div>

          <PasswordStrength password={password} />

          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-400 pt-1">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="rounded border-slate-800 bg-slate-900 text-[#00E5FF]"
            />
            <span>I accept HIPAA & GDPR Homomorphic Data Safeguards</span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2 hover:opacity-95 transition-all"
          >
            {isLoading ? <span>Initializing Account...</span> : <><span>Proceed to 2FA Verification</span><ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="text-center font-mono text-xs text-slate-400">
          Already have an account?{' '}
          <button onClick={() => setScreen('login')} className="text-[#00E5FF] font-bold hover:underline">
            Sign In
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
