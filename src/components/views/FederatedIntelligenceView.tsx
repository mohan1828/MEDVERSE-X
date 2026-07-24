import React, { useState } from 'react';
import { Network, LayoutDashboard, Cpu, Layers, Lock, Globe, BarChart3, ShieldCheck, Database, FlaskConical, LineChart, Sliders, Sparkles } from 'lucide-react';

import { FederatedEnterpriseDashboard } from './federated/FederatedEnterpriseDashboard';
import { FederatedLearningEngineView } from './federated/FederatedLearningEngineView';
import { SupportedModelsView } from './federated/SupportedModelsView';
import { SecureAggregationView } from './federated/SecureAggregationView';
import { HospitalCollaborationMapView } from './federated/HospitalCollaborationMapView';
import { ModelPerformanceView } from './federated/ModelPerformanceView';
import { PrivacyDashboardView } from './federated/PrivacyDashboardView';
import { BlockchainAuditView } from './federated/BlockchainAuditView';
import { ResearchCenterView } from './federated/ResearchCenterView';
import { HealthcareInsightsView } from './federated/HealthcareInsightsView';
import { AdminControlPanelView } from './federated/AdminControlPanelView';
import { AIExplainabilityView } from './federated/AIExplainabilityView';

export type FederatedSubTab =
  | 'dashboard'
  | 'learning-engine'
  | 'supported-models'
  | 'secure-aggregation'
  | 'collaboration-map'
  | 'model-performance'
  | 'privacy-dashboard'
  | 'blockchain-audit'
  | 'research-center'
  | 'healthcare-insights'
  | 'admin-control'
  | 'ai-explainability';

export const FederatedIntelligenceView: React.FC = () => {
  const [subTab, setSubTab] = useState<FederatedSubTab>('dashboard');

  const subNavItems: { id: FederatedSubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Enterprise Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'learning-engine', label: 'FL Learning Engine', icon: <Cpu className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'supported-models', label: 'Supported AI Models (8)', icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { id: 'secure-aggregation', label: 'Secure Model Aggregation', icon: <Lock className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'collaboration-map', label: 'Hospital Collaboration Map', icon: <Globe className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'model-performance', label: 'AI Model Performance', icon: <BarChart3 className="w-4 h-4 text-purple-400" /> },
    { id: 'privacy-dashboard', label: 'Privacy & Compliance', icon: <ShieldCheck className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'blockchain-audit', label: 'Blockchain Audit', icon: <Database className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'research-center', label: 'Research Collaboration', icon: <FlaskConical className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'healthcare-insights', label: 'Healthcare Insights', icon: <LineChart className="w-4 h-4 text-purple-400" /> },
    { id: 'admin-control', label: 'Admin Control Panel', icon: <Sliders className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'ai-explainability', label: 'AI Explainability (SHAP)', icon: <Sparkles className="w-4 h-4 text-[#00FFB2]" /> },
  ];

  return (
    <div className="app-container space-y-8 pb-16">
      
      {/* Top Banner Tagline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-[#00E5FF]/30 shadow-cyan-glow">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00E5FF] via-[#7C3AED] to-[#00FFB2] p-[2px] shadow-cyan-glow">
            <div className="w-full h-full bg-[#0B1220] rounded-[14px] flex items-center justify-center">
              <Network className="w-7 h-7 text-[#00E5FF] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">Federated Intelligence Network</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30 text-[10px] font-mono uppercase font-bold">
                ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-[#00E5FF] font-mono mt-0.5 italic">
              "Learning Together. Preserving Privacy."
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00FFB2] px-4 py-2 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30">
          <ShieldCheck className="w-4 h-4" />
          <span>142 Hospitals • 100% Homomorphic Encrypted</span>
        </div>
      </div>

      {/* Sub-Navigation Bar */}
      <div className="flex flex-wrap lg:flex-nowrap overflow-x-auto gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-[#00E5FF]/20">
        {subNavItems.map((item) => {
          const isActive = subTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] text-black font-extrabold shadow-cyan-glow'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Sub-Tab View Content */}
      <div className="min-h-[500px]">
        {subTab === 'dashboard' && <FederatedEnterpriseDashboard />}
        {subTab === 'learning-engine' && <FederatedLearningEngineView />}
        {subTab === 'supported-models' && <SupportedModelsView />}
        {subTab === 'secure-aggregation' && <SecureAggregationView />}
        {subTab === 'collaboration-map' && <HospitalCollaborationMapView />}
        {subTab === 'model-performance' && <ModelPerformanceView />}
        {subTab === 'privacy-dashboard' && <PrivacyDashboardView />}
        {subTab === 'blockchain-audit' && <BlockchainAuditView />}
        {subTab === 'research-center' && <ResearchCenterView />}
        {subTab === 'healthcare-insights' && <HealthcareInsightsView />}
        {subTab === 'admin-control' && <AdminControlPanelView />}
        {subTab === 'ai-explainability' && <AIExplainabilityView />}
      </div>

    </div>
  );
};
