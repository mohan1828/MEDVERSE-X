import React, { useState } from 'react';
import { Upload, Mic, Video, FileText, CheckCircle2 } from 'lucide-react';

export const VoiceMediaIntakeView: React.FC = () => {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-purple-glow">
            <Mic className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Voice & Media Knowledge Intake</h2>
            <p className="text-xs text-slate-300 font-mono">
              Upload Voice Clips, Video Interviews, Letters, or Documents for AI Knowledge Extraction
            </p>
          </div>
        </div>
      </div>

      <div 
        onClick={() => setIsUploaded(true)}
        className="glass-panel-glow p-10 rounded-3xl border-2 border-dashed border-purple-500/40 hover:border-purple-400 cursor-pointer transition-all text-center space-y-4 flex flex-col items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full bg-purple-950/60 border border-purple-500 flex items-center justify-center text-[#00FFB2] shadow-purple-glow">
          <Upload className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">Drop Voice Notes, Videos, or Letters Here</h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Supports MP3, WAV, MP4, PDF, DOCX, PNG (Max 500 MB per file)
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-[#00E5FF] flex items-center gap-1">
            <Mic className="w-3.5 h-3.5" /> Voice Extraction
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-[#00FFB2] flex items-center gap-1">
            <Video className="w-3.5 h-3.5" /> Video Telemetry
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-purple-300 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> OCR Letters
          </span>
        </div>
      </div>

      {isUploaded && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 text-xs">
          <div className="font-bold text-[#00FFB2] font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Voice Note Uploaded & Ingestion Complete
          </div>
          <p className="text-slate-300 font-mono">
            AI extracted 3 new Cognitive DNA traits (Communication Style) and generated 1 Life Timeline event.
          </p>
        </div>
      )}

    </div>
  );
};
