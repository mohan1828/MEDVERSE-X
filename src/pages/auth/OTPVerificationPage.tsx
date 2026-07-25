import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Clock, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { OTPInput } from '../../components/auth/OTPInput';

export const OTPVerificationPage: React.FC = () => {
  const { verifyOTP, setScreen } = useAuth();
  const [otpDigits, setOtpDigits] = useState(['9', '0', '1', '8', '4', '2']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState<number>(300); // 5 minutes countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDigitChange = (index: number, val: string) => {
    const next = [...otpDigits];
    next[index] = val.slice(-1);
    setOtpDigits(next);
  };

  const handleResend = () => {
    setTimer(300);
    setOtpDigits(['9', '0', '1', '8', '4', '2']);
    alert('New 6-digit OTP security PIN dispatched to your email! (Valid for 5 minutes)');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (timer <= 0) {
      alert('Verification code has expired. Please click Resend Code.');
      return;
    }
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
      badgeTitle="Account Activation"
      heroHeadline="Verify Email & Activate Account"
      heroSubtitle="Email verification is required only ONCE upon signup. Once verified, your account becomes permanently active across all devices."
    >
      <div className="space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-[#00FFB2]/40 flex items-center justify-center text-[#00FFB2] mx-auto shadow-cyan-glow">
          <ShieldCheck className="w-8 h-8 animate-pulse" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-white">One-Time Account Activation</h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Enter the 6-digit verification code sent to your registered email
          </p>
        </div>

        {/* 5-Minute Expiry Countdown Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF]">
          <Clock className="w-4 h-4 text-[#00FFB2]" />
          <span>Code Expires In: <strong className="text-white font-extrabold">{formatTime(timer)}</strong></span>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <OTPInput otpDigits={otpDigits} onChangeDigit={handleDigitChange} />

          <button
            type="submit"
            disabled={isLoading || timer <= 0}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2"
          >
            {isLoading ? <span>Verifying Cryptographic Hash...</span> : <><span>Verify Email & Activate Account</span><ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
          <span>Didn't receive verification email?</span>
          <button
            onClick={handleResend}
            className="text-[#00E5FF] font-bold flex items-center gap-1 hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Resend Code
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
