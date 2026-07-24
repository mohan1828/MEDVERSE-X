import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Navigation, Clock, CheckCircle2, Hospital, HeartPulse, QrCode } from 'lucide-react';
import { mockNavigatorData } from '../../data/mockNavigatorData';

export const EmergencyCenterView: React.FC = () => {
  const [countdown, setCountdown] = useState(180);
  const [ambulanceDistance, setAmbulanceDistance] = useState(2.4);

  const topEmergencyHospital = mockNavigatorData.facilities.find((f) => f.type === 'emergency') || mockNavigatorData.facilities[1];

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
    { title: 'Sub-second Watchdog Triggered', desc: 'ST-Elevation arrhythmia threshold monitored (Sub-millisecond watchdog)', done: true, time: '00:01' },
    { title: 'Ambulance Unit #904 Dispatched', desc: 'Advanced Life Support (ALS) Mobile ICU ready', done: true, time: '00:03' },
    { title: 'Level-1 Trauma Center Reserved', desc: `${topEmergencyHospital.name} Cath Lab prepared & ICU Bed #12 reserved`, done: true, time: '00:05' },
    { title: 'Attending Cardiologist Alerted', desc: `${topEmergencyHospital.recommendedDoctor?.name || 'Doctor'} telemetry stream verified`, done: true, time: '00:07' },
    { title: 'Family Emergency Contacts Pushed', desc: 'Primary contact Elena Vance encrypted satellite push ready', done: true, time: '00:08' },
  ];

  return (
    <div className="app-container space-y-8 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel-danger p-6 rounded-3xl animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-600 border border-rose-400 flex items-center justify-center text-white shadow-danger-glow">
            <ShieldAlert className="w-8 h-8 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-rose-500 text-white font-mono text-xs font-extrabold tracking-wider uppercase">
                EMERGENCY COMMAND CENTER #909-X
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
              Sub-Millisecond Cardiac & Stroke Watchdog Active
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-xs">
            <div className="text-rose-300">Watchdog Latency</div>
            <div className="font-bold text-white">0.4 ms Nominal</div>
          </div>
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-rose-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-rose-400 animate-pulse" />
            <h2 className="text-lg font-bold text-white font-mono">
              Smart Nearby Emergency Navigator • Top Matched Facility
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold">
            MEDVERSE-X Trust Score: {topEmergencyHospital.trustScore}/100
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <h3 className="text-xl font-bold text-white">{topEmergencyHospital.name}</h3>
            <p className="text-xs text-slate-300 font-mono">{topEmergencyHospital.address}</p>

            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs space-y-1 text-slate-200">
              <span className="font-mono text-rose-300 font-bold uppercase">Why Recommended:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-300">
                {topEmergencyHospital.whyRecommended.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2 text-center md:text-right font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-slate-400">Distance & ETA</div>
              <div className="font-bold text-white text-base">{topEmergencyHospital.distanceKm} km ({topEmergencyHospital.estTravelMins} mins)</div>
              <div className="text-emerald-400 font-bold">ICU Bed #12 Reserved</div>
            </div>

            <button
              onClick={() => alert(`Launching turn-by-turn emergency GPS navigation to ${topEmergencyHospital.name}`)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold uppercase tracking-wider shadow-danger-glow flex items-center justify-center gap-2 text-xs"
            >
              <Navigation className="w-4 h-4" />
              <span>Launch Emergency Route</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel-danger p-6 rounded-3xl text-center space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-rose-300 flex items-center justify-center gap-1.5">
            <Clock className="w-4 h-4 text-rose-400" />
            Ambulance Dispatch Countdown
          </div>
          <div className="text-5xl font-extrabold font-mono text-rose-400 tracking-tight">
            {formatTime(countdown)}
          </div>
          <div className="text-xs text-rose-200 font-mono">
            ALS Unit #904 • <strong className="text-white">{ambulanceDistance} km</strong> away
          </div>
        </div>

        <div className="glass-panel-danger p-6 rounded-3xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-rose-300 flex items-center gap-2">
            <Hospital className="w-4 h-4 text-rose-400" />
            Reserved Trauma Facility
          </div>
          <div className="font-bold text-lg text-white">
            {topEmergencyHospital.name}
          </div>
          <div className="text-xs text-rose-200 font-mono space-y-1">
            <div>Cath Lab: <strong className="text-emerald-400">CLEAR & PREPARED</strong></div>
            <div>Bed: <strong className="text-emerald-400">ICU-BED #12 RESERVED</strong></div>
          </div>
        </div>

        <div className="glass-panel-danger p-6 rounded-3xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-rose-300 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-rose-400" />
              Emergency Medical QR Code
            </div>
            <div className="text-xs text-rose-200 font-mono mt-1">
              Scan for encrypted paramedic medical history, blood type & allergies.
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-rose-500/40 text-center font-mono text-xs text-[#00FFB2]">
            QR Hash: 0x9942-MTX-EMERGENCY
          </div>
        </div>

      </div>

      <div className="glass-panel-danger p-6 rounded-3xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <Navigation className="w-5 h-5 text-rose-400" />
            Live Mobile ICU Navigation Telemetry
          </h2>
          <span className="text-xs font-mono text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/40">
            Priority GPS Traffic Clearance Active
          </span>
        </div>

        <div className="relative w-full h-[180px] bg-slate-950/90 rounded-2xl border border-rose-500/30 flex items-center justify-between px-12 overflow-hidden">
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
            animate={{ x: [0, 30, 0] }}
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
          Emergency Command Checklist
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
  );
};
