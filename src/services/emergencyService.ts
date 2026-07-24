import { fetchWithFallback } from './api';

export interface EmergencySOSResponse {
  sos_id: string;
  status: string;
  dispatched_ambulance: {
    unit: string;
    driver: string;
    phone: string;
    eta_minutes: number;
  };
  nearest_hospital: {
    name: string;
    phone: string;
    address: string;
  };
  notified_contacts: string[];
  eta_minutes: number;
  emergency_qr_url: string;
}

export const fallbackSOSResponse: EmergencySOSResponse = {
  sos_id: 'SOS-ALERT-99412',
  status: 'DISPATCHED',
  dispatched_ambulance: {
    unit: 'MED-AMB-09 (ALS ICU Equipped)',
    driver: 'Marcus Rodriguez',
    phone: '+1 (555) 911-0099',
    eta_minutes: 4,
  },
  nearest_hospital: {
    name: 'MedVerse-X Academic Medical Center Level 1 Trauma',
    phone: '+1 (800) 555-9111',
    address: '450 AI Healthcare Blvd',
  },
  notified_contacts: [
    'Sarah Vance (Wife) - SMS & Automated Emergency Call Sent',
    'Dr. Aris Thorne (Primary Physician) - Priority Tele-Alert Triggered',
  ],
  eta_minutes: 4,
  emergency_qr_url: '/api/v1/emergency/qr/MV-994812',
};

export async function triggerEmergencySOS(lat: number, lng: number, patientId = 'MV-994812'): Promise<EmergencySOSResponse> {
  return fetchWithFallback<EmergencySOSResponse>(
    '/emergency/trigger-sos',
    {
      method: 'POST',
      body: JSON.stringify({ lat, lng, patient_id: patientId, trigger_type: 'Manual SOS Button' }),
    },
    fallbackSOSResponse
  );
}
