import React from 'react';
import { Activity, HeartPulse, Cpu, Network, ShieldAlert, Navigation, Brain, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { setScreen, setSelectedRole } = useAuth();

  const keyFeatures = [
    {
      id: 'digital-twin',
      name: 'Digital Twin Telemetry',
      desc: 'Holographic 3D organ biometrics mapping metabolic, cellular, and biomarker vectors in real time.',
      icon: <HeartPulse className="w-6 h-6 text-[#00FFB2]" />,
      badge: 'Living Bio-Twin'
    },
    {
      id: 'ai-doctor',
      name: 'AI Doctor & Clinical RAG',
      desc: 'Super-intelligence trained on 3.4M PubMed papers offering Instant Differential Diagnosis.',
      icon: <Cpu className="w-6 h-6 text-[#00E5FF]" />,
      badge: '3.4M PubMed RAG'
    },
    {
      id: 'federated-intelligence',
      name: 'Federated Intelligence Network',
      desc: 'Collaboratively train disease models across 142 hospitals with zero raw patient data sharing.',
      icon: <Network className="w-6 h-6 text-purple-400" />,
      badge: '100% Homomorphic'
    },
    {
      id: 'emergency-center',
      name: 'Emergency Response SOS',
      desc: 'Sub-millisecond cardiac watchdog auto-dispatching mobile ICUs & reserving cath lab beds.',
      icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
      badge: '< 1ms Watchdog'
    },
    {
      id: 'healthcare-navigator',
      name: 'Healthcare Care Navigator',
      desc: 'Real-time multi-lingual emergency hospital finder, ICU bed monitor & specialist matching.',
      icon: <Navigation className="w-6 h-6 text-[#00E5FF]" />,
      badge: 'Real-time Radar'
    },
    {
      id: 'eternamind',
      name: 'EternaMind X Cognitive Legacy',
      desc: 'Preserve decision frameworks, generational wisdom, and values for future legacy mentoring.',
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      badge: 'Cognitive DNA'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 relative font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      
      {/* Background Aurora Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#00E5FF]/15 via-[#7C3AED]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Cyber Header Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1220]/80 border-b border-[#00E5FF]/20 py-4">
        <div className="app-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] via-[#7C3AED] to-[#00FFB2] p-[2px] shadow-cyan-glow">
              <div className="w-full h-full bg-[#0B1220] rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#00E5FF] animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-gradient-cyan">MEDVERSE-X</span>
              <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-mono">
                ENTERPRISE SaaS OS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setScreen('login')}
              className="px-5 py-2 rounded-xl bg-slate-900 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all font-mono font-bold text-xs"
            >
              Sign In
            </button>
            <button
              onClick={() => setScreen('signup')}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black hover:opacity-90 transition-all font-mono font-extrabold text-xs shadow-cyan-glow"
            >
              Create Account
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <section className="app-container pt-16 pb-20 space-y-12 text-center relative z-10">
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold shadow-cyan-glow">
            <Sparkles className="w-4 h-4 text-[#00FFB2]" />
            <span>The World's First Autonomous AI Healthcare Operating System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Autonomous Digital Twin <br />
            <span className="text-gradient-cyan">Healthcare Super Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Predict, prevent, personalize, and protect. MEDVERSE-X unifies living bio-twin telemetry, PubMed medical RAG, autonomous bio-swarm agents, and federated learning without sharing raw patient data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setSelectedRole('patient');
                setScreen('signup');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-sm uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              Launch Platform Demo <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setScreen('login')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel border border-[#00E5FF]/30 text-white font-mono font-bold text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#00E5FF]" /> Institutional SSO Login
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs max-w-4xl mx-auto pt-6">
          <div className="p-4 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-1">
            <div className="text-slate-400">Connected Hospitals</div>
            <div className="text-2xl font-extrabold text-[#00FFB2]">142 Nodes</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-1">
            <div className="text-slate-400">PubMed Papers RAG</div>
            <div className="text-2xl font-extrabold text-[#00E5FF]">3.4M Indexed</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-1">
            <div className="text-slate-400">Emergency Watchdog</div>
            <div className="text-2xl font-extrabold text-purple-400">&lt; 0.4ms Latency</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-[#00E5FF]/20 space-y-1">
            <div className="text-slate-400">Privacy Guarantee</div>
            <div className="text-2xl font-extrabold text-[#00FFB2]">100% Encrypted</div>
          </div>
        </div>

      </section>

      {/* Feature Showcase Grid */}
      <section className="app-container py-16 space-y-10 border-t border-slate-800">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            6 Unified Super-Intelligence Modules
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Engineered for Patients, Clinicians, Researchers, and Hospital Networks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feat) => (
            <div key={feat.id} className="p-6 rounded-3xl glass-panel border border-[#00E5FF]/20 space-y-4 hover:border-[#00E5FF]/50 transition-all group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-[#00E5FF] transition-all">
                  {feat.icon}
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[#00E5FF] font-bold">
                  {feat.badge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-lg">{feat.name}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{feat.desc}</p>
              </div>

              <button
                onClick={() => setScreen('login')}
                className="text-xs font-mono text-[#00E5FF] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Access Module →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00E5FF]/15 bg-[#0B1220]/90 py-8 text-center text-xs font-mono text-slate-400">
        <div className="app-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gradient-cyan text-sm">MEDVERSE-X</span>
            <span>• Enterprise Healthcare Operating System</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Predict. Prevent. Personalize. Protect.
          </div>
        </div>
      </footer>

    </div>
  );
};
