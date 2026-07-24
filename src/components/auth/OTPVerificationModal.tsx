import React, { useState } from 'react';
import { Key, ArrowRight, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OTPVerificationModal: React.FC = () => {
  const { verifyOTP, pendingEmail } = useAuth();
  const [otpDigits, setOtpDigits] = useState(['9', '9', '4', '8', '1', '2']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newDigits = [...otpDigits];
    newDigits[index] = val;
    setOtpDigits(newDigits);

    // Auto-focus next box
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpDigits.join('');
    if (code.length < 6) {
      setErrorMsg('Please enter all 6 digits.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      const ok = await verifyOTP(code);
      if (!ok) {
        setErrorMsg('Invalid verification code.');
      }
    } catch (err) {
      setErrorMsg('Verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-[#00E5FF]/30 space-y-6 text-center shadow-2xl">
        
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-[#00FFB2]/40 flex items-center justify-center text-[#00FFB2] mx-auto shadow-cyan-glow">
          <Key className="w-7 h-7 animate-pulse" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-white">2FA Security Code Verification</h2>
          <p className="text-xs font-mono text-slate-300">
            Dispatched 6-digit authentication token to <br />
            <strong className="text-[#00E5FF]">{pendingEmail}</strong>
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otpDigits.map((digit, i) => (
              <input
                key={i}
                id={`otp-input-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-11 h-13 text-center text-xl font-extrabold font-mono rounded-xl bg-slate-900 border border-slate-800 text-[#00FFB2] outline-none focus:border-[#00E5FF] focus:shadow-cyan-glow transition-all"
              />
            ))}
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
                <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Token...
              </>
            ) : (
              <>
                Confirm Code & Initialize Profile <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-xs font-mono text-slate-400">
          Didn't receive code?{' '}
          <button
            type="button"
            onClick={() => setOtpDigits(['9', '9', '4', '8', '1', '2'])}
            className="text-[#00FFB2] hover:underline font-bold"
          >
            Resend SMS OTP
          </button>
        </div>

      </div>
    </div>
  );
};
