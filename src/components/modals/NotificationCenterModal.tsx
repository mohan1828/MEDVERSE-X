import React, { useState, useEffect } from 'react';
import { Bell, X, ShieldAlert, Pill, Calendar, Activity, Check } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import { type HealthNotification } from '../../types/notification';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<HealthNotification[]>([]);

  useEffect(() => {
    if (isOpen) {
      notificationService.getNotifications().then(setNotifications);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMarkRead = (id: string) => {
    notificationService.markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'appointment': return <Calendar className="w-4 h-4 text-[#00E5FF]" />;
      case 'medicine': return <Pill className="w-4 h-4 text-[#00FFB2]" />;
      case 'emergency': return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      default: return <Activity className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-[#0B1220] border-l border-[#00E5FF]/30 h-full p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#00E5FF]" />
            <h2 className="text-lg font-bold text-white font-mono">Notification Center</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all space-y-2 ${
                n.isRead ? 'bg-slate-900/60 border-slate-800 opacity-75' : 'bg-slate-900 border-[#00E5FF]/30 shadow-cyan-glow'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getIcon(n.category)}
                  </div>
                  <span className="font-bold text-white text-xs font-mono">{n.title}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
              </div>

              <p className="text-xs text-slate-300 font-sans pl-10">{n.message}</p>

              {!n.isRead && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="text-[10px] font-mono text-[#00FFB2] flex items-center gap-1 hover:underline"
                  >
                    <Check className="w-3 h-3" /> Mark as Read
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
