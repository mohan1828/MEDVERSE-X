export interface DoctorAppointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  hospitalName: string;
  patientId: string;
  patientName: string;
  date: string;
  timeSlot: string;
  type: 'In-Person' | 'Video Consultation' | 'Emergency Tele-Health';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  meetUrl?: string;
}
