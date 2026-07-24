import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Stethoscope, User, Sparkles, BookOpen, Navigation } from 'lucide-react';
import { mockNavigatorData } from '../../data/mockNavigatorData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: { title: string; journal: string; year: number; doi: string }[];
  careRecommendation?: typeof mockNavigatorData.facilities[0];
}

export const AIDoctorView: React.FC = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const presets = [
    'I have had a high fever and severe headache since morning.',
    'I feel sudden chest tightness after running.',
    'What should I eat to lower my ApoB lipoprotein?',
    'What does my 10-year stroke risk score indicate?'
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello Dr. Alex Vance. I am your AI Doctor RAG assistant, backed by 3.4M PubMed papers and real-time Digital Twin telemetry. How can I assist your clinical inquiry today?',
      timestamp: '10:00 AM',
      citations: [
        { title: 'Multi-Omics Predictive Biomarkers in Asymptomatic Atherosclerosis', journal: 'The Lancet Digital Health', year: 2026, doi: '10.1016/S2589-7500(25)0012-4' }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (presetQuery?: string) => {
    const query = presetQuery || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!presetQuery) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = '';
      let careRec = undefined;
      let citationsList = [
        { title: 'Evidence-Based Clinical Guidelines for Acute Febrile Illness Triage', journal: 'New England Journal of Medicine', year: 2025, doi: '10.1056/NEJMra2401' }
      ];

      if (query.toLowerCase().includes('fever') || query.toLowerCase().includes('headache')) {
        aiText = 'Based on your reported high fever & headache, the Healthcare Navigator AI has evaluated your location in Tokyo, Japan. Recommended specialty: General Physician & Internal Medicine. Here is your top-matched nearby facility with English-speaking staff and direct digital twin sync:';
        careRec = mockNavigatorData.facilities[0];
      } else if (query.toLowerCase().includes('chest')) {
        aiText = 'CRITICAL ALERT: Chest tightness detected. Emergency Watchdog latency triggered. Mobile ICU & Cath Lab standby reserved:';
        careRec = mockNavigatorData.facilities[1];
      } else {
        aiText = `Based on your query "${query}" and your current biometric stream, your cellular energy balance is optimal. I recommend maintaining your current daily EPA/DHA supplement stack and Zone 2 training protocol.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: citationsList,
        careRecommendation: careRec
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Stethoscope className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Doctor RAG Clinical Workspace</h2>
            <p className="text-xs text-slate-300 font-mono">
              Conversational Medical Super-Intelligence & Healthcare Navigator Triage
            </p>
          </div>
        </div>

        <div className="text-right text-xs font-mono text-[#00FFB2]">
          <div>3.4M Ingested Clinical Papers</div>
          <div className="text-slate-400">99.4% Clinical Evidence Accuracy</div>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 py-1 scrollbar-none">
        {presets.map((pr, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(pr)}
            className="whitespace-nowrap px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-[#00E5FF]/40 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00FFB2]" />
            <span>{pr}</span>
          </button>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-3xl min-h-[460px] max-h-[580px] overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] flex-shrink-0 flex items-center justify-center text-black font-bold shadow-cyan-glow">
                <Stethoscope className="w-5 h-5 text-black" />
              </div>
            )}

            <div className={`max-w-2xl space-y-3 ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-[#00E5FF]/40 p-4 rounded-2xl text-slate-100'
                : 'bg-slate-900/90 border border-slate-800 p-5 rounded-2xl text-slate-200'
            }`}>
              
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-1.5">
                <span className="font-bold text-[#00E5FF]">
                  {msg.sender === 'user' ? 'User Patient' : 'AI Doctor RAG & Healthcare Navigator'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              <p className="text-sm leading-relaxed whitespace-pre-line">
                {msg.text}
              </p>

              {msg.careRecommendation && (
                <div className="p-4 rounded-2xl bg-purple-950/50 border border-purple-500/40 space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
                    <span className="text-[#00FFB2] font-bold flex items-center gap-1.5">
                      <Navigation className="w-4 h-4 text-[#00E5FF] animate-pulse" />
                      Smart Recommended Care Facility
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30 font-bold">
                      Trust Score: {msg.careRecommendation.trustScore}/100
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-white font-bold text-sm">{msg.careRecommendation.name}</div>
                    <div className="text-slate-400 text-[11px]">{msg.careRecommendation.address}</div>
                    <div className="text-purple-300 font-bold">Doctor: {msg.careRecommendation.recommendedDoctor?.name} ({msg.careRecommendation.recommendedDoctor?.specialty})</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <div className="text-[#00E5FF] font-bold">Why Recommended:</div>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {msg.careRecommendation.whyRecommended.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-400">{msg.careRecommendation.distanceKm} km ({msg.careRecommendation.estTravelMins}m travel)</span>
                    <button
                      onClick={() => alert(`Launching GPS navigation to ${msg.careRecommendation?.name}`)}
                      className="px-3 py-1.5 rounded-lg bg-[#00E5FF] text-black font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-cyan-glow"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Navigate</span>
                    </button>
                  </div>
                </div>
              )}

              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#00E5FF]" />
                    PubMed Peer-Reviewed Citations
                  </div>
                  {msg.citations.map((c, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono flex items-center justify-between">
                      <span className="text-slate-200 font-semibold">{c.title} ({c.year})</span>
                      <span className="text-[9px] text-[#00E5FF]">{c.journal}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {msg.sender === 'user' && (
              <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center text-slate-200 font-bold">
                <User className="w-5 h-5 text-[#00E5FF]" />
              </div>
            )}
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex gap-4 items-center text-xs font-mono text-[#00E5FF]">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-[#00E5FF]/30 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 animate-spin" />
            </div>
            <span>Analyzing 3.4M PubMed records & Healthcare Navigator GPS...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-3 glass-panel p-2 rounded-2xl border border-[#00E5FF]/30"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Doctor about symptoms, diseases, or nearby care recommendations..."
          className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!input.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00FFB2] text-black font-bold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Ask Doctor</span>
          <Send className="w-4 h-4" />
        </motion.button>
      </form>

    </div>
  );
};
