import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordStrength } from '../../components/auth/PasswordStrength';

export const ResetPasswordPage: React.FC = () => {
  const { setScreen } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsSuccess(true);
  };

  return (
    <AuthLayout
      badgeTitle="Password Update"
      heroHeadline="Set New Account Password"
      heroSubtitle="Ensure your new password contains 10+ characters, numbers, and special characters."
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Create New Password</h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Update credentials for user profile
          </p>
        </div>

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-slate-900 border border-[#00FFB2]/40 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#00FFB2] mx-auto" />
            <div className="text-base font-bold text-white font-mono">Password Updated Successfully!</div>
            <p className="text-xs text-slate-300">
              Your security credentials have been updated. You can now sign in.
            </p>
            <button
              onClick={() => setScreen('login')}
              className="w-full py-3 rounded-xl bg-[#00E5FF] text-black font-bold text-xs font-mono uppercase tracking-wider shadow-cyan-glow"
            >
              Proceed to Sign In →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">New Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
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
              <label className="text-xs font-mono text-slate-300">Confirm New Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <PasswordStrength password={newPassword} />

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};
