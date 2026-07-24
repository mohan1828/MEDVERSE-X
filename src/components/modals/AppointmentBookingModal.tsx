import React, { useState } from 'react';
import { X, Calendar, Clock, Video, UserCheck, CheckCircle2, Hospital } from 'lucide-react';
import { bookDoctorAppointment, type Doctor } from '../../services/hospitalService';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultType, setConsultType] = useState<'In-Person' | 'Video Call'>('Video Call');
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  if (!isOpen || !doctor) return null;

  const handleBooking = async () => {
    if (!selectedSlot) return;
    setIsSubmitting(true);

    const res = await bookDoctorAppointment({
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      hospital_name: doctor.hospital,
      patient_name: 'Alexander Vance',
      appointment_date: new Date().toLocaleDateString(),
      appointment_time: selectedSlot,
      consultation_type: consultType,
      symptoms_note: note,
    });

    setIsSubmitting(false);
    setBookingSuccess(res.message);
  };

  const resetAndClose = () => {
    setBookingSuccess(null);
    setSelectedSlot('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 shadow-cyan-glow space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white font-mono">Book Doctor Appointment</h3>
              <p className="text-xs text-slate-400">Direct Consultation Dispatch</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookingSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Appointment Confirmed!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">{bookingSuccess}</p>
            <button
              onClick={resetAndClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#00E5FF] text-black font-mono text-xs font-bold hover:bg-[#00E5FF]/90 transition-all shadow-cyan-glow"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Doctor Info Card */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">{doctor.name}</span>
                <span className="text-xs font-mono font-bold text-emerald-400">${doctor.consultation_fee} / Session</span>
              </div>
              <p className="text-xs text-slate-400">{doctor.specialty}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Hospital className="w-3.5 h-3.5 text-purple-400" />
                <span>{doctor.hospital}</span>
              </div>
            </div>

            {/* Consultation Mode */}
            <div>
              <label className="text-xs font-mono text-slate-400 font-bold uppercase block mb-2">Consultation Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultType('Video Call')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    consultType === 'Video Call' ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>HD Tele-Video Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultType('In-Person')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    consultType === 'In-Person' ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Hospital In-Person</span>
                </button>
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <label className="text-xs font-mono text-slate-400 font-bold uppercase block mb-2">Select Available Slot</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {doctor.available_slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                      selectedSlot === slot ? 'bg-purple-600 border-purple-400 text-white shadow-purple-glow' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Clock className="w-3 h-3 inline-block mr-1" />
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms Note */}
            <div>
              <label className="text-xs font-mono text-slate-400 font-bold uppercase block mb-1">Chief Complaint / Symptoms (Optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Describe key health goals or symptoms..."
                rows={2}
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-[#00E5FF]"
              />
            </div>

            <button
              onClick={handleBooking}
              disabled={!selectedSlot || isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-purple-600 hover:opacity-90 disabled:opacity-50 text-white font-mono text-xs font-bold transition-all shadow-cyan-glow"
            >
              {isSubmitting ? 'Processing Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
