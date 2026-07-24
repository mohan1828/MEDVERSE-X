export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'lab' | 'emergency' | 'bloodbank' | 'ambulance';
  address: string;
  distanceKm: number;
  estTravelMins: number;
  estWaitMins: number;
  rating: number;
  reviewCount: number;
  trustScore: number;
  is24x7: boolean;
  icuAvailable: boolean;
  languages: string[];
  insuranceAccepted: string[];
  recommendedDoctor?: {
    name: string;
    specialty: string;
    experienceYears: number;
    rating: number;
    availableSlot: string;
    avatar: string;
  };
  whyRecommended: string[];
  lat: number; // offset relative on canvas
  lng: number;
  phone: string;
  consultationFeeEst: string;
}

export interface SymptomTriageItem {
  id: string;
  label: string;
  icon: string;
  recommendedSpecialty: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  matchedFacilityId: string;
}

export const mockNavigatorData = {
  userCurrentCity: 'San Francisco, CA (Home Network)',
  travelModeCity: 'Tokyo, Japan (Travel Mode Active)',
  isTravelModeActive: true,
  travelNoticeText: 'You appear to be away from your usual healthcare network in Tokyo, Japan. Would you like MEDVERSE-X to help you find the best nearby English-speaking medical care?',

  symptomTriage: [
    { id: 'fever', label: 'High Fever & Headache', icon: '🌡️', recommendedSpecialty: 'General Physician & Internal Medicine', severity: 'moderate', matchedFacilityId: 'f-1' },
    { id: 'chest-pain', label: 'Chest Pain & Pressure', icon: '🫀', recommendedSpecialty: 'Emergency Cardiology & Cath Lab', severity: 'critical', matchedFacilityId: 'f-2' },
    { id: 'breathing', label: 'Difficulty Breathing', icon: '🫁', recommendedSpecialty: 'Pulmonology & Mobile ICU', severity: 'critical', matchedFacilityId: 'f-2' },
    { id: 'fracture', label: 'Bone Fracture / Injury', icon: '🦴', recommendedSpecialty: 'Orthopedic Trauma Center', severity: 'high', matchedFacilityId: 'f-3' },
    { id: 'pregnancy', label: 'Pregnancy Care', icon: '🤰', recommendedSpecialty: 'Maternity & Obstetrics Center', severity: 'moderate', matchedFacilityId: 'f-4' },
    { id: 'child', label: 'Child High Fever', icon: '👶', recommendedSpecialty: 'Pediatric Urgent Care', severity: 'high', matchedFacilityId: 'f-4' },
    { id: 'eye', label: 'Eye Trauma / Pain', icon: '👁️', recommendedSpecialty: 'Ophthalmology Emergency', severity: 'moderate', matchedFacilityId: 'f-5' },
    { id: 'dental', label: 'Severe Dental Pain', icon: '🦷', recommendedSpecialty: 'Emergency Dental Clinic', severity: 'low', matchedFacilityId: 'f-6' },
  ] as SymptomTriageItem[],

  facilities: [
    {
      id: 'f-1',
      name: 'St. Jude International Medical Center & Clinic',
      type: 'hospital',
      address: '4-1-1 Roppongi, Minato City, Tokyo',
      distanceKm: 1.2,
      estTravelMins: 8,
      estWaitMins: 10,
      rating: 4.9,
      reviewCount: 1420,
      trustScore: 98,
      is24x7: true,
      icuAvailable: true,
      languages: ['English', 'Japanese', 'Mandarin'],
      insuranceAccepted: ['Global Cigna', 'Aetna International', 'Bupa', 'National Health'],
      recommendedDoctor: {
        name: 'Dr. Marcus Vance, M.D.',
        specialty: 'Internal Medicine & Tropical Infections',
        experienceYears: 18,
        rating: 4.9,
        availableSlot: 'Today at 02:15 PM (In 15 mins)',
        avatar: '👨‍⚕️'
      },
      whyRecommended: [
        'Closest English-speaking 24x7 Emergency Medical Center',
        'Top 1% Fever & Acute Infection Treatment Record',
        'Direct digital twin telemetry sync enabled',
        '10-minute average emergency intake wait time'
      ],
      lat: 0.15,
      lng: -0.2,
      phone: '+81 3-5555-0192',
      consultationFeeEst: '$120 - $150 (Covered by International Insurance)'
    },
    {
      id: 'f-2',
      name: 'Tokyo Central Cardiac & Emergency Trauma Hospital',
      type: 'emergency',
      address: '2-8-1 Nishi-Shinjuku, Shinjuku City, Tokyo',
      distanceKm: 2.4,
      estTravelMins: 12,
      estWaitMins: 0,
      rating: 4.95,
      reviewCount: 3890,
      trustScore: 99,
      is24x7: true,
      icuAvailable: true,
      languages: ['English', 'Japanese'],
      insuranceAccepted: ['All International & Local Providers'],
      recommendedDoctor: {
        name: 'Dr. Sarah Lin, M.D., FACC',
        specialty: 'Chief of Interventional Cardiology',
        experienceYears: 22,
        rating: 5.0,
        availableSlot: 'Immediate Mobile ICU & Cath Lab Standby',
        avatar: '👩‍⚕️'
      },
      whyRecommended: [
        'Level-1 Trauma & ST-Elevation Arrhythmia Center',
        'Direct ambulance GPS traffic clearance clearance',
        'Reserved ICU Bed #12 available for MEDVERSE-X users',
        '0.4ms ST-Elevation Watchdog Latency'
      ],
      lat: 0.45,
      lng: 0.35,
      phone: '+81 3-5555-0911',
      consultationFeeEst: 'Covered under Emergency Protocol'
    },
    {
      id: 'f-3',
      name: 'Shinjuku Orthopedic & Joint Trauma Clinic',
      type: 'clinic',
      address: '1-14-2 Shinjuku, Tokyo',
      distanceKm: 3.1,
      estTravelMins: 15,
      estWaitMins: 15,
      rating: 4.8,
      reviewCount: 890,
      trustScore: 95,
      is24x7: false,
      icuAvailable: false,
      languages: ['English', 'Japanese'],
      insuranceAccepted: ['Cigna', 'Bupa', 'Travel Guard'],
      recommendedDoctor: {
        name: 'Dr. Kenji Sato, M.D.',
        specialty: 'Orthopedic Trauma & Sports Medicine',
        experienceYears: 16,
        rating: 4.8,
        availableSlot: 'Today at 03:00 PM',
        avatar: '👨‍⚕️'
      },
      whyRecommended: [
        'Dedicated digital X-ray and CT fracture imaging',
        'Sub-specialized in acute sports and travel joint trauma',
        'Short waiting times for urgent appointments'
      ],
      lat: -0.3,
      lng: 0.4,
      phone: '+81 3-5555-0382',
      consultationFeeEst: '$100 - $140'
    },
    {
      id: 'f-4',
      name: '24/7 MedPulse Pharmacy & Diagnostic Lab',
      type: 'pharmacy',
      address: '3-2-1 Roppongi Hills, Tokyo',
      distanceKm: 0.5,
      estTravelMins: 4,
      estWaitMins: 5,
      rating: 4.9,
      reviewCount: 620,
      trustScore: 97,
      is24x7: true,
      icuAvailable: false,
      languages: ['English', 'Japanese'],
      insuranceAccepted: ['Direct e-Prescription Sync'],
      whyRecommended: [
        '24/7 Prescription refill & delivery',
        'Direct electronic prescription sync from AI Doctor RAG',
        'Multilingual pharmacist on duty'
      ],
      lat: -0.1,
      lng: -0.35,
      phone: '+81 3-5555-0411',
      consultationFeeEst: '$20 - $40 (Prescription depending)'
    }
  ] as HealthcareFacility[]
};
