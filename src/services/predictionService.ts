import { fetchWithFallback } from './api';

export interface SHAPFeature {
  feature: string;
  impact: number;
  description: string;
}

export interface DiseaseRiskResult {
  disease: string;
  risk_score: number;
  risk_level: string;
  confidence: number;
  key_factors: string[];
  shap_features: SHAPFeature[];
}

export interface OverallHealthScoreResult {
  health_score: number;
  metabolic_score: number;
  cardiovascular_score: number;
  lifestyle_score: number;
  cognitive_score: number;
  recommendations: string[];
  disease_risks: DiseaseRiskResult[];
}

export interface VitalsInput {
  age: number;
  gender: string;
  systolic_bp: number;
  diastolic_bp: number;
  heart_rate: number;
  glucose: number;
  cholesterol: number;
  bmi: number;
  smoking_history: boolean;
  physical_activity_hours: number;
  sleep_hours: number;
}

export const defaultVitals: VitalsInput = {
  age: 42,
  gender: 'Male',
  systolic_bp: 120,
  diastolic_bp: 80,
  heart_rate: 72,
  glucose: 95,
  cholesterol: 185,
  bmi: 23.5,
  smoking_history: false,
  physical_activity_hours: 4.5,
  sleep_hours: 7.5,
};

export const fallbackHealthScoreResult: OverallHealthScoreResult = {
  health_score: 94,
  metabolic_score: 92,
  cardiovascular_score: 96,
  lifestyle_score: 88,
  cognitive_score: 95,
  recommendations: [
    'Maintain systolic BP below 120 mmHg through low sodium diet.',
    'Sustain 150+ minutes of aerobic physical exercise weekly.',
    'Schedule annual cardiac calcium score evaluation.',
    'Optimal hydration and Mediterranean diet pattern recommended.',
  ],
  disease_risks: [
    {
      disease: 'Coronary Artery Disease (CAD)',
      risk_score: 8.4,
      risk_level: 'Low Risk',
      confidence: 96.4,
      key_factors: ['Systolic Blood Pressure', 'Serum Lipid Profile', 'Age Profile'],
      shap_features: [
        { feature: 'Systolic BP', impact: +0.28, description: 'BP of 120 mmHg maintains normal vascular resistance.' },
        { feature: 'Cholesterol', impact: +0.22, description: 'Total cholesterol of 185 mg/dL is within healthy range.' },
        { feature: 'Physical Activity', impact: -0.18, description: 'Regular activity (4.5 hrs/wk) is protective.' },
      ],
    },
    {
      disease: 'Ischemic Stroke Risk',
      risk_score: 4.2,
      risk_level: 'Low Risk',
      confidence: 95.1,
      key_factors: ['Arterial Pressure Gradient', 'Fasting Glycemic Level'],
      shap_features: [
        { feature: 'Systolic BP', impact: +0.25, description: 'Normal baseline arterial pressure.' },
        { feature: 'Sleep Quality', impact: -0.12, description: 'Restorative sleep mitigates neuro-inflammation.' },
      ],
    },
    {
      disease: 'Type-2 Diabetes Mellitus',
      risk_score: 11.5,
      risk_level: 'Low Risk',
      confidence: 97.8,
      key_factors: ['Fasting Glucose Concentration', 'Body Mass Index (BMI)'],
      shap_features: [
        { feature: 'Glucose', impact: +0.42, description: 'Fasting glucose 95 mg/dL.' },
        { feature: 'BMI', impact: +0.25, description: 'BMI of 23.5 kg/m².' },
      ],
    },
    {
      disease: 'Chronic Kidney Disease (CKD)',
      risk_score: 3.8,
      risk_level: 'Low Risk',
      confidence: 94.2,
      key_factors: ['Glomerular Pressure', 'Systemic Hypertension'],
      shap_features: [
        { feature: 'Diastolic BP', impact: +0.20, description: 'Normal renal perfusion pressure.' },
      ],
    },
  ],
};

export async function evaluateVitalsRisk(vitals: VitalsInput): Promise<OverallHealthScoreResult> {
  return fetchWithFallback<OverallHealthScoreResult>(
    '/predictions/evaluate',
    {
      method: 'POST',
      body: JSON.stringify(vitals),
    },
    fallbackHealthScoreResult
  );
}
