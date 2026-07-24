import React, { useState } from 'react';
import { Clock, Sparkles, Calendar, ShieldCheck } from 'lucide-react';

export const HealthTimelineView: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const timelineMilestones = [
    {
      horizon: 'Today',
      bodyAge: '29.4 yrs',
      healthScore: 97,
      summary: 'Baseline prime condition. Minimal metabolic inflammation and robust HRV (68 ms).',
      milestones: [
        'ApoB: 52 mg/dL (Optimal)',
        'VO2 Max: 48.2 mL/kg/min',
        'Epigenetic DNA methylation age 4.6 yrs younger than chronological age'
      ],
      diseaseProbabilities: { heart: 3.2, stroke: 1.8, diabetes: 6.1, cancer: 2.1 }
    },
    {
      horizon: '6 Months',
      bodyAge: '28.9 yrs',
      healthScore: 98,
      summary: 'Targeted Zone 2 aerobic adaptation increases mitochondrial density by 14%.',
      milestones: [
        'VO2 Max projected: 50.4 mL/kg/min',
        'Resting HR drops to 61 bpm',
        'Endothelial nitric oxide synthesis peaks'
      ],
      diseaseProbabilities: { heart: 2.8, stroke: 1.5, diabetes: 5.2, cancer: 2.0 }
    },
    {
      horizon: '2 Years',
      bodyAge: '28.2 yrs',
      healthScore: 98,
      summary: 'Long-term vascular elasticity maintained with zero subclinical atheroma formation.',
      milestones: [
        'Carotid intima-media thickness stable',
        'Continuous glycemic variability < 12 mg/dL',
        'Somatic cell telomere attrition rate suppressed by 38%'
      ],
      diseaseProbabilities: { heart: 2.4, stroke: 1.4, diabetes: 4.5, cancer: 1.8 }
    },
    {
      horizon: '5 Years',
      bodyAge: '27.8 yrs',
      healthScore: 99,
      summary: 'Epigenetic longevity optimization shields against early sarcopenia and cognitive decline.',
      milestones: [
        'Peak bone mineral density T-score +1.8',
        'Deep sleep glymphatic clearance maintains zero amyloid-beta buildup',
        'Immune senescent cell clearance active'
      ],
      diseaseProbabilities: { heart: 2.1, stroke: 1.2, diabetes: 3.8, cancer: 1.6 }
    },
    {
      horizon: '10 Years',
      bodyAge: '28.5 yrs',
      healthScore: 97,
      summary: 'Chronological age 44 vs Biological age 28.5 (15.5 Year Longevity Delta).',
      milestones: [
        'Vascular age equivalent to a 25-year-old',
        'Cardiovascular mortality risk 82% below population mean',
        'Full metabolic flexibility preserved'
      ],
      diseaseProbabilities: { heart: 2.5, stroke: 1.5, diabetes: 4.1, cancer: 2.2 }
    }
  ];

  const current = timelineMilestones[selectedMilestone];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Health Prognosis & Longevity Timeline</h1>
            <p className="text-xs text-slate-300 font-mono">
              Multi-Year Disease Evolution Trajectory from Today to 10 Years Future
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00FFB2] px-3 py-1.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
          <Sparkles className="w-4 h-4" />
          <span>15.5 Year Biological Age Advantage</span>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#00FFB2]" />
          Select Prognosis Horizon Scrubbing Line
        </h3>

        <div className="grid grid-cols-5 gap-3">
          {timelineMilestones.map((m, idx) => {
            const isSelected = selectedMilestone === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedMilestone(idx)}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#00E5FF]/20 to-[#00FFB2]/20 border-[#00E5FF] shadow-cyan-glow'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`text-sm font-bold font-mono ${isSelected ? 'text-[#00E5FF]' : 'text-slate-200'}`}>
                  {m.horizon}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  Score: {m.healthScore}/100
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 glass-panel-glow p-6 rounded-3xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#00E5FF]">Prognosis Target</span>
              <h2 className="text-3xl font-extrabold text-white">{current.horizon} Prognosis</h2>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold font-mono text-[#00FFB2]">{current.bodyAge}</div>
              <div className="text-[10px] font-mono text-slate-400">Simulated Bio-Age</div>
            </div>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            {current.summary}
          </p>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">Key Biological Milestones</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {current.milestones.map((m, i) => (
                <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-[#00FFB2] flex-shrink-0" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#00E5FF]">
            Projected Disease Probabilities ({current.horizon})
          </h3>

          <div className="space-y-3">
            {Object.entries(current.diseaseProbabilities).map(([diseaseKey, prob]) => (
              <div key={diseaseKey} className="space-y-1">
                <div className="flex justify-between text-xs font-mono capitalize">
                  <span className="text-slate-300">{diseaseKey} Vector</span>
                  <span className="font-bold text-[#00FFB2]">{prob}% Risk</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div style={{ width: `${prob * 5}%` }} className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
