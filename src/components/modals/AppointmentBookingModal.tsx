import React, { useState } from 'react';
import { Calendar, X, Video, User, CheckCircle2 } from 'lucide-react';
import { appointmentService } from '../../services/appointmentService';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({ isOpen, onClose }) => {
  const [doctor, setDoctor] = useState('Dr. Aris Thorne, MD (Cardiology)');
  const [date, setDate] = useState('2026-07-28');
  const [slot, setSlot] = useState('10:30 AM');
  const [type, setType] = useState<'Video Consultation' | 'In-Person'>('Video Consultation');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await appointmentService.bookAppointment({
      doctorId: 'doc-001',
      doctorName: doctor,
      specialization: 'Cardiology & Longevity',
      hospitalName: 'Mayo Clinic Bio-Health Hub',
      patientId: 'usr-994812',
      patientName: 'Alexander Vance',
      date,
      timeSlot: slot,
      type
    });
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg glass-panel rounded-3xl border border-[#00E5FF]/40 shadow-2xl p-6 space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00E5FF]" />
            <h2 className="text-lg font-bold text-white font-mono">Schedule Specialist Appointment</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-[#00FFB2] mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white font-mono">Appointment Scheduled Successfully!</h3>
            <p className="text-xs text-slate-300 font-mono">
              Confirmation link and encrypted Tele-Health meet link dispatched to your profile.
            </p>
            <button
              onClick={() => { setIsSuccess(false); onClose(); }}
              className="w-full py-3 rounded-xl bg-[#00E5FF] text-black font-bold text-xs font-mono uppercase tracking-wider shadow-cyan-glow"
            >
              Close & View Appointments →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Select Specialist Doctor</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                >
                  <option value="Dr. Aris Thorne, MD (Cardiology)">Dr. Aris Thorne, MD (Interventional Cardiology)</option>
                  <option value="Dr. Elena Rostova, MD (Neuro-Genomics)">Dr. Elena Rostova, MD (Neuro-Genomics)</option>
                  <option value="Dr. Kenji Sato, MD (Trauma ICU)">Dr. Kenji Sato, MD (Emergency Medicine)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Consultation Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Time Slot</label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white outline-none focus:border-[#00E5FF]"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="02:15 PM">02:15 PM</option>
                  <option value="04:45 PM">04:45 PM</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Consultation Type</label>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setType('Video Consultation')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 ${
                    type === 'Video Consultation' ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF] font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Video className="w-4 h-4" /> Tele-Health Video
                </button>
                <button
                  type="button"
                  onClick={() => setType('In-Person')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 ${
                    type === 'In-Person' ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF] font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <User className="w-4 h-4" /> In-Person Clinic
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow"
            >
              Confirm Appointment Booking
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
