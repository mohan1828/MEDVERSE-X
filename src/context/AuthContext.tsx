import React, { createContext, useContext, useState, useEffect } from 'react';
import { type AuthUser, type AuthScreen, type UserRole, type LoginCredentials, type SignupCredentials } from '../types/auth';
import { authService } from '../services/authService';
import { type NavTab } from '../components/Navbar';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  screen: AuthScreen;
  selectedRole: UserRole;
  pendingEmail: string;
  targetTab: NavTab;
  setScreen: (screen: AuthScreen) => void;
  setSelectedRole: (role: UserRole) => void;
  setPendingEmail: (email: string) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  verifyOTP: (otpCode: string) => Promise<boolean>;
  completeOnboarding: (onboardingData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [screen, setScreen] = useState<AuthScreen>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [pendingEmail, setPendingEmail] = useState<string>('alexander.vance@medverse.ai');
  const [targetTab, setTargetTab] = useState<NavTab>('dashboard');

  useEffect(() => {
    // Auto-check session storage
    const savedUser = localStorage.getItem('medverse_auth_user');
    const savedToken = localStorage.getItem('medverse_jwt_token');
    if (savedUser && savedToken) {
      try {
        const u = JSON.parse(savedUser) as AuthUser;
        setUser(u);
        setSelectedRole(u.role);
        if (u.isOnboarded) {
          setScreen('platform');
        } else {
          setScreen('onboarding');
        }
      } catch (err) {
        localStorage.removeItem('medverse_auth_user');
      }
    }
  }, []);

  const mapRoleToNavTab = (role: UserRole): NavTab => {
    switch (role) {
      case 'patient':
        return 'dashboard';
      case 'doctor':
        return 'ai-intelligence';
      case 'hospital_admin':
      case 'researcher':
      case 'laboratory':
      case 'admin':
        return 'federated-intelligence';
      case 'responder':
        return 'emergency-center';
      default:
        return 'dashboard';
    }
  };

  const login = async (credentials: LoginCredentials) => {
    const role = credentials.role || selectedRole;
    const res = await authService.login({ ...credentials, role });
    setUser(res.user);
    setSelectedRole(res.user.role);
    setPendingEmail(res.user.email);
    localStorage.setItem('medverse_auth_user', JSON.stringify(res.user));
    localStorage.setItem('medverse_jwt_token', res.token);
    setTargetTab(mapRoleToNavTab(res.user.role));

    if (!res.user.isOnboarded) {
      setScreen('onboarding');
    } else {
      setScreen('platform');
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    const res = await authService.signup(credentials);
    setUser(res.user);
    setSelectedRole(res.user.role);
    setPendingEmail(res.user.email);
    setScreen('otp');
  };

  const verifyOTP = async (otpCode: string): Promise<boolean> => {
    const success = await authService.verifyOTP(pendingEmail, otpCode);
    if (success && user) {
      const updated = { ...user };
      setUser(updated);
      localStorage.setItem('medverse_auth_user', JSON.stringify(updated));
      setScreen('onboarding');
      return true;
    }
    return false;
  };

  const completeOnboarding = async (onboardingData: any) => {
    if (!user) return;
    const updated = await authService.completeOnboarding(user.id, selectedRole, onboardingData);
    setUser(updated);
    localStorage.setItem('medverse_auth_user', JSON.stringify(updated));
    setTargetTab(mapRoleToNavTab(selectedRole));
    setScreen('platform');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medverse_auth_user');
    localStorage.removeItem('medverse_jwt_token');
    setScreen('landing');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.isOnboarded,
        screen,
        selectedRole,
        pendingEmail,
        targetTab,
        setScreen,
        setSelectedRole,
        setPendingEmail,
        login,
        signup,
        verifyOTP,
        completeOnboarding,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
