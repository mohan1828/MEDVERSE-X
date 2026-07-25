import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';

export const ForgotPasswordPage: React.FC = () => {
  const { setScreen } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AuthLayout
      badgeTitle="Security Protocol"
      heroHeadline="Account Security & Password Recovery"
      heroSubtitle="Enter your registered email to receive an end-to-end encrypted 6-digit OTP verification PIN."
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Reset Password</h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Self-service security PIN recovery
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 rounded-2xl bg-slate-900 border border-[#00FFB2]/30 space-y-4 text-center">
            <div className="text-sm font-bold text-[#00FFB2] font-mono">OTP Verification Code Dispatched!</div>
            <p className="text-xs text-slate-300">
              We sent a 6-digit verification code to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => setScreen('otp')}
              className="w-full py-3 rounded-xl bg-[#00E5FF] text-black font-bold text-xs font-mono uppercase tracking-wider shadow-cyan-glow"
            >
              Enter 6-Digit OTP Code →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2"
            >
              <span>Send Reset OTP Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center font-mono text-xs">
          <button
            onClick={() => setScreen('login')}
            className="text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
