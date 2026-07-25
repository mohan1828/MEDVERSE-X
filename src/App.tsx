import { useState, useEffect } from 'react';
import { Navbar, type NavTab } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { DashboardView } from './components/views/DashboardView';
import { HealthIntelligenceView } from './components/views/HealthIntelligenceView';
import { AIIntelligenceView } from './components/views/AIIntelligenceView';
import { FederatedIntelligenceView } from './components/views/FederatedIntelligenceView';
import { EternaMindView } from './components/views/EternaMindView';
import { EmergencyCenterView } from './components/views/EmergencyCenterView';
import { InsightsAnalyticsView } from './components/views/InsightsAnalyticsView';
import { ProfileSettingsView } from './components/views/ProfileSettingsView';
import { DemoVideoModal } from './components/modals/DemoVideoModal';
import { MedicalQRModal } from './components/modals/MedicalQRModal';
import { PDFExportModal } from './components/modals/PDFExportModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { NotificationCenterModal } from './components/modals/NotificationCenterModal';
import { AppointmentBookingModal } from './components/modals/AppointmentBookingModal';

import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/auth/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { OTPVerificationPage } from './pages/auth/OTPVerificationPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { OnboardingWizard } from './components/auth/OnboardingWizard';

function MainContent() {
  const { screen, targetTab } = useAuth();
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false);
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);

  useEffect(() => {
    if (targetTab) {
      setActiveTab(targetTab);
    }
  }, [targetTab]);

  const triggerEmergency = () => {
    setIsEmergencyActive(true);
    setActiveTab('emergency-center');
  };

  if (screen === 'landing') return <LandingPage />;
  if (screen === 'login') return <LoginPage />;
  if (screen === 'signup') return <SignupPage />;
  if (screen === 'otp') return <OTPVerificationPage />;
  if (screen === 'forgot-password') return <ForgotPasswordPage />;
  if (screen === 'reset-password') return <ResetPasswordPage />;
  if (screen === 'onboarding') return <OnboardingWizard />;

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 relative font-sans selection:bg-[#00E5FF] selection:text-black">

      {/* Background Neural Particle Canvas */}
      <ParticleBackground />

      {/* Primary Cyber Navbar (7 Modules + Auth Badge) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isEmergencyActive={isEmergencyActive}
        triggerEmergency={triggerEmergency}
        onOpenQRModal={() => setIsQRModalOpen(true)}
        onOpenPDFModal={() => setIsPDFModalOpen(true)}
        onOpenSearchModal={() => setIsSearchOpen(true)}
        onOpenNotificationModal={() => setIsNotificationOpen(true)}
        onOpenAppointmentModal={() => setIsAppointmentOpen(true)}
      />

      {/* Main Module Content Router */}
      <main className="relative z-10 pt-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigate={(tab) => setActiveTab(tab)}
            onTriggerEmergency={triggerEmergency}
          />
        )}

        {activeTab === 'health-intelligence' && (
          <HealthIntelligenceView />
        )}

        {activeTab === 'ai-intelligence' && (
          <AIIntelligenceView />
        )}

        {activeTab === 'federated-intelligence' && (
          <FederatedIntelligenceView />
        )}

        {activeTab === 'legacy-intelligence' && (
          <EternaMindView />
        )}

        {activeTab === 'emergency-center' && (
          <EmergencyCenterView />
        )}

        {activeTab === 'insights-analytics' && (
          <InsightsAnalyticsView />
        )}

        {activeTab === 'profile-settings' && (
          <ProfileSettingsView />
        )}
      </main>

      {/* Interactive Production Modals */}
      <DemoVideoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      <MedicalQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        patientId="MV-994812"
        patientName="Alexander Vance"
      />

      <PDFExportModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        patientName="Alexander Vance"
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      <NotificationCenterModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <AppointmentBookingModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#00E5FF]/15 bg-[#0B1220]/90 py-8 text-center text-xs font-mono text-slate-400">
        <div className="app-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gradient-cyan text-sm">MEDVERSE-X</span>
            <span>• Enterprise Healthcare Operating System & EternaMind X</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Predict. Prevent. Personalize. Protect.</span>
            <span>•</span>
            <span className="text-[#00FFB2]">International AI Hackathon Winner</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;
