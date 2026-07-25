import React, { useState, useEffect } from 'react';
import { ShieldCheck, Monitor, Smartphone, Laptop, LogOut, Key, Clock, MapPin, CheckCircle2, Trash2, Edit2 } from 'lucide-react';
import { deviceService } from '../../services/deviceService';
import type { DeviceSession, LoginHistoryEntry } from '../../types/auth';

export const SecurityDevicesView: React.FC = () => {
  const [devices, setDevices] = useState<DeviceSession[]>([]);
  const [history, setHistory] = useState<LoginHistoryEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDeviceName, setNewDeviceName] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const devList = await deviceService.getActiveDevices();
    const histList = await deviceService.getLoginHistory();
    setDevices(devList);
    setHistory(histList);
  };

  const handleLogoutDevice = async (id: string) => {
    await deviceService.logoutDevice(id);
    setDevices(prev => prev.filter(d => d.device_id !== id));
  };

  const handleLogoutAll = async () => {
    await deviceService.logoutAllDevices();
    setDevices(prev => prev.filter(d => d.is_current));
  };

  const handleRename = (id: string, currentName: string) => {
    setEditingId(id);
    setNewDeviceName(currentName);
  };

  const saveRename = (id: string) => {
    setDevices(prev => prev.map(d => d.device_id === id ? { ...d, device_name: newDeviceName } : d));
    setEditingId(null);
  };

  const getDeviceIcon = (os: string) => {
    if (os.toLowerCase().includes('windows') || os.toLowerCase().includes('mac')) {
      return <Laptop className="w-5 h-5 text-[#00E5FF]" />;
    }
    if (os.toLowerCase().includes('ios') || os.toLowerCase().includes('android')) {
      return <Smartphone className="w-5 h-5 text-[#00FFB2]" />;
    }
    return <Monitor className="w-5 h-5 text-purple-400" />;
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Permanent Account Verification Status Card */}
      <div className="glass-panel p-6 rounded-3xl border border-[#00FFB2]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#00FFB2]/10 border border-[#00FFB2]/40 flex items-center justify-center text-[#00FFB2]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Email Verification Status</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/40 text-[#00FFB2] font-mono text-[10px] font-bold uppercase">
                PERMANENTLY VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              alexander.vance@medverse.ai • Verified via 6-digit OTP code on initial account signup.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Password reset verification email dispatched!')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-[#00E5FF]/30 text-[#00E5FF] font-mono text-xs font-bold hover:bg-[#00E5FF]/10 transition-all whitespace-nowrap flex items-center gap-2"
        >
          <Key className="w-4 h-4" /> Change Security Password
        </button>
      </div>

      {/* Trusted Devices Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="heading-section">Connected Trusted Devices</h2>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Synchronized active sessions across workstations, laptops, and mobile devices
            </p>
          </div>

          <button
            onClick={handleLogoutAll}
            className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold hover:bg-rose-900/50 transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout All Other Devices
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {devices.map((d) => (
            <div
              key={d.device_id}
              className={`p-6 rounded-3xl space-y-4 border transition-all ${
                d.is_current ? 'bg-slate-900/90 border-[#00E5FF]/40 shadow-cyan-glow' : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getDeviceIcon(d.os)}
                  </div>
                  <div>
                    {editingId === d.device_id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={newDeviceName}
                          onChange={(e) => setNewDeviceName(e.target.value)}
                          className="bg-slate-950 px-2 py-1 rounded text-xs font-mono text-white border border-[#00E5FF]"
                        />
                        <button onClick={() => saveRename(d.device_id)} className="text-[10px] text-[#00FFB2]">Save</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs font-mono">{d.device_name}</span>
                        <button onClick={() => handleRename(d.device_id, d.device_name)} title="Rename Device">
                          <Edit2 className="w-3 h-3 text-slate-500 hover:text-white" />
                        </button>
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-slate-400">{d.browser}</span>
                  </div>
                </div>

                {d.is_current && (
                  <span className="px-2 py-0.5 rounded-full bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30 text-[9px] font-mono font-bold uppercase">
                    THIS DEVICE
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{d.location} ({d.ip_address})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-[#00FFB2]" />
                  <span>Last Active: <strong className="text-white">{d.last_active}</strong></span>
                </div>
              </div>

              {!d.is_current && (
                <button
                  onClick={() => handleLogoutDevice(d.device_id)}
                  className="w-full py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Revoke Session
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Login History Audit Log */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <h2 className="heading-section">Authentication & Session History</h2>
        <div className="space-y-2 font-mono text-xs">
          {history.map((h) => (
            <div key={h.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center text-slate-300">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#00FFB2]" />
                <div>
                  <div className="font-bold text-white">{h.device}</div>
                  <div className="text-[10px] text-slate-400">{h.location} • {h.timestamp}</div>
                </div>
              </div>
              <span className="text-[#00FFB2] font-bold uppercase">{h.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
