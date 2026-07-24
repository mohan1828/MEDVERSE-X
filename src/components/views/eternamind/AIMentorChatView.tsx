import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

interface MentorMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: { title: string; date: string; source: string }[];
  wisdomTakeaways?: string[];
}

export const AIMentorChatView: React.FC = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const presets = [
    'How did my father approach difficult high-stress decisions?',
    'What leadership lessons did my grandmother document about team trust?',
    'What key business lessons did my family document during economic crises?',
    'Summarize my family’s core values on intellectual integrity'
  ];

  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Welcome to the EternaMind X AI Mentor Portal. I answer questions strictly using information voluntarily contributed and preserved by Dr. Alex Vance and family members. I do not speculate or extrapolate beyond documented records. How can I assist your learning today?',
      timestamp: '11:42 AM',
      citations: [
        { title: 'Preserved Life Events Corpus (342 Verified Records)', date: '2026', source: 'EternaMind X Vault' }
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

    const userMsg: MentorMessage = {
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
      let takeaways: string[] = [];
      let citationsList = [
        { title: 'Navigating High-Stress System Crisis (Life Event #e2)', date: 'Nov 2, 2021', source: 'Audio Note #42' },
        { title: 'Founding of First Bio-Tech AI Lab (Life Event #e1)', date: 'Mar 14, 2018', source: 'Journal Entry #14' }
      ];

      if (query.toLowerCase().includes('difficult') || query.toLowerCase().includes('decision')) {
        aiText = 'Based strictly on preserved records, your father Dr. Alex Vance used a First-Principles Deconstruction framework. When faced with high-stress crises, he separated emotional panic from core physical constraints, focusing first on stabilizing core safety channels before taking action.';
        takeaways = [
          'In acute crises, prioritize stabilizing core safety channels first.',
          'Separating emotional noise from core data constraints prevents reactive errors.',
          'Blameless post-mortem reviews foster long-term psychological safety.'
        ];
      } else if (query.toLowerCase().includes('business') || query.toLowerCase().includes('crises')) {
        aiText = 'Preserved family records from Grandfather David Vance (1987 Market Crash) and Dr. Alex Vance (2018 Lab Launch) emphasize maintaining zero-panic liquidity reserves, prioritizing employee payroll, and staying true to long-term impact over short-term market hype.';
        takeaways = [
          'Building long-term impact requires prioritizing technical truth over hype.',
          'Cash reserves and transparent communication prevent market panic from causing operational failure.'
        ];
      } else {
        aiText = `Preserved wisdom records for "${query}": The Vance family cognitive blueprint emphasizes intellectual integrity, continuous socratic learning, and constructing systems that outlast individual tenure.`;
        takeaways = [
          'Always credit team members for breakthrough ideas.',
          'Legacy is not what you hoard, but what you cultivate in those who follow.'
        ];
      }

      const aiMsg: MentorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        wisdomTakeaways: takeaways,
        citations: citationsList
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-purple-glow">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Cognitive Mentor Mode</h2>
            <p className="text-xs text-slate-300 font-mono">
              Ask Preserved Generational Wisdom • Answers Strictly Grounded in Contributed Records
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00FFB2] px-3 py-1.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Grounded • Zero Speculation</span>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 py-1 scrollbar-none">
        {presets.map((pr, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(pr)}
            className="whitespace-nowrap px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
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
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#00E5FF] flex-shrink-0 flex items-center justify-center text-black font-bold shadow-purple-glow">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}

            <div className={`max-w-2xl space-y-3 ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/40 p-4 rounded-2xl text-slate-100'
                : 'bg-slate-900/90 border border-slate-800 p-5 rounded-2xl text-slate-200'
            }`}>
              
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-1.5">
                <span className="font-bold text-purple-300">
                  {msg.sender === 'user' ? 'Family Inheritor / Learner' : 'EternaMind X Preserved Wisdom Engine'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              <p className="text-sm leading-relaxed whitespace-pre-line">
                {msg.text}
              </p>

              {msg.wisdomTakeaways && msg.wisdomTakeaways.length > 0 && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1.5 text-xs">
                  <div className="font-mono text-purple-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#00FFB2]" />
                    Documented Wisdom Takeaways
                  </div>
                  <ul className="space-y-1 text-slate-300 pl-4 list-disc">
                    {msg.wisdomTakeaways.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#00E5FF]" />
                    Preserved Record Source Citations
                  </div>
                  {msg.citations.map((c, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-950/80 border border-purple-500/20 text-[11px] font-mono flex items-center justify-between">
                      <span className="text-slate-200 font-semibold">{c.title} ({c.date})</span>
                      <span className="text-[9px] text-purple-300">{c.source}</span>
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
          <div className="flex gap-4 items-center text-xs font-mono text-purple-300">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <span>Searching preserved user memories & decision logs...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-3 glass-panel p-2 rounded-2xl border border-purple-500/30"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask any question about preserved decisions, values, or advice..."
          className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!input.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-[#00E5FF] text-white font-bold text-xs uppercase tracking-wider shadow-purple-glow flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Ask Mentor</span>
          <Send className="w-4 h-4" />
        </motion.button>
      </form>

    </div>
  );
};
