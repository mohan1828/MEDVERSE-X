import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartPulse, Zap, Shield, Cpu, Dna, Brain, Stethoscope, ChevronRight, BarChart3, ArrowRight } from 'lucide-react';
import { HealthGlobeCanvas } from '../3D/HealthGlobeCanvas';
import type { NavTab } from '../Navbar';

interface HomeHeroViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenDemo: () => void;
}

export const HomeHeroView: React.FC<HomeHeroViewProps> = ({ onNavigate, onOpenDemo }) => {
  const stats = [
    { value: '14.2M+', label: 'Health Signals & Cognitive Nodes', detail: 'Real-time multi-omics & memory telemetry' },
    { value: '99.4%', label: 'AI Risk Prediction Accuracy', detail: 'Validated across 12M clinical records' },
    { value: '98.9%', label: 'Digital Twin Telemetry Precision', detail: 'Sub-cellular bio-marker resolution' },
    { value: '< 120ms', label: 'Emergency Dispatch Latency', detail: 'Sub-second trauma center connection' },
    { value: '42.8%', label: 'Healthcare Cost Reduction', detail: 'Preventative bio-twin intervention' }
  ];

  const features = [
    { id: 'health-intelligence' as NavTab, title: 'Health Intelligence', desc: 'Living 3D holographic digital twin continuously mapping your cellular, metabolic, and bio-marker state.', icon: <HeartPulse className="w-6 h-6 text-[#00E5FF]" /> },
    { id: 'legacy-intelligence' as NavTab, title: 'Legacy Intelligence (EternaMind X)', desc: 'The World’s First Living Cognitive Legacy Platform. Preserve decision frameworks, values, and generational wisdom.', icon: <Brain className="w-6 h-6 text-purple-400" /> },
    { id: 'health-intelligence' as NavTab, title: 'What-If Simulator', desc: 'Simulate future health outcomes, body age, and disease risks by adjusting lifestyle variables in real time.', icon: <Zap className="w-6 h-6 text-[#00FFB2]" /> },
    { id: 'ai-intelligence' as NavTab, title: 'AI Doctor RAG', desc: 'Medical super-intelligence providing instant clinical answers, symptom checking, and PubMed RAG evidence.', icon: <Stethoscope className="w-6 h-6 text-[#7C3AED]" /> },
    { id: 'ai-intelligence' as NavTab, title: 'AI Autonomous Swarm', desc: 'Swarm of 8 specialized clinical agents (Athena, Apollo, Hermes, Nova) monitoring your health 24/7.', icon: <Cpu className="w-6 h-6 text-[#00E5FF]" /> },
    { id: 'emergency-center' as NavTab, title: 'Emergency Center', desc: 'Sub-millisecond cardiac and stroke watchdog auto-dispatching ambulances and reserving hospital ICU beds.', icon: <Shield className="w-6 h-6 text-rose-500" /> },
    { id: 'ai-intelligence' as NavTab, title: 'Knowledge Graph', desc: 'Interactive neural force-graph linking your biomarkers with 3.4M clinical trials, drugs, and genetic vectors.', icon: <Dna className="w-6 h-6 text-[#00FFB2]" /> },
    { id: 'insights-analytics' as NavTab, title: 'Insights & Analytics', desc: 'Multi-year disease evolution trajectories predicting outcomes from Today to 10 Years into the future.', icon: <BarChart3 className="w-6 h-6 text-[#7C3AED]" /> }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      <section className="relative pt-6 lg:pt-12 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] shadow-cyan-glow"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-[#00FFB2]" />
            <span>Autonomous Healthcare & Cognitive Super Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            The Future of Healthcare Starts Before <span className="text-gradient-cyan">Disease Begins.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            MEDVERSE-X creates a living AI Digital Twin that continuously predicts diseases, explains risks, simulates future health outcomes, and integrates EternaMind X voluntary cognitive legacy preservation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('health-intelligence')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#00E5FF] text-black font-bold text-sm tracking-wide shadow-cyan-glow flex items-center gap-2 group"
            >
              <HeartPulse className="w-5 h-5" />
              <span>Launch Digital Twin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenDemo}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-900/60 to-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-purple-500/40 flex items-center gap-2 shadow-purple-glow transition-all"
            >
              <Brain className="w-4 h-4 text-purple-300 animate-pulse" />
              <span>EternaMind X</span>
            </motion.button>
          </motion.div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
            <span>Engineering Core:</span>
            <span className="text-slate-200">Apple AI</span>
            <span>•</span>
            <span className="text-slate-200">OpenAI</span>
            <span>•</span>
            <span className="text-slate-200">Google DeepMind</span>
            <span>•</span>
            <span className="text-slate-200">NVIDIA BioNeMo</span>
          </div>

        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full aspect-square max-w-[480px]">
            <HealthGlobeCanvas />
          </div>
        </div>

      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel p-6 lg:p-8 rounded-3xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="space-y-1 text-center lg:text-left"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gradient-cyan">
                {st.value}
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {st.label}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {st.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Super-Intelligence Architecture
          </h2>
          <p className="text-sm text-slate-400">
            Physical health biometrics and cognitive wisdom preservation united in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              onClick={() => onNavigate(feat.id)}
              className="glass-panel p-6 rounded-2xl cursor-pointer group hover:border-[#00E5FF]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-1 text-xs font-mono text-[#00E5FF] font-semibold group-hover:translate-x-1 transition-transform">
                <span>Explore Feature</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

      </section>

    </div>
  );
};
