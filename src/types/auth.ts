// MEDVERSE-X Centralized Authentication & User Types

export type UserRole =
  | 'patient'
  | 'doctor'
  | 'hospital_admin'
  | 'researcher'
  | 'laboratory'
  | 'responder'
  | 'admin';

export type AuthScreen =
  | 'landing'
  | 'login'
  | 'signup'
  | 'otp'
  | 'forgot-password'
  | 'reset-password'
  | 'onboarding'
  | 'platform';

export interface DeviceSession {
  device_id: string;
  device_name: string;
  browser: string;
  os: string;
  location: string;
  ip_address: string;
  last_active: string;
  is_current: boolean;
  created_at: string;
}

export interface LoginHistoryEntry {
  id: string;
  timestamp: string;
  device: string;
  location: string;
  status: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  role: UserRole;
  avatarUrl?: string;
  isOnboarded: boolean;
  isEmailVerified?: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  lastLoginAt: string;
  patientProfile?: {
    age: number;
    gender: string;
    bloodGroup: string;
    heightCm: number;
    weightKg: number;
    allergies: string[];
    medications: string[];
    emergencyContact: string;
    insuranceProvider: string;
    wearableSynced: string;
  };
  doctorProfile?: {
    licenseNo: string;
    qualification: string;
    specialization: string;
    hospital: string;
    experienceYrs: number;
    consultationFee: number;
    isVerified: boolean;
  };
  hospitalAdminProfile?: {
    hospitalName: string;
    licenseNo: string;
    address: string;
    departmentCount: number;
    doctorCount: number;
    emergencyCapacity: number;
    isVerified: boolean;
  };
}

export interface LoginCredentials {
  email: string;
  password?: string;
  role?: UserRole;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  name: string;
  email: string;
  phone: string;
  password?: string;
  country: string;
  role: UserRole;
}
