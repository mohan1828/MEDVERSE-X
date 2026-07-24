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
  | 'onboarding'
  | 'platform';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  role: UserRole;
  avatarUrl?: string;
  isOnboarded: boolean;
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
