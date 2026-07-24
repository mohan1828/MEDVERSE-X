import React, { useState } from 'react';
import { X, QrCode, ShieldAlert, Phone, Copy, Check, Printer, User, Heart, AlertTriangle } from 'lucide-react';
import { generateEmergencyQRDataURL } from '../../utils/qrGenerator';

interface MedicalQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: string;
  patientName?: string;
}

export const MedicalQRModal: React.FC<MedicalQRModalProps> = ({
  isOpen,
  onClose,
  patientId = 'MV-994812',
  patientName = 'Alexander Vance',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const qrSrc = generateEmergencyQRDataURL(patientId);

  const handleCopy = () => {
    navigator.clipboard.writeText(`MEDVERSE-EMERGENCY: ID=${patientId}, Name=${patientName}, Blood=O+, Allergies=Penicillin`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 shadow-cyan-glow space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white font-mono">Emergency Medical QR Profile</h3>
              <p className="text-xs text-slate-400">Instant First-Responder Tele-Access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: QR & Details */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="p-3 bg-[#0B1220] rounded-2xl border border-slate-700/60 shadow-xl flex flex-col items-center">
            <img src={qrSrc} alt="Emergency Medical QR Code" className="w-40 h-40 object-contain rounded-xl" />
            <div className="mt-2 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Scan for Tele-ICU
            </div>
          </div>

          <div className="space-y-3 flex-1 text-sm">
            <div className="flex items-center gap-2 text-slate-200">
              <User className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-xs text-slate-400">Patient:</span>
              <span className="font-bold text-white">{patientName}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-200">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="font-mono text-xs text-slate-400">Blood Group:</span>
              <span className="font-bold text-[#00FFB2]">O Positive (O+)</span>
            </div>

            <div className="flex items-center gap-2 text-slate-200">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs text-slate-400">Allergies:</span>
              <span className="font-semibold text-amber-300">Penicillin, Sulfa</span>
            </div>

            <div className="flex items-center gap-2 text-slate-200">
              <Phone className="w-4 h-4 text-[#00E5FF]" />
              <span className="font-mono text-xs text-slate-400">Primary SOS:</span>
              <span className="font-mono text-xs text-white">+1 (555) 019-2834</span>
            </div>

            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
              <span>HIPAA Encrypted Cryptographic QR Ledger</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Copied Payload' : 'Copy Emergency Data'}</span>
          </button>
          
          <button
            onClick={() => window.print()}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-purple-600 hover:opacity-90 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-cyan-glow"
          >
            <Printer className="w-4 h-4" />
            <span>Print QR Card</span>
          </button>
        </div>

      </div>
    </div>
  );
};
