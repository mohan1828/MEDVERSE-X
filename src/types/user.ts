import type { UserRole } from './auth';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl: string;
  country: string;
  medicalHistorySummary?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  preferredLanguage?: string;
  darkModeEnabled?: boolean;
}
