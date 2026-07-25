import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { OTPInput } from '../../components/auth/OTPInput';

export const OTPVerificationPage: React.FC = () => {
  const { verifyOTP, setScreen } = useAuth();
  const [otpDigits, setOtpDigits] = useState(['9', '0', '1', '8', '4', '2']);
  const [isLoading, setIsLoading] = useState(false);

  const handleDigitChange = (index: number, val: string) => {
    const next = [...otpDigits];
    next[index] = val.slice(-1);
    setOtpDigits(next);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const code = otpDigits.join('');
    try {
      await verifyOTP(code);
      setScreen('onboarding');
    } catch (err) {
      alert('Verification failed. Try code 901842');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      badgeTitle="2FA Verification"
      heroHeadline="Two-Factor Authentication Check"
      heroSubtitle="Enter the 6-digit cryptographic PIN generated for your session."
    >
      <div className="space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-[#00FFB2]/40 flex items-center justify-center text-[#00FFB2] mx-auto shadow-cyan-glow">
          <ShieldCheck className="w-8 h-8 animate-pulse" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-white">Enter 6-Digit Verification PIN</h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Sent to your registered mobile device & email
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <OTPInput otpDigits={otpDigits} onChangeDigit={handleDigitChange} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2"
          >
            {isLoading ? <span>Verifying Cryptographic Hash...</span> : <><span>Complete Verification</span><ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="text-xs font-mono text-slate-400">
          Didn't receive code?{' '}
          <button onClick={() => alert('New OTP PIN sent to mobile: 901842')} className="text-[#00E5FF] font-bold">
            Resend SMS PIN
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
