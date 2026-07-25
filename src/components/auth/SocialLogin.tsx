import React from 'react';

interface SocialLoginProps {
  onSSOClick: () => void;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ onSSOClick }) => {
  return (
    <div className="space-y-3 pt-2 border-t border-slate-800">
      <div className="text-[10px] text-slate-500 font-mono text-center uppercase">Or Continue With SSO</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        <button
          type="button"
          onClick={onSSOClick}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-center truncate"
        >
          Google
        </button>
        <button
          type="button"
          onClick={onSSOClick}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-center truncate"
        >
          Microsoft
        </button>
        <button
          type="button"
          onClick={onSSOClick}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-center truncate"
        >
          Apple ID
        </button>
        <button
          type="button"
          onClick={onSSOClick}
          className="p-2.5 rounded-xl bg-slate-900 border border-[#00E5FF]/30 text-[#00E5FF] text-center truncate font-bold"
        >
          Hospital SSO
        </button>
      </div>
    </div>
  );
};
