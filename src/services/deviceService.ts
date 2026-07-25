import { fetchWithFallback } from './api';
import type { DeviceSession, LoginHistoryEntry } from '../types/auth';

const mockDevices: DeviceSession[] = [
  {
    device_id: 'dev-001',
    device_name: 'Windows 11 Workstation (Chrome 126)',
    browser: 'Chrome 126.0',
    os: 'Windows 11 Enterprise',
    location: 'San Francisco, CA (USA)',
    ip_address: '192.168.1.100',
    last_active: 'Just now',
    is_current: true,
    created_at: '2026-07-24 10:00:00 UTC'
  },
  {
    device_id: 'dev-002',
    device_name: 'MacBook Pro M3 (Safari 17)',
    browser: 'Safari 17.4',
    os: 'macOS Sonoma',
    location: 'New York, NY (USA)',
    ip_address: '74.125.20.10',
    last_active: '2 hours ago',
    is_current: false,
    created_at: '2026-07-20 14:22:00 UTC'
  },
  {
    device_id: 'dev-003',
    device_name: 'iPad Pro (Mobile Safari)',
    browser: 'Mobile Safari',
    os: 'iPadOS 17.5',
    location: 'Tokyo, JP',
    ip_address: '133.242.18.5',
    last_active: '1 day ago',
    is_current: false,
    created_at: '2026-07-15 09:10:00 UTC'
  }
];

const mockHistory: LoginHistoryEntry[] = [
  { id: 'log-1', timestamp: '2026-07-25 05:40:00 UTC', device: 'Windows 11 Workstation', location: 'San Francisco, USA', status: 'Success' },
  { id: 'log-2', timestamp: '2026-07-24 18:20:00 UTC', device: 'MacBook Pro M3', location: 'New York, USA', status: 'Success' },
  { id: 'log-3', timestamp: '2026-07-22 11:15:00 UTC', device: 'iPad Pro', location: 'Tokyo, Japan', status: 'Success' }
];

export const deviceService = {
  async getActiveDevices(): Promise<DeviceSession[]> {
    return fetchWithFallback<{ devices: DeviceSession[] }>('/auth/devices', { method: 'GET' }, { devices: mockDevices })
      .then(res => res.devices || mockDevices);
  },

  async logoutDevice(deviceId: string): Promise<void> {
    await fetchWithFallback(`/auth/logout-device?device_id=${deviceId}`, { method: 'DELETE' }, { status: 'ok' });
  },

  async logoutAllDevices(): Promise<void> {
    await fetchWithFallback('/auth/logout-all-devices', { method: 'DELETE' }, { status: 'ok' });
  },

  async getLoginHistory(): Promise<LoginHistoryEntry[]> {
    return fetchWithFallback<{ history: LoginHistoryEntry[] }>('/auth/login-history', { method: 'GET' }, { history: mockHistory })
      .then(res => res.history || mockHistory);
  }
};
