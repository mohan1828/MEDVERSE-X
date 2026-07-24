// MEDVERSE-X Federated Intelligence Network Mock Data System

export interface HospitalNode {
  id: string;
  name: string;
  type: 'Hospital' | 'Laboratory' | 'Diagnostic Center' | 'AI Research Node';
  location: string;
  country: string;
  lat: number;
  lng: number;
  status: 'Online' | 'Training' | 'Aggregating' | 'Idle';
  dataRecords: number;
  localAccuracy: number;
  latencyMs: number;
  gradientHash: string;
  securityStatus: 'Encrypted & Verified' | 'Homomorphic Vault Active';
}

export interface SupportedAIModel {
  id: string;
  name: string;
  category: string;
  tagline: string;
  trainingStatus: 'Converged' | 'Active Training' | 'Aggregating' | 'Optimization Phase';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingProgress: number;
  totalSamples: number;
  roundCount: number;
  weightVectorSizeMB: number;
  supportedFeatures: string[];
}

export interface BlockchainAuditBlock {
  blockIndex: number;
  timestamp: string;
  round: number;
  eventType: string;
  modelId: string;
  participatingNodes: number;
  hash: string;
  previousHash: string;
  merkleRoot: string;
  validator: string;
  verificationStatus: 'VERIFIED & IMMUTABLE' | 'CONSENSUS VALIDATED';
}

export interface SHAPFeature {
  feature: string;
  importance: number;
  impact: string;
  direction: 'positive' | 'negative';
  value: string;
}

export const mockFederatedMetrics = {
  connectedHospitals: 142,
  connectedLaboratories: 88,
  connectedAINodes: 520,
  modelTrainingStatus: 'Active Aggregation - Round #48',
  globalModelAccuracy: 96.8,
  localModelAccuracyMin: 94.2,
  localModelAccuracyMax: 98.6,
  currentFederatedRound: 48,
  participatingInstitutionsCount: 230,
  privacyScore: 99.8,
  securityScore: 100.0,
  synchronizationStatus: 'Real-time Synced (48ms avg)',
  trainingProgressPercent: 94,
  epsilonPrivacyBudget: 0.5,
  deltaPrivacy: 1e-5,
  totalPatientRecordsProtected: '42.8 Million'
};

export const mockHospitalNodes: HospitalNode[] = [
  {
    id: 'node-mayo-01',
    name: 'Mayo Clinic Federated AI Center',
    type: 'Hospital',
    location: 'Rochester, MN',
    country: 'United States',
    lat: 44.0225,
    lng: -92.4699,
    status: 'Online',
    dataRecords: 1250000,
    localAccuracy: 97.8,
    latencyMs: 38,
    gradientHash: '0x8f9a21b...4c1a',
    securityStatus: 'Homomorphic Vault Active'
  },
  {
    id: 'node-jhu-02',
    name: 'Johns Hopkins AI Research Lab',
    type: 'AI Research Node',
    location: 'Baltimore, MD',
    country: 'United States',
    lat: 39.2904,
    lng: -76.6122,
    status: 'Training',
    dataRecords: 980000,
    localAccuracy: 96.9,
    latencyMs: 42,
    gradientHash: '0x3c7e190...8d2b',
    securityStatus: 'Encrypted & Verified'
  },
  {
    id: 'node-charite-03',
    name: 'Charité University Medicine AI',
    type: 'Hospital',
    location: 'Berlin',
    country: 'Germany',
    lat: 52.5200,
    lng: 13.4050,
    status: 'Aggregating',
    dataRecords: 850000,
    localAccuracy: 95.8,
    latencyMs: 65,
    gradientHash: '0x9a10fc4...19e5',
    securityStatus: 'Homomorphic Vault Active'
  },
  {
    id: 'node-aiims-04',
    name: 'AIIMS Bio-Compute Network',
    type: 'Hospital',
    location: 'New Delhi',
    country: 'India',
    lat: 28.6139,
    lng: 77.2090,
    status: 'Online',
    dataRecords: 1420000,
    localAccuracy: 97.1,
    latencyMs: 110,
    gradientHash: '0x5b8a12e...99c4',
    securityStatus: 'Encrypted & Verified'
  },
  {
    id: 'node-sgh-05',
    name: 'Singapore General Federated AI Node',
    type: 'Hospital',
    location: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    status: 'Online',
    dataRecords: 620000,
    localAccuracy: 96.4,
    latencyMs: 82,
    gradientHash: '0x2d90a11...44f8',
    securityStatus: 'Homomorphic Vault Active'
  },
  {
    id: 'node-tokyo-06',
    name: 'Tokyo University Hospital AI Core',
    type: 'Hospital',
    location: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    status: 'Training',
    dataRecords: 1100000,
    localAccuracy: 98.2,
    latencyMs: 95,
    gradientHash: '0x71e99f0...31a0',
    securityStatus: 'Encrypted & Verified'
  },
  {
    id: 'node-stjude-07',
    name: 'St. Jude Children Research AI Unit',
    type: 'AI Research Node',
    location: 'Memphis, TN',
    country: 'United States',
    lat: 35.1495,
    lng: -90.0490,
    status: 'Online',
    dataRecords: 450000,
    localAccuracy: 98.6,
    latencyMs: 45,
    gradientHash: '0x6e88102...11b7',
    securityStatus: 'Homomorphic Vault Active'
  },
  {
    id: 'node-imperial-08',
    name: 'Imperial College Healthcare AI Lab',
    type: 'Laboratory',
    location: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    status: 'Aggregating',
    dataRecords: 790000,
    localAccuracy: 96.7,
    latencyMs: 58,
    gradientHash: '0x44c10a9...901e',
    securityStatus: 'Encrypted & Verified'
  }
];

