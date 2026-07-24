import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, PhoneCall, Calendar, Share2, CheckCircle2, Sparkles, Globe, Award } from 'lucide-react';
import { mockNavigatorData, type SymptomTriageItem } from '../../data/mockNavigatorData';
import { HealthcareMapCanvas } from '../3D/HealthcareMapCanvas';

export const HealthcareNavigatorView: React.FC = () => {
  const [selectedTriageId, setSelectedTriageId] = useState<string>('fever');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('f-1');
  const [isTravelMode, setIsTravelMode] = useState<boolean>(mockNavigatorData.isTravelModeActive);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const activeTriage = mockNavigatorData.symptomTriage.find((t) => t.id === selectedTriageId) || mockNavigatorData.symptomTriage[0];
  const activeFacility = mockNavigatorData.facilities.find((f) => f.id === selectedFacilityId) || mockNavigatorData.facilities[0];

  const handleTriageSelect = (item: SymptomTriageItem) => {
    setSelectedTriageId(item.id);
    setSelectedFacilityId(item.matchedFacilityId);
  };

  const triggerAction = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-[#00E5FF]/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Navigation className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#00FFB2] uppercase font-bold tracking-wider">
                Smart Healthcare Navigator
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-mono text-[10px]">
                Right Care. Right Place. Right Time.
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-0.5">
              Autonomous Nearby Care & Specialist Finder
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTravelMode(!isTravelMode)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              isTravelMode
                ? 'bg-purple-950/80 border-purple-500/50 text-purple-300 shadow-purple-glow'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            <Globe className="w-4 h-4 text-[#00E5FF]" />
            <span>Travel Assistance Mode: {isTravelMode ? 'ACTIVE' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {isTravelMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 flex items-start justify-between gap-4 text-xs"
        >
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-purple-300 uppercase font-mono tracking-wider">
                Travel Assistance Mode Active ({mockNavigatorData.travelModeCity})
              </span>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                {mockNavigatorData.travelNoticeText}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTravelMode(false)}
            className="text-[10px] font-mono text-purple-300 hover:text-white underline flex-shrink-0"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-xs font-mono text-[#00FFB2] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#00FFB2]" />
          Instant AI Symptom Triage (Select Any Symptom)
        </h3>

        <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
          {mockNavigatorData.symptomTriage.map((item) => {
            const isSelected = selectedTriageId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTriageSelect(item)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-[#00E5FF] text-white border-purple-400 shadow-purple-glow'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00FFB2]" />
              Interactive Nearby Healthcare Map
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Showing 4 Facilities in Tokyo
            </span>
          </div>

          <HealthcareMapCanvas
            facilities={mockNavigatorData.facilities}
            selectedFacilityId={selectedFacilityId}
            onSelectFacility={setSelectedFacilityId}
          />

          <div className="space-y-2">
            {mockNavigatorData.facilities.map((fac) => {
              const isSelected = fac.id === selectedFacilityId;
              return (
                <div
                  key={fac.id}
                  onClick={() => setSelectedFacilityId(fac.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-400 shadow-purple-glow'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-white text-sm">{fac.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {fac.distanceKm} km away • {fac.estTravelMins} mins travel • {fac.languages.join(', ')}
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="font-bold text-[#00FFB2]">{fac.trustScore}/100</div>
                    <div className="text-[10px] text-slate-500">{fac.rating}★ Rating</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6 glass-panel-glow p-6 rounded-3xl space-y-6 flex flex-col justify-between">
          
          <div className="space-y-5">
            
            <div className="border-b border-slate-800 pb-4 flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#00E5FF] font-bold">
                  Matched Specialty: {activeTriage.recommendedSpecialty}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">{activeFacility.name}</h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{activeFacility.address}</p>
              </div>

              <div className="text-center p-3 rounded-2xl bg-purple-950/80 border border-purple-500/40 shadow-purple-glow">
                <div className="text-2xl font-extrabold font-mono text-[#00FFB2]">
                  {activeFacility.trustScore}
                </div>
                <div className="text-[9px] font-mono text-purple-300 uppercase">Trust Score</div>
              </div>
            </div>

            {activeFacility.recommendedDoctor && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono uppercase text-purple-300 font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#00FFB2]" />
                  Recommended Specialist Doctor
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activeFacility.recommendedDoctor.avatar}</span>
                    <div>
                      <div className="font-bold text-white text-sm">{activeFacility.recommendedDoctor.name}</div>
                      <div className="text-slate-400 text-[11px]">{activeFacility.recommendedDoctor.specialty}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-amber-400 font-bold">{activeFacility.recommendedDoctor.rating} ★</div>
                    <div className="text-[10px] text-slate-500">{activeFacility.recommendedDoctor.experienceYears} Yrs Exp</div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#00FFB2] pt-1 border-t border-slate-800/80">
                  Earliest Appointment Slot: <strong>{activeFacility.recommendedDoctor.availableSlot}</strong>
                </div>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
              <div className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00FFB2]" />
                Why This Healthcare Option Was Chosen
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {activeFacility.whyRecommended.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00FFB2]">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Distance & Travel</div>
                <div className="font-bold text-white text-sm">{activeFacility.distanceKm} km ({activeFacility.estTravelMins}m)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Est. Waiting Time</div>
                <div className="font-bold text-[#00FFB2] text-sm">{activeFacility.estWaitMins} mins</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Languages</div>
                <div className="font-bold text-purple-300 text-xs">{activeFacility.languages.slice(0, 2).join(', ')}</div>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">One-Tap Direct Actions</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => triggerAction(`GPS Navigation launched to ${activeFacility.name}`)}
                className="py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] text-black font-bold text-xs font-mono flex items-center justify-center gap-1.5 shadow-cyan-glow"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate</span>
              </button>

              <button
                onClick={() => triggerAction(`Appointment requested with ${activeFacility.recommendedDoctor?.name || activeFacility.name}`)}
                className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>Book Slot</span>
              </button>

              <button
                onClick={() => triggerAction(`Calling ${activeFacility.name} at ${activeFacility.phone}`)}
                className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs font-mono flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Call Clinic</span>
              </button>

              <button
                onClick={() => triggerAction('Digital Twin & Medical History shared with care team')}
                className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs font-mono flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-[#00FFB2]" />
                <span>Share Twin</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
