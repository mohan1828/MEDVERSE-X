import React from 'react';

interface OTPInputProps {
  otpDigits: string[];
  onChangeDigit: (index: number, val: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ otpDigits, onChangeDigit }) => {
  return (
    <div className="flex justify-center gap-2">
      {otpDigits.map((digit, i) => (
        <input
          key={i}
          id={`otp-input-${i}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => onChangeDigit(i, e.target.value)}
          className="w-11 h-13 text-center text-xl font-extrabold font-mono rounded-xl bg-slate-900 border border-slate-800 text-[#00FFB2] outline-none focus:border-[#00E5FF] focus:shadow-cyan-glow transition-all"
        />
      ))}
    </div>
  );
};
