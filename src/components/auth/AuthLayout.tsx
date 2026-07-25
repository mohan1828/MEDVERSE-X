import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  badgeTitle?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  badgeTitle = 'MEDVERSE-X SaaS OS',
  heroHeadline = 'Autonomous Digital Twin Healthcare Super Intelligence',
  heroSubtitle = 'Predict, prevent, personalize, and protect with PubMed AI, Bio-Swarm, and 100% Homomorphic Federated Intelligence.'
}) => {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-5xl glass-panel rounded-3xl overflow-hidden border border-[#00E5FF]/30 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        
        {/* Left Side Graphic Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1220] via-slate-900 to-slate-950 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#00E5FF]/20 relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF]">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <span className="font-extrabold text-lg text-white font-mono tracking-wider">MEDVERSE-X</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 text-[10px] font-mono font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{badgeTitle}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
              {heroHeadline}
            </h2>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {heroSubtitle}
            </p>
          </div>

          <div className="pt-8 font-mono text-[10px] text-slate-500 space-y-1 relative z-10">
            <div>• 142 Hospital Nodes Active</div>
            <div>• 3.4M PubMed Papers Ingested</div>
            <div>• Latency &lt; 0.4ms Watchdog</div>
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {children}
        </div>

      </div>
    </div>
  );
};
