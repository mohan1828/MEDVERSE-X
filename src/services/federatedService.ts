import { fetchWithFallback } from './api';
import {
  mockFederatedMetrics,
  mockHospitalNodes,
  mockSupportedModels,
  mockBlockchainAuditLedger,
  mockSHAPExplanation,
  mockHealthcareInsights,
  type HospitalNode,
  type SupportedAIModel,
  type BlockchainAuditBlock
} from '../data/mockFederatedData';

export const federatedService = {
  async getDashboardMetrics() {
    return fetchWithFallback('/federated/dashboard', { method: 'GET' }, {
      status: 'online',
      tagline: 'Learning Together. Preserving Privacy.',
      metrics: mockFederatedMetrics,
      participatingInstitutions: mockHospitalNodes
    });
  },

  async getSupportedModels(): Promise<SupportedAIModel[]> {
    return fetchWithFallback('/federated/models', { method: 'GET' }, mockSupportedModels);
  },

  async simulateRound(modelId: string, algorithm = 'FedAvg', epsilon = 0.5) {
    const fallback = {
      roundNumber: mockFederatedMetrics.currentFederatedRound + 1,
      modelId,
      algorithm,
      globalAccuracy: 97.1,
      previousAccuracy: 96.8,
      accuracyGain: 0.3,
      trainingLoss: 0.044,
      encryptedGradientHash: `0x7f8a${Math.floor(Math.random() * 89999999 + 10000000).toString(16)}e94c`,
      participatingNodes: mockFederatedMetrics.connectedHospitals,
      privacyBudgetRemainingEpsilon: epsilon,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    };

    return fetchWithFallback('/federated/simulate-round', {
      method: 'POST',
      body: JSON.stringify({ modelId, algorithm, differentialPrivacyEpsilon: epsilon })
    }, fallback);
  },

  async getBlockchainAuditLedger(): Promise<BlockchainAuditBlock[]> {
    const res = await fetchWithFallback('/federated/blockchain-audit', { method: 'GET' }, { blocks: mockBlockchainAuditLedger });
    return res.blocks || mockBlockchainAuditLedger;
  },

  async getExplainability(predictionId = 'PRED-9984') {
    return fetchWithFallback(`/federated/explainability?prediction_id=${predictionId}`, { method: 'GET' }, mockSHAPExplanation);
  },

  getHealthcareInsights() {
    return mockHealthcareInsights;
  },

  getHospitalNodes(): HospitalNode[] {
    return mockHospitalNodes;
  }
};
