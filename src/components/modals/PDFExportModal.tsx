import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle, ShieldCheck, Heart, Activity, Brain } from 'lucide-react';
import { exportClinicalPDFReport } from '../../utils/pdfExport';

interface PDFExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
}

export const PDFExportModal: React.FC<PDFExportModalProps> = ({
  isOpen,
  onClose,
  patientName = 'Alexander Vance',
}) => {
  const [includeVitals, setIncludeVitals] = useState(true);
  const [includePredictions, setIncludePredictions] = useState(true);
  const [includeEternaMind, setIncludeEternaMind] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      exportClinicalPDFReport(patientName);
      setIsGenerating(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-purple-glow space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white font-mono">Clinical Report Export</h3>
              <p className="text-xs text-slate-400">Generate Official Tele-Health PDF</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Toggles */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
            Select Report Sections
          </div>

          <label
            onClick={() => setIncludeVitals(!includeVitals)}
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
              includeVitals ? 'bg-purple-950/30 border-purple-500/40 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold">Vitals Telemetry & Biometrics</span>
            </div>
            <CheckCircle className={`w-5 h-5 ${includeVitals ? 'text-purple-400' : 'text-slate-600'}`} />
          </label>

          <label
            onClick={() => setIncludePredictions(!includePredictions)}
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
              includePredictions ? 'bg-purple-950/30 border-purple-500/40 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-semibold">AI Risk Predictions & SHAP Features</span>
            </div>
            <CheckCircle className={`w-5 h-5 ${includePredictions ? 'text-purple-400' : 'text-slate-600'}`} />
          </label>

          <label
            onClick={() => setIncludeEternaMind(!includeEternaMind)}
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
              includeEternaMind ? 'bg-purple-950/30 border-purple-500/40 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold">EternaMind X Cognitive DNA Summary</span>
            </div>
            <CheckCircle className={`w-5 h-5 ${includeEternaMind ? 'text-purple-400' : 'text-slate-600'}`} />
          </label>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Includes Certified Digital Signature & HIPAA Seal</span>
        </div>

        {/* Action button */}
        <button
          onClick={handleExport}
          disabled={isGenerating}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-[#00E5FF] hover:opacity-90 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-purple-glow"
        >
          <Download className="w-4 h-4" />
          <span>{isGenerating ? 'Compiling PDF...' : 'Download Clinical PDF'}</span>
        </button>

      </div>
    </div>
  );
};
