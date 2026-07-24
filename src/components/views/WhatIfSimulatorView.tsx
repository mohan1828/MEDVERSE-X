import React, { useState, useMemo } from 'react';
import { Zap, RefreshCw, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { defaultInputs, runSimulation, type SimulationInputs } from '../../utils/simulationEngine';

export const WhatIfSimulatorView: React.FC = () => {
  const [inputs, setInputs] = useState<SimulationInputs>(defaultInputs);

  const baselineResults = useMemo(() => runSimulation(defaultInputs), []);
  const simulatedResults = useMemo(() => runSimulation(inputs), [inputs]);

  const handleReset = () => {
    setInputs(defaultInputs);
  };

  const updateInput = (key: keyof SimulationInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const scoreDiff = simulatedResults.healthScore - baselineResults.healthScore;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel-glow p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
              What-If Health Outcome Simulator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/40 font-mono text-xs font-bold">
              Real-Time Physics Engine
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono mt-1">
            Adjust lifestyle bio-variables to immediately simulate future organ health, disease probability, and lifespan deltas.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all shadow-lg"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>Reset to Baseline</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl space-y-6">
          <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00FFB2]" />
            Lifestyle Variables Control Matrix
          </h2>

          <div className="space-y-5">
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-200">Weight Delta (kg)</span>
                <span className={`font-bold ${inputs.weightChangeKg === 0 ? 'text-[#00FFB2]' : inputs.weightChangeKg > 0 ? 'text-amber-400' : 'text-[#00E5FF]'}`}>
                  {inputs.weightChangeKg > 0 ? `+${inputs.weightChangeKg}` : inputs.weightChangeKg} kg
                </span>
              </div>
              <input
                type="range"
                min={-15}
                max={15}
                step={1}
                value={inputs.weightChangeKg}
                onChange={(e) => updateInput('weightChangeKg', parseFloat(e.target.value))}
                className="w-full accent-[#00E5FF] bg-slate-900 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>-15 kg</span>
                <span>Baseline (74 kg)</span>
                <span>+15 kg</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-200">Exercise (hrs / week)</span>
                <span className="font-bold text-[#00FFB2]">{inputs.exerciseHoursPerWeek} hrs/wk</span>
              </div>
              <input
                type="range"
                min={0}
                max={14}
                step={0.5}
                value={inputs.exerciseHoursPerWeek}
                onChange={(e) => updateInput('exerciseHoursPerWeek', parseFloat(e.target.value))}
                className="w-full accent-[#00FFB2] bg-slate-900 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>Sedentary (0h)</span>
                <span>Baseline (4.5h)</span>
                <span>Athlete (14h)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-200">Sleep (hrs / night)</span>
                <span className="font-bold text-[#00E5FF]">{inputs.sleepHoursPerNight} hrs/night</span>
              </div>
              <input
                type="range"
                min={4}
                max={10}
                step={0.5}
                value={inputs.sleepHoursPerNight}
                onChange={(e) => updateInput('sleepHoursPerNight', parseFloat(e.target.value))}
                className="w-full accent-[#00E5FF] bg-slate-900 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>Severe Deprivation (4h)</span>
                <span>Optimal (8.0h)</span>
                <span>Excess (10h)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-200">Smoking (cigarettes / day)</span>
                <span className={`font-bold ${inputs.smokingPerDay > 0 ? 'text-rose-400' : 'text-[#00FFB2]'}`}>
                  {inputs.smokingPerDay} cigs/day
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={inputs.smokingPerDay}
                onChange={(e) => updateInput('smokingPerDay', parseInt(e.target.value))}
                className="w-full accent-rose-500 bg-slate-900 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>Zero (Non-smoker)</span>
                <span>10 cigs</span>
                <span>30 cigs/day</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-200">Alcohol Intake (drinks / week)</span>
                <span className={`font-bold ${inputs.alcoholPerWeek > 5 ? 'text-amber-400' : 'text-slate-200'}`}>
                  {inputs.alcoholPerWeek} drinks/wk
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={inputs.alcoholPerWeek}
                onChange={(e) => updateInput('alcoholPerWeek', parseInt(e.target.value))}
                className="w-full accent-purple-500 bg-slate-900 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>Abstain (0)</span>
                <span>Moderate (3)</span>
                <span>Heavy (20)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-200">Diet Nutrition Quality Index</span>
                <span className="font-bold text-[#00FFB2]">{inputs.dietScore} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={inputs.dietScore}
                onChange={(e) => updateInput('dietScore', parseFloat(e.target.value))}
                className="w-full accent-[#00FFB2] bg-slate-900 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>Processed Food (1)</span>
                <span>Baseline (8.5)</span>
                <span>Optimal Bio-Diet (10)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-200">Perceived Chronic Stress Index</span>
                <span className={`font-bold ${inputs.stressLevel > 40 ? 'text-amber-400' : 'text-[#00FFB2]'}`}>
                  {inputs.stressLevel} / 100
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={inputs.stressLevel}
                onChange={(e) => updateInput('stressLevel', parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-slate-900 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>Zen (1)</span>
                <span>Baseline (18)</span>
                <span>Severe Burnout (100)</span>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          
          <div className="glass-panel-glow p-6 rounded-3xl space-y-6">
            
            <div className="grid grid-cols-2 gap-4 text-center">
              
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Simulated Health Score</span>
                <div className="text-4xl font-extrabold font-mono text-gradient-cyan">
                  {simulatedResults.healthScore}
                </div>
                <div className={`text-xs font-mono font-bold flex items-center justify-center gap-1 ${
                  scoreDiff >= 0 ? 'text-[#00FFB2]' : 'text-rose-400'
                }`}>
                  {scoreDiff >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{scoreDiff >= 0 ? `+${scoreDiff}` : scoreDiff} pts vs baseline</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Estimated Life Delta</span>
                <div className={`text-4xl font-extrabold font-mono ${
                  simulatedResults.lifeExpectancyDelta >= 0 ? 'text-[#00FFB2]' : 'text-rose-400'
                }`}>
                  {simulatedResults.lifeExpectancyDelta >= 0 ? `+${simulatedResults.lifeExpectancyDelta}` : simulatedResults.lifeExpectancyDelta}
                  <span className="text-xs text-slate-400 font-normal ml-1">yrs</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Simulated Body Age: <span className="font-bold text-white">{simulatedResults.bodyAge} yrs</span>
                </div>
              </div>

            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#00E5FF]">
                Organ Telemetry (Baseline vs Simulated)
              </h3>
              
              {Object.entries(simulatedResults.organs).map(([organKey, simScore]) => {
                const baseScore = baselineResults.organs[organKey as keyof typeof baselineResults.organs];
                const diff = simScore - baseScore;
                return (
                  <div key={organKey} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono capitalize">
                      <span className="text-slate-300">{organKey}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">{baseScore}% →</span>
                        <span className={`font-bold ${diff >= 0 ? 'text-[#00FFB2]' : 'text-rose-400'}`}>
                          {simScore}% ({diff >= 0 ? `+${diff}` : diff}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden flex border border-slate-800">
                      <div style={{ width: `${simScore}%` }} className={`h-full rounded-full ${
                        simScore >= 90 ? 'bg-[#00FFB2]' : simScore >= 75 ? 'bg-[#00E5FF]' : 'bg-rose-500'
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#00E5FF]">
                Simulated Disease Probability Shift
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {Object.entries(simulatedResults.risks).map(([riskKey, riskVal]) => (
                  <div key={riskKey} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 capitalize truncate">{riskKey}</div>
                    <div className={`font-bold ${riskVal > 15 ? 'text-rose-400' : 'text-[#00FFB2]'}`}>
                      {riskVal}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold">
                <Sparkles className="w-4 h-4 text-[#00FFB2]" />
                AI Simulator Recommendations
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {simulatedResults.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00E5FF]">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
