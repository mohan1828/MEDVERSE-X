import { fetchWithFallback } from './api';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experience_years: number;
  rating: number;
  consultation_fee: number;
  available_slots: string[];
}

export interface AppointmentBookingRequest {
  doctor_id: string;
  doctor_name: string;
  hospital_name: string;
  patient_name: string;
  appointment_date: string;
  appointment_time: string;
  consultation_type: 'In-Person' | 'Video Call';
  symptoms_note?: string;
}

export interface AppointmentBookingResponse {
  booking_id: string;
  status: string;
  details: AppointmentBookingRequest;
  message: string;
}

export const fallbackDoctors: Doctor[] = [
  {
    id: 'doc-201',
    name: 'Dr. Aris Thorne, MD',
    specialty: 'Chief Cardiologist & AI Precision Health Lead',
    hospital: 'MedVerse-X Academic Medical Center',
    experience_years: 16,
    rating: 4.98,
    consultation_fee: 180,
    available_slots: ['09:00 AM', '11:30 AM', '02:15 PM', '04:30 PM'],
  },
  {
    id: 'doc-202',
    name: 'Dr. Elena Rostova, MD, PhD',
    specialty: 'Senior Neurologist & Stroke Specialist',
    hospital: 'St. Jude Neuroscience & Emergency Hospital',
    experience_years: 14,
    rating: 4.95,
    consultation_fee: 210,
    available_slots: ['10:00 AM', '01:00 PM', '03:45 PM'],
  },
  {
    id: 'doc-203',
    name: 'Dr. Marcus Vance, MD',
    specialty: 'Endocrinologist & Metabolic AI Specialist',
    hospital: 'Apex Heart & Vascular Institute',
    experience_years: 12,
    rating: 4.89,
    consultation_fee: 160,
    available_slots: ['08:30 AM', '12:00 PM', '05:00 PM'],
  },
];

export async function fetchDoctorsList(): Promise<Doctor[]> {
  const res = await fetchWithFallback<{ doctors: Doctor[] }>('/healthcare/doctors', { method: 'GET' }, { doctors: fallbackDoctors });
  return res.doctors;
}

export async function bookDoctorAppointment(booking: AppointmentBookingRequest): Promise<AppointmentBookingResponse> {
  const fallbackRes: AppointmentBookingResponse = {
    booking_id: `APPT-${Math.floor(10000 + Math.random() * 90000)}`,
    status: 'Confirmed',
    details: booking,
    message: `Appointment successfully scheduled with ${booking.doctor_name} at ${booking.hospital_name} for ${booking.appointment_date} at ${booking.appointment_time}.`,
  };

  return fetchWithFallback<AppointmentBookingResponse>(
    '/healthcare/appointments/book',
    {
      method: 'POST',
      body: JSON.stringify(booking),
    },
    fallbackRes
  );
}
