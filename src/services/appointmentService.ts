import { type DoctorAppointment } from '../types/appointment';

const mockAppointments: DoctorAppointment[] = [
  {
    id: 'apt-201',
    doctorId: 'doc-001',
    doctorName: 'Dr. Aris Thorne, MD',
    specialization: 'Interventional Cardiology',
    hospitalName: 'Mayo Clinic Precision Bio-Health Hub',
    patientId: 'usr-994812',
    patientName: 'Alexander Vance',
    date: '2026-07-26',
    timeSlot: '10:30 AM',
    type: 'Video Consultation',
    status: 'Scheduled',
    meetUrl: 'https://medverse.ai/meet/apt-201'
  },
  {
    id: 'apt-202',
    doctorId: 'doc-004',
    doctorName: 'Dr. Elena Rostova, MD',
    specialization: 'Neuro-Genomics & Electrophysiology',
    hospitalName: 'Tokyo Medical Center',
    patientId: 'usr-994812',
    patientName: 'Alexander Vance',
    date: '2026-08-02',
    timeSlot: '02:15 PM',
    type: 'In-Person',
    status: 'Scheduled'
  }
];

export const appointmentService = {
  async getAppointments(): Promise<DoctorAppointment[]> {
    return mockAppointments;
  },

  async bookAppointment(data: Omit<DoctorAppointment, 'id' | 'status'>): Promise<DoctorAppointment> {
    const newApt: DoctorAppointment = {
      ...data,
      id: `apt-${Math.floor(Math.random() * 899 + 100)}`,
      status: 'Scheduled',
      meetUrl: data.type === 'Video Consultation' ? `https://medverse.ai/meet/apt-${Date.now()}` : undefined
    };
    mockAppointments.push(newApt);
    return newApt;
  }
};
