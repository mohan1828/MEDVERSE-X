import { useState } from 'react';
import { Navbar, type NavTab } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { DashboardView } from './components/views/DashboardView';
import { HealthIntelligenceView } from './components/views/HealthIntelligenceView';
import { AIIntelligenceView } from './components/views/AIIntelligenceView';
import { EternaMindView } from './components/views/EternaMindView';
import { EmergencyCenterView } from './components/views/EmergencyCenterView';
import { InsightsAnalyticsView } from './components/views/InsightsAnalyticsView';
import { ProfileSettingsView } from './components/views/ProfileSettingsView';
import { DemoVideoModal } from './components/modals/DemoVideoModal';
// test content
export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false);
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);

  const triggerEmergency = () => {
    setIsEmergencyActive(true);
    setActiveTab('emergency-center');
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 relative font-sans selection:bg-[#00E5FF] selection:text-black">

      {/* Background Neural Particle Canvas */}
      <ParticleBackground />

      {/* Primary Cyber Navbar (7 Modules) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isEmergencyActive={isEmergencyActive}
        triggerEmergency={triggerEmergency}
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

      {/* Demo Video Modal */}
      <DemoVideoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#00E5FF]/15 bg-[#0B1220]/90 py-8 px-4 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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

export default App;
