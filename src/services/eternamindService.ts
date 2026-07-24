import { fetchWithFallback } from './api';

export interface EternaMindSummary {
  legacy_score: number;
  knowledge_completeness: number;
  timeline_progress: string;
  expertise_domains: number;
  family_generations_synced: number;
  ai_mentor_readiness: number;
}

export const fallbackEternaSummary: EternaMindSummary = {
  legacy_score: 94,
  knowledge_completeness: 88,
  timeline_progress: '34 Milestones Synced',
  expertise_domains: 12,
  family_generations_synced: 5,
  ai_mentor_readiness: 96.5,
};

export async function getEternaMindSummary(): Promise<EternaMindSummary> {
  return fetchWithFallback<EternaMindSummary>('/eternamind/summary', { method: 'GET' }, fallbackEternaSummary);
}
