import React, { useState } from 'react';
import { HeartPulse, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OnboardingWizard: React.FC = () => {
  const { selectedRole, completeOnboarding } = useAuth();
  const [step] = useState<number>(1);
  const [isInitializingTwin, setIsInitializingTwin] = useState(false);
  const [twinProgress, setTwinProgress] = useState(0);

  // Patient Fields
  const [age, setAge] = useState<number>(38);
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('O-Positive');
  const [heightCm, setHeightCm] = useState<number>(182);
  const [weightKg] = useState<number>(78);
  const [allergies, setAllergies] = useState('Penicillin, Peanuts');
  const [medications, setMedications] = useState('EPA/DHA 2000mg, CoQ10 200mg');
  const [emergencyContact, setEmergencyContact] = useState('Elena Vance (+1 555-019-2831)');
  const [wearable, setWearable] = useState('Apple Watch Ultra 3 & Oura Ring Gen4');

  // Doctor Fields
  const [licenseNo, setLicenseNo] = useState('MC-NY-901842');
  const [specialization, setSpecialization] = useState('Interventional Cardiology & Electrophysiology');
  const [hospital, setHospital] = useState('Mayo Clinic / Mount Sinai Hospital');

  // Hospital Admin Fields
  const [hospitalName, setHospitalName] = useState('Mayo Clinic Precision Bio-Health Hub');
  const [hospitalLicense, setHospitalLicense] = useState('HL-MN-88402');
  const [emergencyCapacity, setEmergencyCapacity] = useState<number>(45);

  const handlePatientSubmit = () => {
    setIsInitializingTwin(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      setTwinProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          completeOnboarding({
            age,
            gender,
            bloodGroup,
            heightCm,
            weightKg,
            allergies: allergies.split(',').map(s => s.trim()),
            medications: medications.split(',').map(s => s.trim()),
            emergencyContact,
            insuranceProvider: 'BlueCross Apex Health #MV-90182',
            wearableSynced: wearable
          });
        }, 600);
      }
    }, 300);
  };

  const handleProfessionalSubmit = () => {
    if (selectedRole === 'doctor') {
      completeOnboarding({
        licenseNo,
        qualification: 'MD, FACC Cardiology',
        specialization,
        hospital,
        experienceYrs: 14,
        consultationFee: 250,
        isVerified: true
      });
    } else {
      completeOnboarding({
        hospitalName,
        licenseNo: hospitalLicense,
        address: '200 First St SW, Rochester, MN',
        departmentCount: 18,
        doctorCount: 140,
        emergencyCapacity,
        isVerified: true
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl glass-panel p-6 sm:p-10 rounded-3xl border border-[#00E5FF]/30 space-y-6 shadow-2xl">
        
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#00FFB2]/40 flex items-center justify-center text-[#00FFB2] shadow-cyan-glow">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold">Step {step} of 2</span>
              <h2 className="text-xl font-extrabold text-white">
                {selectedRole === 'patient' ? 'Digital Twin Telemetry Setup' : 'Clinical & Institutional Verification'}
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-900 text-[#00FFB2] border border-[#00FFB2]/30 text-xs font-mono font-bold uppercase">
            {selectedRole.replace('_', ' ')}
          </span>
        </div>

        {isInitializingTwin ? (
          <div className="py-12 space-y-6 text-center font-mono">
            <div className="w-20 h-20 rounded-full bg-slate-900 border border-[#00E5FF] flex items-center justify-center mx-auto shadow-cyan-glow animate-pulse">
              <HeartPulse className="w-10 h-10 text-[#00FFB2]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">Initializing 3D Digital Twin</h3>
              <p className="text-xs text-slate-300">
                Calibrating cardiovascular, metabolic, and cellular telemetry vectors...
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Bio-Twin Mapping</span>
                <span className="text-[#00FFB2] font-bold">{twinProgress}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] rounded-full transition-all duration-300"
                  style={{ width: `${twinProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : selectedRole === 'patient' ? (
          <div className="space-y-6 font-mono text-xs">
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-slate-400 block mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 38)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Biological Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                >
                  <option value="O-Positive">O-Positive</option>
                  <option value="A-Positive">A-Positive</option>
                  <option value="B-Positive">B-Positive</option>
                  <option value="AB-Positive">AB-Positive</option>
                  <option value="O-Negative">O-Negative</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(parseInt(e.target.value) || 182)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 block mb-1">Known Allergies</label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="Penicillin, Peanuts"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Active Supplement / Drug Stack</label>
                <input
                  type="text"
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                  placeholder="EPA/DHA, CoQ10"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 block mb-1">Primary Emergency Contact</label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Connected Wearable Sensor</label>
                <input
                  type="text"
                  value={wearable}
                  onChange={(e) => setWearable(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <button
              onClick={handlePatientSubmit}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2"
            >
              Initialize Bio-Twin & Launch Platform <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Doctor / Hospital Admin Onboarding */
          <div className="space-y-6 font-mono text-xs">
            {selectedRole === 'doctor' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1">Medical Council License #</label>
                    <input
                      type="text"
                      value={licenseNo}
                      onChange={(e) => setLicenseNo(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Specialization</label>
                    <input
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Affiliated Hospital / Medical Center</label>
                  <input
                    type="text"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-slate-400 block mb-1">Institutional Hospital Name</label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1">Hospital License #</label>
                    <input
                      type="text"
                      value={hospitalLicense}
                      onChange={(e) => setHospitalLicense(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Emergency ICU Capacity</label>
                    <input
                      type="number"
                      value={emergencyCapacity}
                      onChange={(e) => setEmergencyCapacity(parseInt(e.target.value) || 45)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-[#00E5FF]"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              onClick={handleProfessionalSubmit}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2"
            >
              Verify License & Launch Workspace <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
