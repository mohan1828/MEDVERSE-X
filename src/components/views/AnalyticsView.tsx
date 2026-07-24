import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, BarChart, Bar } from 'recharts';
import { BarChart3, Activity, Heart, Moon } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const heartRateData = [
    { time: '00:00', hr: 58, hrv: 74 },
    { time: '04:00', hr: 54, hrv: 82 },
    { time: '08:00', hr: 68, hrv: 64 },
    { time: '12:00', hr: 82, hrv: 55 },
    { time: '16:00', hr: 124, hrv: 42 },
    { time: '20:00', hr: 66, hrv: 68 },
    { time: '23:59', hr: 60, hrv: 76 },
  ];

  const bloodPressureData = [
    { day: 'Mon', systolic: 112, diastolic: 72 },
    { day: 'Tue', systolic: 114, diastolic: 74 },
    { day: 'Wed', systolic: 116, diastolic: 75 },
    { day: 'Thu', systolic: 112, diastolic: 71 },
    { day: 'Fri', systolic: 115, diastolic: 73 },
    { day: 'Sat', systolic: 110, diastolic: 70 },
    { day: 'Sun', systolic: 114, diastolic: 74 },
  ];

  const sleepData = [
    { day: 'Mon', deep: 1.8, rem: 2.1, light: 4.2 },
    { day: 'Tue', deep: 2.0, rem: 2.3, light: 4.0 },
    { day: 'Wed', deep: 1.6, rem: 1.9, light: 4.5 },
    { day: 'Thu', deep: 2.2, rem: 2.4, light: 3.8 },
    { day: 'Fri', deep: 2.1, rem: 2.2, light: 4.1 },
    { day: 'Sat', deep: 2.4, rem: 2.6, light: 3.5 },
    { day: 'Sun', deep: 2.0, rem: 2.3, light: 4.0 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <BarChart3 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Biometric Telemetry Analytics</h1>
            <p className="text-xs text-slate-300 font-mono">
              Continuous Sensor Integration • Recharts Visualization
            </p>
          </div>
        </div>

        <div className="text-right text-xs font-mono text-[#00FFB2]">
          <div>Sampling Frequency: 250 Hz</div>
          <div className="text-slate-400">Zero Artifact Signal Quality</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Heart Rate (BPM) & HRV (RMSSD) 24h
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">Avg HR: 64 bpm</span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={heartRateData}>
                <defs>
                  <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#00E5FF', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="hr" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#hrGrad)" name="Heart Rate (bpm)" />
                <Line type="monotone" dataKey="hrv" stroke="#00FFB2" strokeWidth={2} name="HRV (ms)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00FFB2]" />
              Blood Pressure (Systolic / Diastolic)
            </h3>
            <span className="text-xs font-mono text-[#00FFB2] font-bold">114 / 74 mmHg</span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodPressureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[50, 140]} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#00FFB2', borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="systolic" stroke="#00FFB2" strokeWidth={2.5} name="Systolic (mmHg)" />
                <Line type="monotone" dataKey="diastolic" stroke="#7C3AED" strokeWidth={2.5} name="Diastolic (mmHg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-400" />
              Sleep Architecture (Deep, REM & Light Hours)
            </h3>
            <span className="text-xs font-mono text-purple-300 font-bold">Sleep Quality: 94%</span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#7C3AED', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="deep" stackId="a" fill="#7C3AED" name="Deep Sleep (hrs)" />
                <Bar dataKey="rem" stackId="a" fill="#00E5FF" name="REM Sleep (hrs)" />
                <Bar dataKey="light" stackId="a" fill="#1e293b" name="Light Sleep (hrs)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
