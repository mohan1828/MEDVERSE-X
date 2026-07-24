// MEDVERSE-X Centralized API Client & Service Router
export const API_BASE_URL = 'http://localhost:8000/api/v1';

export async function fetchWithFallback<T>(endpoint: string, options: RequestInit = {}, fallbackData: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout for seamless backend detection
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn(`API endpoint ${endpoint} returned status ${response.status}. Using high-precision fallback.`);
      return fallbackData;
    }
    
    return (await response.json()) as T;
  } catch (err) {
    // Backend offline fallback - app functions standalone with zero disruption
    return fallbackData;
  }
}
