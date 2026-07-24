export interface OrganData {
  id: string;
  name: string;
  score: number;
  status: 'optimal' | 'warning' | 'alert' | 'critical';
  color: 'green' | 'yellow' | 'orange' | 'red';
  metrics: { label: string; value: string; detail: string }[];
  summary: string;
  xaiReasoning: string;
}

export interface RiskFactor {
  id: string;
  name: string;
  riskPercent: number;
  trend: 'down' | 'stable' | 'up';
  trendValue: string;
  confidence: number;
  explainability: {
    positiveContributors: { factor: string; percentage: string }[];
    negativeContributors: { factor: string; percentage: string }[];
  };
  ragCitations: { title: string; source: string; year: string; doi: string }[];
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  bloodType: string;
  twinId: string;
  lastSynced: string;
  healthScore: number;
  bodyAge: number;
  stressScore: number;
  sleepScore: number;
  spO2: number;
  hydration: number;
  bmi: number;
  temperature: number;
  heartRate: number;
  bloodPressure: string;
  activitySteps: number;
  caloriesBurned: number;
  organs: Record<string, OrganData>;
  risks: RiskFactor[];
}

export const mockPatient: PatientProfile = {
  id: 'P-984201',
  name: 'Dr. Alex Vance',
  age: 34,
  gender: 'Male',
  height: "5'11\" (180 cm)",
  weight: '74 kg (163 lbs)',
  bloodType: 'O Negative (Universal Donor)',
  twinId: 'MTX-9942-NEURAL-TWIN',
  lastSynced: '2 seconds ago (Real-time IoT Telemetry)',
  healthScore: 97,
  bodyAge: 29.4,
  stressScore: 18,
  sleepScore: 94,
  spO2: 99,
  hydration: 92,
  bmi: 22.4,
  temperature: 36.6,
  heartRate: 64,
  bloodPressure: '114 / 74',
  activitySteps: 11420,
  caloriesBurned: 2450,

  organs: {
    heart: {
      id: 'heart',
      name: 'Cardiovascular Network',
      score: 98,
      status: 'optimal',
      color: 'green',
      metrics: [
        { label: 'HRV (RMSSD)', value: '68 ms', detail: 'High autonomic flexibility' },
        { label: 'Stroke Volume', value: '78 mL/beat', detail: 'Efficient left ventricular ejection' },
        { label: 'Aortic Stiffness', value: '5.2 m/s', detail: 'Vascular age corresponds to 25 yrs' },
      ],
      summary: 'Optimal stroke volume, robust HRV (68 ms). Zero arterial plaque detected via AI ultrasound synthesis.',
      xaiReasoning: 'Consistent aerobic conditioning and low inflammatory markers (hs-CRP <0.4 mg/L) maintain prime endothelial integrity.'
    },
    brain: {
      id: 'brain',
      name: 'Central Nervous System',
      score: 96,
      status: 'optimal',
      color: 'green',
      metrics: [
        { label: 'Gamma Wave Power', value: '42 Hz', detail: 'Peak cognitive focus index' },
        { label: 'Glymatic Clearance', value: '98%', detail: 'Deep slow-wave sleep neuro-clearing' },
        { label: 'Neuro-Inflammation', value: '0.02 ng/mL', detail: 'Zero neuro-degenerative markers' },
      ],
      summary: 'Deep sleep architecture stable. Low neuro-inflammation, high synaptic plasticity index.',
      xaiReasoning: '94% sleep efficiency and high omega-3 index support optimal BDNF neurotrophic levels.'
    },
    lungs: {
      id: 'lungs',
      name: 'Pulmonary System',
      score: 97,
      status: 'optimal',
      color: 'green',
      metrics: [
        { label: 'VO2 Max', value: '48.2 mL/kg/min', detail: 'Top 5% endurance percentile' },
        { label: 'FEV1 / FVC Ratio', value: '86%', detail: 'Unobstructed airway dynamics' },
        { label: 'Alveolar Diffusion', value: '31.4 mL/min/mmHg', detail: 'Optimal gas exchange efficiency' },
      ],
      summary: 'VO2 max 48.2 ml/kg/min. Clear pulmonary capacity with zero micro-particulate inflammation.',
      xaiReasoning: 'Regular high-intensity interval training combined with clean indoor air filtration keeps lung parenchyma clear.'
    },
    kidney: {
      id: 'kidney',
      name: 'Renal Excretory System',
      score: 94,
      status: 'warning',
      color: 'yellow',
      metrics: [
        { label: 'eGFR Rate', value: '112 mL/min', detail: 'Excellent filtration rate' },
        { label: 'Serum Creatinine', value: '0.85 mg/dL', detail: 'Normal nitrogenous baseline' },
        { label: 'Uric Acid', value: '5.8 mg/dL', detail: 'Slight upper range electrolyte tilt' },
      ],
      summary: 'eGFR 112 mL/min. Slight electrolyte fluctuation detected post afternoon endurance run.',
      xaiReasoning: 'Temporary post-workout mild dehydration elevated serum sodium by 2.1%. Rehydration recommended.'
    },
    liver: {
      id: 'liver',
      name: 'Hepatic Metabolic Hub',
      score: 95,
      status: 'optimal',
      color: 'green',
      metrics: [
        { label: 'ALT / AST Ratio', value: '18 / 16 U/L', detail: 'Zero hepatic enzyme elevation' },
        { label: 'Visceral Fat Index', value: '2.1%', detail: 'Minimal fatty tissue accumulation' },
        { label: 'Glutathione Synthesis', value: '96%', detail: 'Optimal phase II detoxification' },
      ],
      summary: 'ALT/AST enzymes optimal. Efficient lipid oxidation and clean glycogen storage buffers.',
      xaiReasoning: 'Low refined fructose intake and zero excess alcohol allow continuous hepatic lipid clearance.'
    }
  },

  risks: [
    {
      id: 'heart-disease',
      name: 'Coronary Heart Disease',
      riskPercent: 3.2,
      trend: 'down',
      trendValue: '-0.8%',
      confidence: 99.1,
      explainability: {
        positiveContributors: [
          { factor: 'High HRV & Low Resting HR (64 bpm)', percentage: '-38%' },
          { factor: 'Optimal Lipid ApoB/ApoA1 Ratio (0.52)', percentage: '-29%' },
          { factor: 'Clean Arterial Wall Ultrasound Scan', percentage: '-22%' }
        ],
        negativeContributors: [
          { factor: 'Family History of Late Hypertension', percentage: '+6%' },
          { factor: 'Occasional Workplace Acute Stress Spikes', percentage: '+3%' }
        ]
      },
      ragCitations: [
        { title: 'AI-Driven Multimodal Risk Stratification in Asymptomatic Adults', source: 'The Lancet Digital Health', year: '2026', doi: '10.1016/S2589-7500(25)00112-X' },
        { title: 'ApoB vs LDL-C in 10-Year Cardiovascular Outcome Forecasting', source: 'Journal of the American College of Cardiology', year: '2025', doi: '10.1016/j.jacc.2025.04.019' }
      ]
    },
    {
      id: 'stroke',
      name: 'Ischemic Stroke Vector',
      riskPercent: 1.8,
      trend: 'stable',
      trendValue: '0.0%',
      confidence: 98.4,
      explainability: {
        positiveContributors: [
          { factor: 'Normal Mean Arterial BP (87 mmHg)', percentage: '-45%' },
          { factor: 'Zero Atrial Fibrillation Micro-Spikes', percentage: '-32%' }
        ],
        negativeContributors: [
          { factor: 'Sedentary Desk Hours (>6 hrs continuous)', percentage: '+5%' }
        ]
      },
      ragCitations: [
        { title: 'Continuous PPG Monitoring for Subclinical AFib Detection', source: 'Circulation AI', year: '2026', doi: '10.1161/CIRCULATIONAHA.125.068221' }
      ]
    },
    {
      id: 'kidney-failure',
      name: 'Chronic Kidney Disease (CKD)',
      riskPercent: 4.5,
      trend: 'down',
      trendValue: '-0.2%',
      confidence: 96.8,
      explainability: {
        positiveContributors: [
          { factor: 'Robust eGFR (112 mL/min/1.73m²)', percentage: '-40%' },
          { factor: 'Zero Albuminuria in Micro-Fluidic Assay', percentage: '-35%' }
        ],
        negativeContributors: [
          { factor: 'Post-Workout Electrolyte Fluctuation', percentage: '+8%' }
        ]
      },
      ragCitations: [
        { title: 'Early Biomarker Detection of Renal Tubule Stress', source: 'Nature Medicine AI', year: '2025', doi: '10.1038/s41591-025-03102-7' }
      ]
    },
    {
      id: 'diabetes',
      name: 'Type 2 Diabetes Mellitus',
      riskPercent: 6.1,
      trend: 'stable',
      trendValue: '0.0%',
      confidence: 97.5,
      explainability: {
        positiveContributors: [
          { factor: 'Fastings Insulin 4.2 µIU/mL & HOMA-IR 0.8', percentage: '-52%' },
          { factor: 'Continuous Glucose Spike Variance < 15 mg/dL', percentage: '-24%' }
        ],
        negativeContributors: [
          { factor: 'Late Night High-Carb Snacks (2x/week)', percentage: '+10%' }
        ]
      },
      ragCitations: [
        { title: 'Continuous Glucose Monitoring & Predictive Pancreatic Fatigue', source: 'Diabetes Care', year: '2026', doi: '10.2337/dc25-0812' }
      ]
    },
    {
      id: 'mental-health',
      name: 'Acute Neuro-Burnout Index',
      riskPercent: 12.4,
      trend: 'down',
      trendValue: '-3.1%',
      confidence: 95.0,
      explainability: {
        positiveContributors: [
          { factor: 'Consistent REM & Deep Sleep Architecture', percentage: '-30%' },
          { factor: 'Daily Cortisol Diurnal Slope Normalcy', percentage: '-25%' }
        ],
        negativeContributors: [
          { factor: 'Elevated Screen Time Post 10:00 PM', percentage: '+18%' },
          { factor: 'Workplace High-Cognitive Load Deadlines', percentage: '+14%' }
        ]
      },
      ragCitations: [
        { title: 'Heart Rate Variability & Digital Biomarkers of Burnout', source: 'IEEE Journal of Biomedical Health', year: '2026', doi: '10.1109/JBHI.2026.31298' }
      ]
    },
    {
      id: 'cancer',
      name: 'Multi-Organ Oncology Vector',
      riskPercent: 2.1,
      trend: 'stable',
      trendValue: '0.0%',
      confidence: 94.2,
      explainability: {
        positiveContributors: [
          { factor: 'Zero Cell-Free DNA (cfDNA) Tumor Mutations', percentage: '-60%' },
          { factor: 'High Autophagy Activation Index via Fasting', percentage: '-20%' }
        ],
        negativeContributors: [
          { factor: 'Environmental UV Exposure Variance', percentage: '+4%' }
        ]
      },
      ragCitations: [
        { title: 'Liquid Biopsy Multi-Cancer Early Detection via Machine Learning', source: 'Cancer Discovery', year: '2026', doi: '10.1158/2159-8290.CD-25-0914' }
      ]
    }
  ]
};
