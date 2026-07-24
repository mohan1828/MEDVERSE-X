import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Cpu, HeartPulse, Brain, BarChart3, User, LayoutDashboard, Shield, QrCode, FileText, Network, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export type NavTab = 
  | 'dashboard'
  | 'health-intelligence'
  | 'ai-intelligence'
  | 'federated-intelligence'
  | 'legacy-intelligence'
  | 'emergency-center'
  | 'insights-analytics'
  | 'profile-settings';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isEmergencyActive: boolean;
  triggerEmergency: () => void;
  onOpenQRModal?: () => void;
  onOpenPDFModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isEmergencyActive,
  triggerEmergency,
  onOpenQRModal,
  onOpenPDFModal,
}) => {
  const { user, logout } = useAuth();

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'health-intelligence', label: 'Health Intelligence', icon: <HeartPulse className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'ai-intelligence', label: 'AI Intelligence', icon: <Cpu className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'federated-intelligence', label: 'Federated Network', icon: <Network className="w-4 h-4 text-[#00FFB2] animate-pulse" /> },
    { id: 'legacy-intelligence', label: 'Legacy Intelligence', icon: <Brain className="w-4 h-4 text-purple-400 animate-pulse" /> },
    { id: 'emergency-center', label: 'Emergency Center', icon: <Shield className="w-4 h-4 text-rose-500" /> },
    { id: 'insights-analytics', label: 'Insights & Analytics', icon: <BarChart3 className="w-4 h-4 text-[#00FFB2]" /> },
    { id: 'profile-settings', label: 'Profile & Settings', icon: <User className="w-4 h-4 text-slate-300" /> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1220]/85 border-b border-[#00E5FF]/20 py-3 transition-all duration-300">
      <div className="app-container flex items-center justify-between">
        
        {/* Brand Logo & Version Tag */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] via-[#7C3AED] to-[#00FFB2] p-[2px] shadow-cyan-glow group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0B1220] rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00E5FF] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-wider text-gradient-cyan">
                MEDVERSE-X
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-mono tracking-wider uppercase">
                SaaS OS v5.2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Autonomous Digital Twin & EternaMind X Platform
            </p>
          </div>
        </div>

        {/* Desktop Primary Navigation Bar (7 Unified Modules) */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#0F172A]/80 p-1.5 rounded-full border border-[#00E5FF]/20 shadow-glass">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#7C3AED] rounded-full shadow-cyan-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Toolbar & Emergency SOS */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenQRModal}
            title="Medical Emergency QR Profile"
            className="p-2 rounded-xl bg-slate-900 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">QR Profile</span>
          </button>

          <button
            onClick={onOpenPDFModal}
            title="Export Clinical PDF Report"
            className="p-2 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-all text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (activeTab === 'emergency-center') {
                setActiveTab('dashboard');
              } else {
                triggerEmergency();
                setActiveTab('emergency-center');
              }
            }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg ${
              isEmergencyActive || activeTab === 'emergency-center'
                ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-danger-glow animate-pulse border border-red-400'
                : 'bg-gradient-to-r from-red-500/20 to-rose-600/20 text-rose-300 border border-rose-500/40 hover:bg-rose-600/40'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{isEmergencyActive ? 'Emergency Active' : 'Emergency SOS'}</span>
          </motion.button>

          {user && (
            <button
              onClick={logout}
              title={`Signed in as ${user.name} (${user.role}). Click to Logout.`}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-rose-500/50 transition-all text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          )}
        </div>

      </div>

      {/* Mobile Navigation Row */}
      <div className="flex xl:hidden overflow-x-auto gap-2 pt-3 pb-1 border-t border-slate-800/60 mt-2 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === item.id
                ? 'bg-[#00E5FF] text-black font-semibold shadow-cyan-glow'
                : 'bg-slate-900/80 text-slate-300 border border-slate-800'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