export const mockSupportedModels: SupportedAIModel[] = [
  {
    id: 'heart-disease',
    name: 'Heart Disease Prediction',
    category: 'Cardiology',
    tagline: 'Multi-institutional 10-Year Myocardial Infarction & Ischemic Risk Engine',
    trainingStatus: 'Converged',
    accuracy: 97.4,
    precision: 96.8,
    recall: 98.1,
    f1Score: 97.4,
    trainingProgress: 100,
    totalSamples: 4200000,
    roundCount: 48,
    weightVectorSizeMB: 128,
    supportedFeatures: ['ApoB/ApoA1', 'Troponin-I', 'Left Ventricular Mass', 'Systolic BP', 'Coronary Calcium Score']
  },
  {
    id: 'stroke-prediction',
    name: 'Stroke Risk Vector Model',
    category: 'Neurology',
    tagline: 'Cerebrovascular Event & Ischemic Penumbra Classifier',
    trainingStatus: 'Active Training',
    accuracy: 96.2,
    precision: 95.7,
    recall: 96.9,
    f1Score: 96.3,
    trainingProgress: 88,
    totalSamples: 3100000,
    roundCount: 42,
    weightVectorSizeMB: 96,
    supportedFeatures: ['Carotid Intima-Media Thickness', 'Atrial Fibrillation Index', 'Plasma Homocysteine', 'Mean Arterial Pressure']
  },
  {
    id: 'kidney-disease',
    name: 'Renal Disease Progression AI',
    category: 'Nephrology',
    tagline: 'Chronic Kidney Disease (CKD) Stage 1-5 Trajectory Predictor',
    trainingStatus: 'Converged',
    accuracy: 95.8,
    precision: 95.1,
    recall: 96.4,
    f1Score: 95.7,
    trainingProgress: 100,
    totalSamples: 2800000,
    roundCount: 36,
    weightVectorSizeMB: 84,
    supportedFeatures: ['eGFR Biomarker Curve', 'Urine Albumin-to-Creatinine Ratio', 'Serum Cystatin C', 'Renal Doppler Resistive Index']
  },
  {
    id: 'diabetes-risk',
    name: 'Metabolic & Diabetes Predictor',
    category: 'Endocrinology',
    tagline: 'Continuous Glucose Drift & Insulin Resistance Neural Vector',
    trainingStatus: 'Converged',
    accuracy: 98.1,
    precision: 97.8,
    recall: 98.5,
    f1Score: 98.1,
    trainingProgress: 100,
    totalSamples: 5600000,
    roundCount: 54,
    weightVectorSizeMB: 112,
    supportedFeatures: ['HOMA-IR Index', 'Fasting Plasma Glucose Variance', 'HbA1c Dynamics', 'Visceral Adiposity Index']
  },
  {
    id: 'cancer-risk',
    name: 'Early Multi-Cancer Risk Vector',
    category: 'Oncology',
    tagline: 'Circulating Tumor DNA (ctDNA) & Liquid Biopsy Neural Scanner',
    trainingStatus: 'Aggregating',
    accuracy: 94.9,
    precision: 94.2,
    recall: 95.5,
    f1Score: 94.8,
    trainingProgress: 72,
    totalSamples: 1900000,
    roundCount: 30,
    weightVectorSizeMB: 240,
    supportedFeatures: ['cfDNA Methylation Patterns', 'Oncogenic Driver Mutations', 'Proteomic Tumor Markers', 'Family Epigenetic Burden']
  },
  {
    id: 'mental-health',
    name: 'Neuro-Psychiatric Biomarker Model',
    category: 'Psychiatry',
    tagline: 'Cognitive Stress, Depressive Episode & Sleep Architecture Analyzer',
    trainingStatus: 'Active Training',
    accuracy: 93.6,
    precision: 92.9,
    recall: 94.3,
    f1Score: 93.6,
    trainingProgress: 82,
    totalSamples: 1400000,
    roundCount: 24,
    weightVectorSizeMB: 78,
    supportedFeatures: ['Heart Rate Variability (HRV) Power Spectrum', 'REM Delta Wave Density', 'Cortisol Diurnal Curve', 'Galvanic Skin Response']
  },
  {
    id: 'lifestyle-prediction',
    name: 'Lifestyle & Epigenetic Aging Engine',
    category: 'Preventive Medicine',
    tagline: 'Biological Body Age & Epigenetic Clock Horvath Model',
    trainingStatus: 'Converged',
    accuracy: 97.9,
    precision: 97.4,
    recall: 98.3,
    f1Score: 97.8,
    trainingProgress: 100,
    totalSamples: 6100000,
    roundCount: 60,
    weightVectorSizeMB: 105,
    supportedFeatures: ['VO2 Max Output', 'Telomere Length Ratio', 'Mitochondrial Density', 'Circadian Phase Shift Offset']
  },
  {
    id: 'population-health',
    name: 'Population Epidemiology Analytics',
    category: 'Public Health',
    tagline: 'Regional Pathogen Outbreak & Healthcare Load Forecasting Model',
    trainingStatus: 'Converged',
    accuracy: 96.7,
    precision: 96.1,
    recall: 97.2,
    f1Score: 96.6,
    trainingProgress: 100,
    totalSamples: 8400000,
    roundCount: 45,
    weightVectorSizeMB: 180,
    supportedFeatures: ['Regional Air Quality AQI', 'Socio-Demographic Density', 'Seasonal Viral Load', 'Emergency Department Utilization']
  }
];

