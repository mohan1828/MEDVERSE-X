import { fetchWithFallback } from './api';
import { type AuthUser, type LoginCredentials, type SignupCredentials, type UserRole } from '../types/auth';

const mockDefaultUser: AuthUser = {
  id: 'usr-994812',
  name: 'Alexander Vance',
  email: 'alexander.vance@medverse.ai',
  phone: '+1 (555) 392-8110',
  country: 'United States',
  role: 'patient',
  isOnboarded: true,
  twoFactorEnabled: true,
  createdAt: '2026-01-15 08:30:00 UTC',
  lastLoginAt: '2026-07-24 23:59:00 UTC',
  patientProfile: {
    age: 38,
    gender: 'Male',
    bloodGroup: 'O-Positive',
    heightCm: 182,
    weightKg: 78,
    allergies: ['Penicillin', 'Peanuts'],
    medications: ['EPA/DHA 2000mg', 'CoQ10 200mg', 'Magnesium L-Threonate'],
    emergencyContact: 'Elena Vance (+1 555-019-2831)',
    insuranceProvider: 'BlueCross Apex Health #MV-90182',
    wearableSynced: 'Apple Watch Ultra 3 & Oura Ring Gen4'
  }
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> {
    const role: UserRole = credentials.role || 'patient';
    const fallbackUser: AuthUser = {
      ...mockDefaultUser,
      email: credentials.email,
      role,
      name: credentials.email.split('@')[0].replace('.', ' ').toUpperCase(),
    };

    const fallbackResponse = {
      user: fallbackUser,
      token: `jwt-bearer-${Date.now()}-sec-token`
    };

    return fetchWithFallback('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }, fallbackResponse);
  },

  async signup(credentials: SignupCredentials): Promise<{ user: AuthUser; token: string }> {
    const fallbackUser: AuthUser = {
      id: `usr-${Math.floor(Math.random() * 899999 + 100000)}`,
      name: credentials.name,
      email: credentials.email,
      phone: credentials.phone,
      country: credentials.country,
      role: credentials.role,
      isOnboarded: false,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    return fetchWithFallback('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }, { user: fallbackUser, token: `jwt-bearer-${Date.now()}` });
  },

  async verifyOTP(email: string, otpCode: string): Promise<boolean> {
    return fetchWithFallback('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otpCode })
    }, otpCode.length === 6);
  },

  async completeOnboarding(userId: string, role: UserRole, onboardingData: any): Promise<AuthUser> {
    const updatedUser: AuthUser = {
      ...mockDefaultUser,
      id: userId,
      role,
      isOnboarded: true,
      ...(role === 'patient' ? { patientProfile: onboardingData } : {}),
      ...(role === 'doctor' ? { doctorProfile: onboardingData } : {}),
      ...(role === 'hospital_admin' ? { hospitalAdminProfile: onboardingData } : {})
    };

    return fetchWithFallback('/auth/onboarding', {
      method: 'POST',
      body: JSON.stringify({ userId, role, onboardingData })
    }, updatedUser);
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const saved = localStorage.getItem('medverse_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return mockDefaultUser;
      }
    }
    return mockDefaultUser;
  }
};
