import { fetchWithFallback } from './api';
import { type UserProfile } from '../types/user';

export const userService = {
  async getProfile(userId: string): Promise<UserProfile> {
    const fallbackProfile: UserProfile = {
      id: userId,
      name: 'Alexander Vance',
      email: 'alexander.vance@medverse.ai',
      phone: '+1 (555) 392-8110',
      role: 'patient',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      country: 'United States',
      medicalHistorySummary: 'No chronic cardiovascular or renal diseases.',
      emergencyContactName: 'Elena Vance',
      emergencyContactPhone: '+1 (555) 019-2831',
      preferredLanguage: 'English',
      darkModeEnabled: true
    };

    return fetchWithFallback(`/patients/${userId}`, { method: 'GET' }, fallbackProfile);
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const saved = localStorage.getItem('medverse_user_profile');
    const existing = saved ? JSON.parse(saved) : {};
    const updated = { ...existing, ...profile };
    localStorage.setItem('medverse_user_profile', JSON.stringify(updated));
    return updated;
  }
};