export const mockLossHistory = [
  { round: 1, loss: 0.485, accuracy: 78.4 },
  { round: 5, loss: 0.320, accuracy: 84.1 },
  { round: 10, loss: 0.215, accuracy: 89.2 },
  { round: 15, loss: 0.165, accuracy: 92.0 },
  { round: 20, loss: 0.128, accuracy: 94.1 },
  { round: 25, loss: 0.098, accuracy: 95.3 },
  { round: 30, loss: 0.079, accuracy: 96.0 },
  { round: 35, loss: 0.068, accuracy: 96.4 },
  { round: 40, loss: 0.059, accuracy: 96.6 },
  { round: 45, loss: 0.052, accuracy: 96.7 },
  { round: 48, loss: 0.046, accuracy: 96.8 }
];

export const mockConfusionMatrix = {
  truePositive: 9680,
  falsePositive: 210,
  falseNegative: 190,
  trueNegative: 9920,
  totalEvaluated: 20000
};

export const mockROCCurvePoints = [
  { fpr: 0.00, tpr: 0.00 },
  { fpr: 0.01, tpr: 0.65 },
  { fpr: 0.03, tpr: 0.88 },
  { fpr: 0.05, tpr: 0.94 },
  { fpr: 0.10, tpr: 0.97 },
  { fpr: 0.20, tpr: 0.99 },
  { fpr: 0.50, tpr: 0.995 },
  { fpr: 1.00, tpr: 1.00 }
];

