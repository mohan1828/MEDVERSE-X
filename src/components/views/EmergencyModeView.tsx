import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Navigation, Clock, CheckCircle2, Hospital, UserCheck, HeartPulse, X } from 'lucide-react';

interface EmergencyModeViewProps {
  onDeactivate: () => void;
}

export const EmergencyModeView: React.FC<EmergencyModeViewProps> = ({ onDeactivate }) => {
  const [countdown, setCountdown] = useState(180);
  const [ambulanceDistance, setAmbulanceDistance] = useState(2.4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      setAmbulanceDistance((prev) => +(Math.max(0.1, prev - 0.02)).toFixed(2));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const steps = [
    { title: 'Sub-second Watchdog Triggered', desc: 'ST-Elevation arrhythmia threshold exceeded (>90% Critical Alert)', done: true, time: '00:01' },
    { title: 'Ambulance Unit #904 Dispatched', desc: 'Advanced Life Support (ALS) Mobile ICU en route', done: true, time: '00:03' },
    { title: 'Level-1 Trauma Center Reserved', desc: 'Mayo Bio-Medical ICU Bed #12 and Cardiac Cath Lab prepared', done: true, time: '00:05' },
    { title: 'Attending Cardiologist Alerted', desc: 'Dr. Sarah Lin (Chief of Cardiology) received telemetry & ECG', done: true, time: '00:07' },
    { title: 'Family Emergency Contacts Pushed', desc: 'Primary contact Elena Vance notified via encrypted satellite push', done: true, time: '00:08' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#1A050A] text-white overflow-y-auto p-4 lg:p-8 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      
      <div className="max-w-7xl mx-auto w-full space-y-6">
        
        <div className="flex items-center justify-between glass-panel-danger p-6 rounded-3xl animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-600 border border-rose-400 flex items-center justify-center text-white shadow-danger-glow">
              <ShieldAlert className="w-8 h-8 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-rose-500 text-white font-mono text-xs font-extrabold tracking-wider uppercase">
                  CRITICAL EMERGENCY PROTOCOL #909-X
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
                ACUTE CARDIAC ST-ELEVATION DETECTED
              </h1>
            </div>
          </div>

          <button
            onClick={onDeactivate}
            className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-rose-500/40 text-xs font-mono text-rose-300 hover:text-white flex items-center gap-2 transition-all shadow-lg"
          >
            <X className="w-4 h-4" />
            <span>Stand Down Override</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel-danger p-6 rounded-3xl text-center space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-rose-300 flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-rose-400" />
              Ambulance ETA Countdown
            </div>
            <div className="text-5xl lg:text-6xl font-extrabold font-mono text-rose-400 tracking-tight">
              {formatTime(countdown)}
            </div>
            <div className="text-xs text-rose-200 font-mono">
              Distance: <strong className="text-white">{ambulanceDistance} km</strong> away
            </div>
          </div>

          <div className="glass-panel-danger p-6 rounded-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-rose-300 flex items-center gap-2">
              <Hospital className="w-4 h-4 text-rose-400" />
              Reserved Trauma Facility
            </div>
            <div className="font-bold text-lg text-white">
              St. Jude Regional Level-1 Cardiac Center
            </div>
            <div className="text-xs text-rose-200 font-mono space-y-1">
              <div>Cath Lab: <strong className="text-emerald-400">CLEAR & PREPARED</strong></div>
              <div>Bed: <strong className="text-emerald-400">ICU-BED #12 RESERVED</strong></div>
            </div>
          </div>

          <div className="glass-panel-danger p-6 rounded-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-rose-300 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-rose-400" />
              Attending Response Team
            </div>
            <div className="font-bold text-lg text-white">
              Dr. Sarah Lin (Chief Cardiologist)
            </div>
            <div className="text-xs text-rose-200 font-mono space-y-1">
              <div>Telemetry Stream: <strong className="text-emerald-400">RECEIVING ECG</strong></div>
              <div>Family Alert: <strong className="text-emerald-400">PUSH SENT (11:42 AM)</strong></div>
            </div>
          </div>

        </div>

        <div className="glass-panel-danger p-6 rounded-3xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
              <Navigation className="w-5 h-5 text-rose-400" />
              Live Ambulance Route Navigation Telemetry
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/40">
              GPS Priority Traffic Clearance Active
            </span>
          </div>

          <div className="relative w-full h-[200px] bg-slate-950/90 rounded-2xl border border-rose-500/30 flex items-center justify-between px-12 overflow-hidden">
            
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-12 h-12 rounded-full bg-rose-600 border-2 border-white flex items-center justify-center shadow-danger-glow animate-bounce">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-mono font-bold text-rose-300">Your Location</span>
            </div>

            <div className="flex-1 h-2 mx-4 bg-slate-900 rounded-full relative overflow-hidden">
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-rose-500 to-transparent"
              />
            </div>

            <motion.div
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1 z-10"
            >
              <div className="text-3xl select-none animate-pulse">🚑</div>
              <span className="text-[10px] font-mono text-emerald-400">Unit #904</span>
            </motion.div>

            <div className="flex-1 h-2 mx-4 bg-slate-900 rounded-full relative overflow-hidden">
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 0.9 }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
              />
            </div>

            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-12 h-12 rounded-full bg-[#00E5FF] border-2 border-white flex items-center justify-center shadow-cyan-glow">
                <Hospital className="w-6 h-6 text-black" />
              </div>
              <span className="text-xs font-mono font-bold text-[#00E5FF]">Trauma Center</span>
            </div>

          </div>
        </div>

        <div className="glass-panel-danger p-6 rounded-3xl space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-rose-300">
            Emergency Dispatch Task Checklist
          </h3>
          <div className="space-y-2">
            {steps.map((st, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-rose-500/20 text-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-white">{st.title}</span>
                    <p className="text-slate-300 text-[11px]">{st.desc}</p>
                  </div>
                </div>
                <span className="font-mono text-rose-300">{st.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
