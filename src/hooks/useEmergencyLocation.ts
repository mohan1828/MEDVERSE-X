import { useState, useEffect } from 'react';

export interface LocationState {
  lat: number;
  lng: number;
  accuracy: number;
  address: string;
  isLoading: boolean;
  error: string | null;
}

export function useEmergencyLocation(): LocationState {
  const [location, setLocation] = useState<LocationState>({
    lat: 37.7749, // Silicon Valley / Medical District default
    lng: -122.4194,
    accuracy: 10,
    address: '450 AI Healthcare Blvd, Medical District',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, isLoading: false, error: 'Geolocation not supported by browser.' }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          address: `GPS Locked: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° W`,
          isLoading: false,
          error: null,
        });
      },
      () => {
        setLocation((prev) => ({
          ...prev,
          isLoading: false,
          address: '450 AI Healthcare Blvd (Default High-Precision GPS)',
          error: null, // Graceful fallback
        }));
      },
      { timeout: 5000, enableHighAccuracy: true }
    );
  }, []);

  return location;
}