export const mockBlockchainAuditLedger: BlockchainAuditBlock[] = [
  {
    blockIndex: 1048,
    timestamp: '2026-07-24 23:58:12 UTC',
    round: 48,
    eventType: 'FedAvg Model Weight Aggregation',
    modelId: 'heart-disease',
    participatingNodes: 142,
    hash: '0xa3f910e82c149b552e189a071c3d4f829910c410ba21',
    previousHash: '0x8b2e104f7c11a0029c881023a14d5e91a091c102',
    merkleRoot: '0x51c720a4b91730e28f11a08',
    validator: 'Secure Aggregation Node #01 (Zurich Vault)',
    verificationStatus: 'VERIFIED & IMMUTABLE'
  },
  {
    blockIndex: 1047,
    timestamp: '2026-07-24 22:30:45 UTC',
    round: 47,
    eventType: 'Differential Privacy Noise Verification',
    modelId: 'diabetes-risk',
    participatingNodes: 138,
    hash: '0x8b2e104f7c11a0029c881023a14d5e91a091c102',
    previousHash: '0x6d1192e1049b77a01b22c09194e823f9a910811e',
    merkleRoot: '0x42b8109d817300c19a88e10',
    validator: 'Secure Aggregation Node #03 (Tokyo Node)',
    verificationStatus: 'VERIFIED & IMMUTABLE'
  },
  {
    blockIndex: 1046,
    timestamp: '2026-07-24 21:15:00 UTC',
    round: 46,
    eventType: 'Hospital IRB & Consent Token Verification',
    modelId: 'stroke-prediction',
    participatingNodes: 135,
    hash: '0x6d1192e1049b77a01b22c09194e823f9a910811e',
    previousHash: '0x3f709121a88b11c990a21774e10b4291a0110e99',
    merkleRoot: '0x19a008b8e721a9900c44b99',
    validator: 'Secure Aggregation Node #02 (Boston Core)',
    verificationStatus: 'VERIFIED & IMMUTABLE'
  },
  {
    blockIndex: 1045,
    timestamp: '2026-07-24 20:00:18 UTC',
    round: 45,
    eventType: 'Paillier Homomorphic Cipher Validation',
    modelId: 'cancer-risk',
    participatingNodes: 130,
    hash: '0x3f709121a88b11c990a21774e10b4291a0110e99',
    previousHash: '0x1c88019a2e33f44109b821094ea2011b980c2101',
    merkleRoot: '0x8891001a42b109e201b1990',
    validator: 'Secure Aggregation Node #04 (London Core)',
    verificationStatus: 'CONSENSUS VALIDATED'
  }
];

export const mockSHAPExplanation = {
  predictionId: 'PRED-9984',
  modelName: 'Federated Global Cardiac Risk Model v2.4.0',
  predictedCondition: 'Optimal Myocardial Profile',
  riskScore: '3.2%',
  confidence: 98.4,
  shapValues: [
    { feature: 'ApoB / ApoA1 Ratio', importance: 0.34, impact: 'Decreases Risk (-2.8%)', direction: 'positive' as const, value: '0.48 (Optimal)' },
    { feature: 'High-Sensitivity CRP (hs-CRP)', importance: 0.22, impact: 'Decreases Risk (-1.6%)', direction: 'positive' as const, value: '0.6 mg/L' },
    { feature: 'Left Ventricular Ejection Fraction', importance: 0.18, impact: 'Optimal Baseline (-1.2%)', direction: 'positive' as const, value: '64%' },
    { feature: 'Systolic Blood Pressure (118 mmHg)', importance: 0.12, impact: 'Slight Positive Drift (+0.4%)', direction: 'negative' as const, value: '118 mmHg' },
    { feature: 'HbA1c Glycated Hemoglobin', importance: 0.08, impact: 'Optimal Glucose Control (-0.8%)', direction: 'positive' as const, value: '5.1%' }
  ],
  trainingSources: [
    { institution: 'Mayo Clinic', contributionWeight: '24.5%', location: 'USA' },
    { institution: 'Johns Hopkins Medicine', contributionWeight: '21.2%', location: 'USA' },
    { institution: 'Charité Berlin', contributionWeight: '18.8%', location: 'Germany' },
    { institution: 'AIIMS New Delhi', contributionWeight: '19.5%', location: 'India' },
    { institution: 'Singapore General', contributionWeight: '16.0%', location: 'Singapore' }
  ],
  privacyGuarantee: 'Zero raw patient bytes transferred. 100% Homomorphic Encrypted Weight Vector.',
  participatingModelVersion: 'v2.4.0-FedAvg-DP0.5'
};

export const mockHealthcareInsights = {
  diseaseTrends: [
    { region: 'North America', disease: 'Metabolic Syndrome', trend: '-2.4% Downward', riskLevel: 'Moderate' },
    { region: 'Europe', disease: 'Cardiovascular Remodeling', trend: '-4.1% Downward', riskLevel: 'Low' },
    { region: 'Asia Pacific', disease: 'Early Diabetes Onset', trend: '-3.8% Downward', riskLevel: 'Optimal' },
    { region: 'Latin America', disease: 'Hypertension Spikes', trend: '-1.9% Downward', riskLevel: 'Moderate' }
  ],
  modelDrift: {
    conceptDriftScore: 0.012, // Extremely low drift
    sensorCalibrationShift: '0.003%',
    lastRecalibratedRound: 46,
    status: 'Stable - Zero Calibration Drift'
  },
  fairnessMetrics: {
    demographicParityRatio: 0.984,
    equalizedOddsDifference: 0.012,
    disparateImpactScore: 0.991,
    auditCompliance: '100% Bias Free Certified'
  }
};
